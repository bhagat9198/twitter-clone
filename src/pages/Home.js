import React from 'react'
import EachPost from '../components/EachPost'
import Main from '../components/Main'
import Navigation from '../components/Navigation'
import Search from '../components/Search'

export default function Home() {
  return (
    <>
      <div className='main-body' >
        <Navigation />
        <Main>
          <div style={{ borderBottom: '1px solid rgb(211, 211, 211)', padding: '20px', marginBottom: '20px' }} >
            <Search />
          </div>
          <div style={{ padding: '20px' }}>
            <EachPost />
          </div>
        </Main>
      </div>
    </>
  )
}
