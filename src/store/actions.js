import axios from 'axios';

export const QUERY = 'QUERY';
export const QUERY_MORE_DATA = 'QUERY_MORE_DATA';
export const CLEAR_DATA = 'CLEAR_DATA';
export const ADD_TWEETS_DATA = 'ADD_TWEETS_DATA';
export const LATEST_DATA = 'LATEST_DATA';

let BASE_URL;

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:5000'
} else {
  BASE_URL = 'https://twitter-backend-project.herokuapp.com'
}


let nextToken = false;
let tweets_data = [];
let users_data;
let includes_data;

export const fetchQuery = ({ query }) => {
  return async (dispatch, getState) => {
    const userName = getState().reducer.userProfile.username;
    try {
      const res = await axios.get(`${BASE_URL}/query?query=${query}&userName=${userName}`);
      // console.log('fetchQuery :: res :: ', res);
      nextToken = res.data.data.meta.next_token;

      const usersData = await loadUsers({ posts: res.data.data.data })
      if (!usersData.status) {
        throw Error('Unable to fetch users')
      }
      const users = usersData.data;

      dispatch({
        type: QUERY,
        tweets: res.data.data.data,
        query: query,
        users: users,
        includes: res.data.data.includes
      })
      return {
        status: true
      }
    } catch (error) {
      console.log('fetchQuery :: error :: ', error);
      return {
        status: false
      }
    }
  }
}

export const fetchLatestQueryData = ({ query }) => {
  return async (dispatch, getState) => {
    // console.log('fetchLatestQueryData :: query :: ', query);
    try {
      const allTweets = getState().reducer.tweets;

      const res = await axios.get(`${BASE_URL}/query?query=${query}`);
      // console.log('fetchQuery :: res :: ', res);

      let isNewpostCount = 0;
      let isNewpost = false;
      for (let i = 0; i < res.data.data.data.length; i++) {
        let postId = res.data.data.data[i].id;
        let isNewPost = allTweets.filter(t => t.id == postId)
        if (isNewPost.length == 0) {
          isNewpostCount = isNewpostCount + 1;
          if (isNewpostCount >= 3) {
            isNewpost = true;
          }
        }
      }

      // console.log('fetchLatestQueryData :: isNewpost :: ', isNewpost);

      if (!isNewpost) return;
      tweets_data = res.data.data.data;
      includes_data = res.data.data.includes;

      nextToken = res.data.data.meta.next_token;

      const usersData = await loadUsers({ posts: tweets_data })
      if (!usersData.status) {
        throw Error('Unable to fetch users')
      }
      users_data = usersData.data;

      dispatch({
        type: LATEST_DATA,
        status: true
      })
      return {
        status: true
      }
    } catch (error) {
      console.log('fetchQuery :: error :: ', error);
      return {
        status: false
      }
    }
  }
}

async function loadUsers({ posts }) {
  let users = [];
  try {
    for (let i = 0; i < posts.length; i++) {
      const id = posts[i].author_id;
      const resUser = await axios.get(`${BASE_URL}/user/${id}`);
      // console.log('fetchQuery :: resUser :: ', resUser);
      users.push(resUser.data.data.data)
    }
  } catch (error) {
    console.log('loadUsers :: error :: ', error);
    return {
      status: false
    }
  }

  return {
    data: users,
    status: true
  };
}

export const fetchMoreQueryData = () => {
  return async (dispatch, getState) => {
    try {
      // console.log('fetchMoreQueryData :: getState :: ', getState);
      const query = getState().reducer.query;
      if (!query) return;
      const res = await axios.get(`${BASE_URL}/query?query=${query}&nextToken=${nextToken}`);
      nextToken = res.data.data.meta.next_token;

      const usersData = await loadUsers({ posts: res.data.data.data })
      if (!usersData.status) {
        throw Error('Unable to fetch users')
      }
      const users = usersData.data;

      dispatch({
        type: QUERY_MORE_DATA,
        tweets: res.data.data.data,
        query: query,
        users: users,
        includes: res.data.data.includes
      })
      return {
        status: true
      }
    }
    catch (error) {
      console.log('fetchMoreQueryData :: error :: ', error);
      return {
        status: false
      }
    }
  }
}


export const clearTweetsData = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: CLEAR_DATA,
    })
  }
}


export const fetchNewTweets = () => {
  return async (dispatch, getState) => {
    const query = getState().reducer.query;

    dispatch({
      type: ADD_TWEETS_DATA,
      tweets: tweets_data,
      query: query,
      users: users_data,
      includes: includes_data
    })
    dispatch({
      type: LATEST_DATA,
      status: false
    })
    return {
      status: true
    }
  }
}



export const formateDate = ({ isoDate }) => {
  const currentTime = new Date().getTime();
  // console.log('formateDate :: currentTime :: ', currentTime);
  const postTime = new Date(isoDate).getTime();
  // console.log('formateDate :: postTime :: ', postTime);

  const diff = currentTime - postTime;
  if (diff < 60) {
    return `${Math.floor(diff)}s`
  } else if (diff < 60 * 60) {
    return `${Math.floor(diff / (60))}m`
  } else if (diff < 60 * 60 * 24) {
    return `${Math.floor(diff / (60 * 60))}h`
  } else {
    return `${Math.floor(diff / (60 * 60 * 24))}d`
  }

}