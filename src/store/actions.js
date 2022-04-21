import axios from 'axios';

export const RECENT = 'RECENT';
export const QUERY = 'QUERY';

let BASE_URL;

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:5000'
} else {
  BASE_URL = ''
}

export const fetchQuery = ({ query }) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${BASE_URL}/query?query=${query}`);
      console.log('fetchQuery :: res :: ', res);
      const users = [];
      for (let i = 0; i < res.data.data.data.length; i++) {
        const id = res.data.data.data[i].author_id;
        const resUser = await axios.get(`${BASE_URL}/user/${id}`);
        // console.log('fetchQuery :: resUser :: ', resUser);
        users.push(resUser.data.data.data)
      }

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