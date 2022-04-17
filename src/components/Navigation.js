import React from 'react'
import { BsTwitter, BsHash, BsSearch } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'

export default function Navigation() {
  return (
    <div className='navigation'>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
        <div style={{ flex: 1 }} >
          <div className='nav-item'>
            <p className='nav-icon'>
              <BsTwitter />
            </p>
          </div>
          <div className='nav-item'>
            <p className='nav-icon'>
              <BsHash />
            </p>
            <p className='nav-desc'>Home</p>
          </div>
          <div className='nav-item'>
            <p className='nav-icon'>
              <BsSearch />
            </p>
            <p className='nav-desc'>Home</p>
          </div>
        </div>
        <div>
          <div className='nav-item'>
            <p className='nav-icon'>
              <AiOutlineUser />
            </p>
            <p className='nav-desc'>User</p>
          </div>
        </div>
      </div>
    </div >
  )
}
