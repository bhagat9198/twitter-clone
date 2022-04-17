import React, { useState } from 'react';
import { BsSearch, BsXCircleFill } from 'react-icons/bs';

export default function Search() {
  const [input, setInput] = useState('')


  return (
    <div className='input-text'>
      <div style={{ flex: 1 }}>
        <BsSearch style={{ fontSize: '150%', marginRight: '20px' }} />
        <input
          type="text"
          placeholder='Search Twitter'
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>
      {input && <BsXCircleFill style={{ fontSize: '150%' }} />}
    </div>
  )
}
