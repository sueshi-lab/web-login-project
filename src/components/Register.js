import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { HOST } from '../environment';
import { BodyDiv, ProfileContent, InputGroup } from '../styles/BodyStyle'
import { setAuthToken } from '../services/setAuthToken';

export default function Register() {

  // for set data input
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // for check input error
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  let navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Authentication 
    setAuthToken().then((isAuth) => {
      if (isAuth) navigate('/profile')
    })
  }, []);

  const register = async () => {
    try {
      setUsernameError('')
      setPasswordError('')
      setEmailError('')
      setFirstNameError('')
      setLastNameError('')

      if (!username) setUsernameError("กรุณากรอกชื่อผู้ใช้งาน")
      if (!password) setPasswordError("กรุณากรอกรหัสผ่าน")
      if (!email) setEmailError("กรุณากรอกอีเมล")
      if (!firstName) setFirstNameError("กรุณากรอกชื่อจริง")
      if (!lastName) setLastNameError("กรุณากรอกนามสกุล")

      if (!username) return
      if (!password) return
      if (!email) return
      if (!firstName) return
      if (!lastName) return

      let result = await axios.post(
        `${HOST}/user/register`,
        {
          username: username,
          password: password,
          email: email,
          firstName: firstName,
          lastName: lastName,
        }
      );
      if (result.data.status === "success") navigate('completed')

    } catch (e) {
      setUserError(e.response.data.error);
    }

  };

  // for check response error
  const setUserError = (error) => {
    if (error === "This username and email already exists") {
      setEmailError("อีเมลนี้ถูกใช้แล้ว")
      setUsernameError("ชื่อผู้ใช้งานนี้ถูกใช้แล้ว")
    } else if (error === "This email already exists") {
      setEmailError("อีเมลนี้ถูกใช้แล้ว")
    } else if (error === "This username already exists") {
      setUsernameError("ชื่อผู้ใช้งานนี้ถูกใช้แล้ว")
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
          <p className="fs-3 fw-bold mt-3 text-center">สร้างบัญชีผู้ใช้งาน</p>
        </div>
        <div className="row">
          <InputGroup className="d-grid mx-auto px-2">
            <div className="border shadow-sm">
              <div className="p-3">

                {/* Email */}
                <div className="form-group row">
                  <div className="col-12">
                    <label className="col-form-label mx-1">อีเมล<span className="text-danger">*</span></label>
                    <input type="email"
                      className="form-control"
                      placeholder="อีเมล"
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                    />
                    {/* emailError */}
                    {getInputError(emailError)}
                  </div>
                </div>

                <div className="form-group row mt-1">
                  {/* Username */}
                  <div className="col-6">
                    <label className="col-form-label mx-1">ชื่อผู้ใช้งาน<span className="text-danger">*</span></label>
                    <input type="text"
                      className="form-control"
                      placeholder="ชื่อผู้ใช้งาน"
                      onChange={(e) => {
                        setUserName(e.target.value)
                      }}
                    />

                    {/* usernameError */}
                    {getInputError(usernameError)}
                  </div>

                  {/* Password */}
                  <div className="col-6">
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
                </div>

                <div className="form-group row mt-1">
                  {/* First Name */}
                  <div className="col-6">
                    <label className="col-form-label mx-1">ชื่อจริง<span className="text-danger">*</span></label>
                    <input type="text"
                      className="form-control"
                      placeholder="ชื่อจริง"
                      onChange={(e) => {
                        setFirstName(e.target.value)
                      }}
                    />
                    {/* firstNameError */}
                    {getInputError(firstNameError)}
                  </div>

                  {/* Last Name */}
                  <div className="col-6">
                    <label className="col-form-label mx-1">นามสกุล<span className="text-danger">*</span></label>
                    <input type="text"
                      className="form-control"
                      placeholder="นามสกุล"
                      onChange={(e) => {
                        setLastName(e.target.value)
                      }}
                    />
                    {/* lastNameError */}
                    {getInputError(lastNameError)}
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" onClick={register} className="btn btn-secondary mt-3 d-block shadow-sm">สร้างเลย</button>
            <p className="mt-2 text-center">มีบัญชีอยู่แล้วใช่ไหม? <Link to="/login" className="fw-bold" style={{ color: "#329D9C" }}>เข้าสู่ระบบ</Link> เลยตอนนี้!</p>

          </InputGroup>
        </div>

      </ProfileContent>
    </BodyDiv>
  )
}