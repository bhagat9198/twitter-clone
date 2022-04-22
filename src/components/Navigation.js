import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsTwitter, BsHash } from 'react-icons/bs'
import { AiOutlineUser, AiOutlineBell, AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineNotificationsActive } from 'react-icons/md'
import { clearTweetsData, fetchNewTweets } from '../store/actions';

export default function Navigation({ setSearchFocus, setMg }) {
  const dispatch = useDispatch();
  const isLatestTweet = useSelector(state => state.reducer).latestData;
  const userProfile = useSelector(state => state.reducer).userProfile;
  // console.log('Navigation :: isLatestTweet :: ', isLatestTweet);
  const homeHandler = () => {
    window.scrollTo(0, 0);
  }

  const searchHandler = () => {
    setSearchFocus(true);
    setMg('Search for Tweets')
    dispatch(clearTweetsData());
  }

  const notificationHandler = () => {
    window.scrollTo(0, 0);
    dispatch(fetchNewTweets())
  }

  return (
    <div className='navigation'>
      <div className='navigation-cont flex alignCenter'>
        <div style={{ flex: 1 }} >
          <div className='nav-item'>
            <p className='nav-icon'>
              <BsTwitter style={{ fontSize: '120%', color: '#00ACEE' }} />
            </p>
          </div>
          <div className='nav-item' onClick={homeHandler} >
            <p className='nav-icon'>
              <BsHash />
            </p>
            <p className='nav-desc'>Home</p>
          </div>
          <div className='nav-item' onClick={searchHandler}>
            <p className='nav-icon'>
              <AiOutlineSearch />
            </p>
            <p className='nav-desc'>Search</p>
          </div>
          <div className='nav-item' onClick={notificationHandler}>
            <p className='nav-icon'>
              {isLatestTweet ? <MdOutlineNotificationsActive style={{ color: '#00ACEE', fontWeight: 'bold' }} /> : <AiOutlineBell />}
            </p>
            <p className='nav-desc'>Notifications</p>
          </div>
        </div>
        <div>
          <div className='nav-item'>
            <p className='nav-icon'>
              <AiOutlineUser />
            </p>
            <p className='nav-desc' style={{ fontSize: '70%' }}>
              <b>{userProfile.name}</b>  <br />
              @{userProfile.username}
            </p>
          </div>
        </div>
      </div>
    </div >
  )
}
