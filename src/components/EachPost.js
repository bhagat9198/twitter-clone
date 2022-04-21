import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { formateDate } from '../store/actions';
import PostFooter from './PostFooter';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

export default function EachPost(props) {
  const { media, post, user } = props;

  let text = post.text;
  let displayBanners = [];
  let initialTrim = 0;

  function replyToUI() {
    if (post.entities && post.entities.mentions && post.entities.mentions.length > 0) {
      return post.entities.mentions.map(m => {
        let isReplyTo = text.substring(0, 2);
        if (isReplyTo.includes('RT')) {
          initialTrim = m.end + 1;
          m.used = true;
          return <>Replying to <Link to='/'>{`@${m.username}  `}</Link></>
        }
        // hello
        console.log();
        if (m.start == 0) {
          initialTrim = m.end + 1;
          return <>Replying to <Link to='/'>{`@${m.username}  `}</Link></>
        }
      })
    }
  }

  function textUI() {
    let modifers = [];

    for (let i = 0; i < text.length; i++) {
      if (text[i] == '\\' && text[i + 1] == 'n') {
        modifers.push({
          modifiedText: <><br /></>,
          name: 'new line',
          start: i
        })
      }
    }


    if (post.entities && post.entities.urls && post.entities.urls.length > 0) {
      post.entities.urls.forEach(u => {
        let modifiedText = <Link to={u.expanded_url}>{u.display_url}</Link>
        modifers.push({ modifiedText, start: u.start, end: u.end, name: u.display_url });
        if (u.description) {
          displayBanners.push(
            <>
              <div style={{ border: '1px solid gray', display: 'flex', marginTop: '5px', marginBottom: '5px', padding: '5px', borderRadius: '10px' }}>
                <div>
                  {u?.img && <img src={u.img} alt='thumnail' />}
                </div>
                <div>
                  <p>{u?.display_url}</p>
                  <p>{u?.title}</p>
                  <p>{u?.description}</p>
                </div>
              </div>
            </>
          )
        }
      })
    }

    if (post.entities && post.entities.hashtags && post.entities.hashtags.length > 0) {
      post.entities.hashtags.forEach(h => {
        let modifiedText = <Link to='/'>#{h.tag}</Link>
        modifers.push({ modifiedText, start: h.start, end: h.end, name: h.tag });
      })
    }

    if (post.entities && post.entities.mentions && post.entities.mentions.length > 0) {
      post.entities.mentions.forEach(m => {
        if (!m.used) {
          let modifiedText = <Link to={m.id}>{m.username}</Link>
          modifers.push({ modifiedText, start: m.start, end: m.end, name: m.username });
        }
      })
    }

    let sortedModifer = [];
    let max;
    let selectedIndex;
    // console.log('EachPost :: textUI :: sortedModifer : ', sortedModifer);
    // console.log('EachPost :: textUI :: modifers : ', modifers);

    for (let i = 0; i < modifers.length; i++) {
      max = modifers[0].end;
      selectedIndex = 0;
      for (let j = 0; j < modifers.length; j++) {
        if (!modifers[j]?.checked) {
          if (modifers[j].end < max) {
            max = modifers[j].end;
            selectedIndex = j
          }
        }
        if (j === modifers.length - 1) {
          sortedModifer.push(modifers[selectedIndex])
          modifers.splice(selectedIndex, 1)
        }
      }
    }


    console.log('EachPost :: textUI :: sortedModifer :: ', sortedModifer, modifers);

    if (sortedModifer.length > 0) {
      let prevIndex = 0;
      let updatedText = sortedModifer.map((m, index) => {
        let txtComp;
        if (index == 0 && initialTrim > 0) {
          prevIndex = initialTrim
          console.log('prevIndex :: ', prevIndex);
          console.log('prevIndex :: ', text.substring(prevIndex, m.start));
          if (prevIndex >= m.start) {
            txtComp = <></>
          } else {
            txtComp = <>{text.substring(prevIndex, m.start)} {m.modifiedText}</>;
          }
        } else {
          console.log('prevIndex :: ', text.substring(prevIndex, m.start));

          txtComp = <>{text.substring(prevIndex, m.start)} {m.modifiedText} </>;
        }
        prevIndex = m.end;
        return txtComp;
      })
      return <>{updatedText}{text.substring(sortedModifer[sortedModifer.length - 1].end)}</>
    } else {
      if (initialTrim > 0) {
        return text.substring(initialTrim);
      }
      return text;
    }
  }

  function mediaUi() {
    if (media.length > 0) {
      return (<>
        <div style={{ display: 'flex', width: '100%', height: '400px', borderRadius: '30px', marginTop: '10px' }}>
          {
            media.map(m => {
              if (m.type == 'photo') {

                return <img style={{ height: '100%', objectFit: 'cover', width: '100%' }} src={m.url} alt={m.media_key} />
              } else if (m.type == 'media') {
                return <>
                  <ReactPlayer src={m.url} />
                </>
              } else {
                return <></>
              }
            })
          }
        </div>
      </>)

    }
  }

  function bannerUI() {
    if (displayBanners.length === 0) return;
    return (
      <div style={{ marginTop: '10px' }}>
        {displayBanners.map(b => b)}
      </div>
    )
  }

  return (
    <div className='each-post' >
      <div style={{ display: 'flex' }} >
        <div>
          <div style={{
            borderRadius: '50%', background: 'gray',
            aspectRatio: '1 1',
            height: '50px', width: '50px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }} >
            {user.profile_image_url ?
              <img style={{ width: '100%', height: '100%', borderRadius: '50%' }} src={user.profile_image_url} alt="img" />
              : <AiOutlineUser style={{ fontSize: '150%' }} />}
          </div>
        </div>
        <div style={{ padding: '10px 20px 0px 20px', width: '100%' }}>
          <div style={{ paddingBottom: '30px' }}>
            <div style={{ paddingBottom: '10px' }}>
              <div className='post-heading' style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ paddingRight: '10px', fontSize: '110%' }} ><b>{user.name}</b></p>
                {user.verified && <div style={{ width: '25px', height: '25px', aspectRatio: '1 1', margin: '0 10px' }}>
                  <img alt='img' style={{ width: '100%', height: '100%', objectFit: 'contain' }} src="https://img.icons8.com/ios-filled/50/000000/verified-account.png" />
                </div>}
                <p style={{ paddingRight: '10px', fontSize: '90%', color: 'gray' }} >
                  @{user.username}
                </p>
                <p style={{ paddingRight: '10px', fontSize: '90%', color: 'gray' }} >
                  {formateDate({ isoDate: post.created_at })}
                </p>
              </div>
              <div style={{ fontSize: '90%', color: 'gray' }}>
                {replyToUI()}
              </div>
            </div>
            <div >
              {textUI()}
            </div>
            <div>
              {bannerUI()}
            </div>
            {mediaUi()}
          </div>
          <PostFooter metrics={post.public_metrics} />
        </div>
      </div>
    </div>
  )
}