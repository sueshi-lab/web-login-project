import React from 'react'
import { BodyDiv, BodyCenter } from './styles/BodyStyle'
import Welcome from './assets/Welcome.jpg'
export default function App() {

  return (
    <BodyDiv>
      <BodyCenter>
        <div className="row">
          <img src={Welcome} className="img-fluid" alt="book_complete" />
        </div>
        <div className='row text-center'>
          <p className='h1'>Welcome</p>
          <p className='h2'>My Web Login</p>
        </div>
      </BodyCenter>
    </BodyDiv>
  );
}