import React, { useEffect, useRef, useState } from 'react';
import { BsSearch, BsXCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux'
import { fetchLatestQueryData, fetchQuery } from '../store/actions';


export default function Search({ searchFocus, setSearchFocus }) {
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState(false);
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  useEffect(() => {
    if (!input) return;
    if (!searchQuery) return;

    async function asyncFun() {
      const res = await dispatch(fetchQuery({ query: input }));
      // console.log('Search :: res :: ', res);
      setSearchQuery(false);
      setSearchFocus(false);
    }
    asyncFun();
  }, [searchQuery])

  useEffect(() => {
    if (!searchRef.current) return;

    if (searchFocus) {
      searchRef.current.focus();
    }

  }, [searchFocus])

  function keyDownHandler(e) {
    if (!input) return;
    // console.log('Search :: keyDownHandler :: e :: ', e);
    // console.log('Search :: keyDownHandler :: e :: ', e.keyCode);
    if (e.keyCode != 13) {
      return
    }

    setSearchQuery(true);
    const subscriber = setInterval(() => {
      dispatch(fetchLatestQueryData({ query: input }));
    }, 1000 * 60)

    return () => subscriber;
  }

  function clearSearchHandler() {
    setInput('')
  }

  return (
    <div className='input-text'>
      <BsSearch style={{ fontSize: '150%', marginRight: '20px' }} />
      <input
        ref={searchRef}
        type="text"
        placeholder='Search Twitter (Press Enter to Search) '
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={keyDownHandler}
        style={{ flex: 1 }}
      />
      {input && <BsXCircleFill
        style={{ cursor: 'pointer', fontSize: '150%' }}
        onClick={clearSearchHandler} />}
    </div>
  )
}
