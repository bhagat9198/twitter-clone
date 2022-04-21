import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';

import EachPost from '../components/EachPost'
import Main from '../components/Main'
import Navigation from '../components/Navigation'
import Search from '../components/Search'
import { fetchMoreQueryData } from '../store/actions';

export default function Home() {
  const allTweets = useSelector(state => state.reducer).tweets;
  const allIncludes = useSelector(state => state.reducer).includes;
  const query = useSelector(state => state.reducer).query;
  const allUsers = useSelector(state => state.reducer).users;
  const [searchFocus, setSearchFocus] = useState(true);

  const dispatch = useDispatch();

  // console.log('Home :: allTweets :: ', allTweets);
  // console.log('Home :: allUsers :: ', allUsers);
  // console.log('Home :: allIncludes :: ', allIncludes);
  // console.log('Home :: query :: ', query);

  function allTweetsUi() {
    if (allTweets.length == 0) {
      return <div style={{ display: 'flex', justifyContent: 'center', fontSize: '120%', padding: '20px' }} >Search for Tweets</div>
    }

    return allTweets.map((post, index) => {
      let media = [];
      let user = allUsers[index];
      if (post?.attachments && post?.attachments?.media_keys && allIncludes?.media) {
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
          key={post.id}
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
        <Navigation setSearchFocus={setSearchFocus} />
        <Main>
          <div style={{ borderBottom: '1px solid rgb(211, 211, 211)', padding: '20px' }} >
            <Search searchFocus={searchFocus} setSearchFocus={setSearchFocus} />
          </div>
          <div id='scrollableDiv'>
            <InfiniteScroll
              dataLength={allTweets.length} //This is important field to render the next data
              next={() => dispatch(fetchMoreQueryData())}
              hasMore={true}
              // scrollableTarget="scrollableDiv"
              loader={<></>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            // // below props only if you need pull down functionality
            // refreshFunction={this.refresh}
            // pullDownToRefresh
            // pullDownToRefreshThreshold={50}
            // pullDownToRefreshContent={
            //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            // }
            // releaseToRefreshContent={
            //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            // }
            >
              {allTweetsUi()}
            </InfiniteScroll>
          </div>
        </Main>
      </div>
    </>
  )
}
