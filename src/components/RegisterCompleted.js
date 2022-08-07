import React from 'react'
import { BodyDiv, BodyCenter } from '../styles/BodyStyle'
import Done from '../assets/Done.svg'
import { Link } from 'react-router-dom'
export default function RegisterCompleted() {

  return (
    <BodyDiv>
      <BodyCenter>
        <div className="justify-content-center mx-auto">
          <div className="row">
            <img src={Done} className="img-fluid" alt="book_complete" />
          </div>
          <div className="row text-center">
            <p>
              <span className="fs-5 fw-bold mt-3 text-center">ลงทะเบียนสำเร็จแล้ว<br /></span>

              <span className="fs-6 mt-3 text-center text-secondary">โปรดเข้าสู่ระบบเพื่อดำเนินการต่อ</span>
            </p>
            <Link className='btn btn-outline-success' to="/login">เข้าสู่ระบบ</Link>
          </div>
        </div>
      </BodyCenter>
    </BodyDiv>
  )
}
