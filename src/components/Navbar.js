import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector, useDispatch } from 'react-redux'
import { logout, authUser } from '../features/auth/authSlice'

export default function Navbar() {

    let location = useLocation();
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLogin } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(authUser()) // Authentication
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(logout())
        navigate("/login", { replace: true })
        window.location.reload(false)
    }

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">

            <div className="container-fluid">


                <Link className="navbar-brand" to="/" href="#">
                    <span className="fw-bolder bi bi-emoji-sunglasses-fill px-2"> Sueshi</span>
                </Link>

                {/* HAMBURGER ICON */}
                <button className="navbar-toggler shadow-none" type="button"
                    data-bs-toggle="collapse" data-bs-target="#userMenu"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Logged In ? */}
                {isLogin ? (
                    <div className="collapse navbar-collapse my-1" id="userMenu">
                        {/* COLLAPSE OF USER */}
                        <ul className="navbar-nav ms-auto">
                            <li className={`nav-item ${location === "/profile" ? "active" : ""}`}>
                                <Link className="nav-link" to="/profile">
                                    <span className="bi bi-person-bounding-box" /> &nbsp;ข้อมูลบัญชี
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <span className="nav-link" onClick={handleLogout} style={{cursor: "pointer"}}>
                                    <span className="bi bi-box-arrow-right" /> &nbsp;ออกจากระบบ
                                </span>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="collapse navbar-collapse my-1" id="userMenu">
                        {/* COLLAPSE OF MENU LIST */}
                        <ul className="navbar-nav ms-auto">
                            <li className={`nav-item ${location === "/register" ? "active" : ""}`}>
                                <Link className="nav-link" to="/register">
                                    <span className="bi bi-person-lines-fill" /> &nbsp;สร้างบัญชี
                                </Link>
                            </li>
                            <li className={`nav-item ${location === "/login" ? "active" : ""}`}>
                                <Link className="nav-link" to="/login">
                                    <span className="bi bi-box-arrow-in-right" /> &nbsp;เข้าสู่ระบบ
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}