import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'

export default function EachPost() {
  return (
    <div className='each-post' >
      <div>
        <div style={{
          borderRadius: '50%', background: 'gray',
          aspectRatio: '1 1',
          height: '50px', width: '50px',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} >
          <AiOutlineUser style={{ fontSize: '150%' }} />
        </div>
      </div>
      <div style={{ padding: '10px 20px' }}>
        <div style={{ display: 'flex' }}>
          <p>Scrill</p> <div style={{ width: '25px', height: '25px', aspectRatio: '1 1', margin: '0 10px' }}>
            <img style={{ width: '100%', height: '100%', objectFit: 'contain' }} src="https://img.icons8.com/ios-filled/50/000000/verified-account.png" />
          </div>
          <p>
            time
          </p>
        </div>
        <div>
          cvnvcbn mvmclnvblfdclbg nlfkgnbnfglhjbnfl
        </div>
      </div>
    </div>
  )
}