import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';

import EachPost from '../components/EachPost'
import Main from '../components/Main'
import Navigation from '../components/Navigation'
import Search from '../components/Search'
import { fetchMoreQueryData } from '../store/actions';
import { toast } from 'react-toastify';

export default function Home() {
  const allTweets = useSelector(state => state.reducer).tweets;
  const allIncludes = useSelector(state => state.reducer).includes;
  const query = useSelector(state => state.reducer).query;
  const allUsers = useSelector(state => state.reducer).users;
  const [searchFocus, setSearchFocus] = useState(true);
  const [msg, setMg] = useState('Search for Tweets');
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();

  // console.log('Home :: allTweets :: ', allTweets);
  // console.log('Home :: allUsers :: ', allUsers);
  // console.log('Home :: allIncludes :: ', allIncludes);
  // console.log('Home :: query :: ', query);

  function allTweetsUi() {
    if (allTweets.length == 0) {
      return <div className='flex justifyCenter searchTweets' >{msg}</div>
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

  async function loadMore() {
    const res = await dispatch(fetchMoreQueryData())
    if (!res.status) {
      setHasMore(false)
      toast.error('Looks like API not working, switch to local devlopment.')
    }
  }

  return (
    <>
      <div className='main-body' >
        <Navigation setMg={setMg} setSearchFocus={setSearchFocus} />
        <Main>
          <div className='searchCont' >
            <Search setMg={setMg} searchFocus={searchFocus} setSearchFocus={setSearchFocus} />
          </div>
          <div>
            <InfiniteScroll
              dataLength={allTweets.length} //This is important field to render the next data
              next={loadMore}
              hasMore={hasMore}
              loader={<>{allTweets?.length > 0 ? <div className='flex justifyCenter searchTweets' >Loading More Tweets...</div> : ''}</>}
              endMessage={
                allTweets?.length > 0 && <p style={{ textAlign: 'center' }}>
                  <div className='flex justifyCenter searchTweets' >You have seen it all</div>
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
