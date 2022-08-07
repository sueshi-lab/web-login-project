import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { BodyDiv, ProfileContent } from '../styles/BodyStyle'

import { useSelector, useDispatch } from 'react-redux'
import { authUser } from '../features/auth/authSlice'

const OuterDiv = styled.div`
    position: relative;
`

const InnerDiv = styled.div`
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`

const IconDiv = styled.div`
    position: relative;
    // padding: 40px;
    height: 135px;
    width: 135px;
    background: linear-gradient(240.46deg, #87E180 10.38%, #00E3F1 99.59%);
`

const Icon = styled.p`
    margin: 0;
    font-size: 56px;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`

export default function Profile() {

    const dispatch = useDispatch();

    const { user, isLogin, isLoading, isReject } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(authUser())
        .then(()=>{
            if (!isLogin) navigate('/login')
        })
    }, []);

    var months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

    let navigate = useNavigate();

    if (isLoading || isReject) {
        return (
            <div className='loading'>
                Loading ... 
            </div>
        )
    }
    return (
        <BodyDiv>
            <ProfileContent className="container-fluid">
                
                <div className="row my-4">
                    <OuterDiv className="col-6 col-sm-5">
                        <InnerDiv>
                            <IconDiv className="rounded-circle text-light text-center shadow-sm mt-2">
                                <Icon>{user.username.charAt(0)}</Icon>
                            </IconDiv>
                        </InnerDiv>
                    </OuterDiv>
                    <div className="col-6 col-sm-7 pe-2">
                        <div className="row fs-2 mt-2">{user.username}</div>
                        <div className="row mb-2 text-secondary">
                            เข้าร่วมเมื่อ {`${months[Number(user.createdAt.slice(5, 7)) - 1]} ${Number(user.createdAt.slice(0, 4))+543}`}
                        </div>
                        <div className="row text-dark">
                            <div className="col-6 border-secondary">
                                <div className="row"><span className="text-center fw-bold fs-4">5</span></div>
                                <div className="row"><span className="text-center">รถยนต์</span></div>
                            </div>
                            <div className="col-6 border-secondary">
                                <div className="row"><span className="text-center fw-bold fs-4">14</span></div>
                                <div className="row"><span className="text-center">การจอง</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mx-2 mt-4 text-dark px-2">
                    <div className="fs-4 mt-1 px-1">{user.firstName} {user.lastName}&nbsp;</div>
                    <div className="mt-1 px-1">
                        <div className="row">
                            <div className="col-12 col-md-3">
                                <span className="bi bi-envelope-fill" /> &nbsp;อีเมล
                            </div>
                            <div className="col-12 col-md-9">
                                <div className="text-secondary mb-2">{user.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='btn btn-secondary'
                onClick={()=>{
                    const token = localStorage.getItem("token");
                    window.location =`http://localhost:3006?token=${token}`
                }}
                >ไปยังเว็บใหม่</button>
            </ProfileContent>
        </BodyDiv>
    )
}