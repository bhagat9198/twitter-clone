import React, { useEffect, useState } from 'react';
import { BsSearch, BsXCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux'
import { fetchQuery } from '../store/actions';


export default function Search() {
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!input) return;
    if (!searchQuery) return;

    async function asyncFun() {
      const res = await dispatch(fetchQuery({ query: input }));
      // console.log('Search :: res :: ', res);
      setSearchQuery(false);
    }
    asyncFun();
  }, [searchQuery])

  function keyDownHandler(e) {
    // console.log('Search :: keyDownHandler :: e :: ', e);
    // console.log('Search :: keyDownHandler :: e :: ', e.keyCode);
    if (e.keyCode === 13) {
      setSearchQuery(true);
    }
  }

  return (
    <div className='input-text'>
      <BsSearch style={{ fontSize: '150%', marginRight: '20px' }} />
      <input
        type="text"
        placeholder='Search Twitter'
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={keyDownHandler}
        style={{ flex: 1 }}
      />
      {input && <BsXCircleFill style={{ fontSize: '150%' }} />}
    </div>
  )
}
