import React, { useEffect, useRef, useState } from 'react';
import { BsSearch, BsXCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { fetchLatestQueryData, fetchQuery } from '../store/actions';


export default function Search({ searchFocus, setSearchFocus, setMg }) {
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
      if (!res.status) {
        toast.error('Looks like API not working, switch to local devlopment.')
      }
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
    setMg(`Searching for "${input}"`)
    setSearchQuery(true);
    const subscriber = setInterval(() => {
      const res = dispatch(fetchLatestQueryData({ query: input }));
      if (!res.status) {
        toast.error('Looks like API not working, switch to local devlopment.')
      }

    }, 1000 * 60)

    return () => subscriber;
  }

  function clearSearchHandler() {
    setInput('')
  }

  return (
    <div className='input-text'>
      <BsSearch className='searchIcon' />
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
        className='clearSearchIcon'
        onClick={clearSearchHandler} />}
    </div>
  )
}
