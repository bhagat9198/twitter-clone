import React from 'react'
import { useSelector } from 'react-redux'
import EachPost from '../components/EachPost'
import Main from '../components/Main'
import Navigation from '../components/Navigation'
import Search from '../components/Search'

export default function Home() {
  const allTweets = useSelector(state => state.reducer).tweets;
  const allIncludes = useSelector(state => state.reducer).includes;
  const query = useSelector(state => state.reducer).query;
  const allUsers = useSelector(state => state.reducer).users;
  // console.log('Home :: allTweets :: ', allTweets);
  // console.log('Home :: allUsers :: ', allUsers);
  // console.log('Home :: allIncludes :: ', allIncludes);
  // console.log('Home :: query :: ', query);

  function allTweetsUi() {
    if (allTweets.length == 0) {
      return <div style={{ display: 'flex', justifyContent: 'center' }} >Search for Tweets</div>
    }

    return allTweets.map((post, index) => {
      let media = [];
      let user = allUsers[index];

      if (post?.attachments) {
        const mediaKeys = post?.attachments?.media_keys;
        mediaKeys.map(mk => {
          const isMediaPresent = allIncludes.media.filter(m => m.media_key == mk);
          if (isMediaPresent.length > 0) {
            let mm = isMediaPresent.map(m => m);
            media.push(...mm)
          }
        })
      }
      return (
        <EachPost
          media={media}
          user={user}
          post={post}
        />
      )
    })

  }

  return (
    <>
      <div className='main-body' >
        <Navigation />
        <Main>
          <div style={{ borderBottom: '1px solid rgb(211, 211, 211)', padding: '20px' }} >
            <Search />
          </div>
          {allTweetsUi()}
        </Main>
      </div>
    </>
  )
}
