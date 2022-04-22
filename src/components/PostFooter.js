import React from 'react'
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai'
import { BsChat, BsUpload } from 'react-icons/bs'
import { FiTriangle } from 'react-icons/fi'

export default function PostFooter(props) {
  const { metrics, reply_settings, source } = props;
  const { like_count, quote_count, reply_count, retweet_count } = metrics;
  // console.log('PostFooter :: props :: ', props);

  return (
    <>
      <div className='flex justifyCenter'>
        <div className='post-footer-item'>
          <span className='post-footer-icon'>
            <BsChat />
          </span>
          <span className='post-footer-info'>{reply_count ? reply_count : ''}</span>
        </div>
        <div className='post-footer-item'>
          <span className='post-footer-icon'>
            <AiOutlineRetweet />
          </span>
          <span className='post-footer-info'>{retweet_count ? retweet_count : ''}</span>
        </div>
        <div className='post-footer-item'>
          <span className='post-footer-icon'>
            <AiOutlineHeart />
          </span>
          <span className='post-footer-info'>{like_count ? like_count : ''}</span>
        </div>
        <div className='post-footer-item'>
          <span className='post-footer-icon'>
            <BsUpload />
          </span>
          <span className='post-footer-info'></span>
        </div>
        <div className='post-footer-item'>
          <span className='post-footer-icon'>
            <FiTriangle />
          </span>
          <span className='post-footer-info'></span>
        </div>
      </div>
    </>
  )
}
