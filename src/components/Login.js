import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { HOST } from '../environment';
import { BodyDiv, ProfileContent, InputGroup } from '../styles/BodyStyle'

import { setAuthToken } from '../services/setAuthToken';

import { useSelector, useDispatch } from 'react-redux'
import { login, authUser } from '../features/auth/authSlice'

export default function Login() {

  const [title, setTitle] = useState(''); // username or email to login
  const [password, setPassword] = useState('');

  const [titleError, setTitleError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth)

  useEffect(() => {
    // Authentication
    setAuthToken().then((isAuth) => {
      if (isAuth) navigate('/profile')
    })
      // dispatch(authUser())
    // if (isLogin) navigate('/profile')
  }, []);

  const handlieLogin = async () => {
    try {
      setTitleError('')
      setPasswordError('')

      if (!title) setTitleError("กรุณากรอกชื่อผู้ใช้งานหรืออีเมล")
      if (!password) setPasswordError("กรุณากรอกรหัสผ่าน")

      if (!title) return
      if (!password) return

      let result = await axios.post(
        `${HOST}/user/login`,
        {
          title: title,
          password: password,
        }
      );

      if (result.data.status === "success") {
        const token = result.data.user.token
        localStorage.setItem('token', token)
        dispatch(login(result.data.user))
        navigate(`/profile?username=${result.data.user.username}`)
      }
    } catch (e) {
      setUserError(e.response.data.error);
    }
  };

  // for check response error
  const setUserError = (error) => {
    if (error === "This username or email does not exist") {
      setTitleError("ชื่อผู้ใช้งานหรืออีเมลนี้ไม่มีในระบบ")
    } else if (error === "Password invalid") {
      setPasswordError("รหัสผ่านไม่ถูกต้อง")
    }
  }

  const getInputError = (fieldError) => {
    return (
      <div className='row ps-1 mt-1 text-danger'>
        {fieldError ? (
          <span><span className="bi bi-exclamation-circle" /> {fieldError}</span>
        ) : ''}
      </div>
    )
  }

  return (
    <BodyDiv>
      <ProfileContent className="container-fluid">
        <div className="row">
          <p className="fs-3 fw-bold mt-3 text-center">เข้าสู่ระบบ</p>
        </div>
        <div className="row">
          <InputGroup className="d-grid mx-auto px-2">
            <div className="border shadow-sm p-3">
              <label className="col-form-label mx-1">ชื่อผู้ใช้งานหรืออีเมล<span className="text-danger">*</span></label>
              <input type="text"
                className="form-control"
                placeholder="ชื่อผู้ใช้งานหรืออีเมล"
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />

              {/* titleError */}
              {getInputError(titleError)}

              <label className="col-form-label mx-1">รหัสผ่าน<span className="text-danger">*</span></label>
              <input type="password"
                className="form-control"
                placeholder="รหัสผ่าน"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />

              {/* passwordError */}
              {getInputError(passwordError)}

            </div>
            <button type="submit" onClick={handlieLogin} className="btn btn-secondary mt-3 d-block shadow-sm">เข้าสู่ระบบ</button>
            <p className="mt-2 text-center">ยังไม่มีบัญชีใช่ไหม? <Link to="/register" className="fw-bold" style={{ color: "#329D9C" }}>สร้างบัญชี</Link> เลยตอนนี้!</p>
          </InputGroup>
        </div>

      </ProfileContent>
    </BodyDiv>
  )
}
