import { ADD_TWEETS_DATA, CLEAR_DATA, LATEST_DATA, QUERY, QUERY_MORE_DATA, RECENT } from "./actions";

const initialState = {
  tweets: [],
  query: false,
  users: [],
  includes: {
    media: [],
    users: []
  },
  latestData: false,
  userProfile: {
    name: 'Test User',
    username: `Test${Math.round(Math.random() * (9999 - 1000 + 1) + 1000)}`
  }
}

const reducer = (state = initialState, action) => {
  let query;
  let tweets;
  let users;
  let includes_obj = {}

  switch (action.type) {
    case QUERY:
      return {
        ...state,
        query: action.query,
        tweets: action.tweets,
        users: action.users,
        includes: {
          media: action.includes?.media ? action.includes?.media : [],
          users: action.includes?.users ? action.includes?.users : [],
        }
      };
    case QUERY_MORE_DATA:
      query = action.query;
      tweets = [...state.tweets, ...action.tweets];
      users = [...state.users, ...action.users];
      includes_obj = {};

      if (action?.includes?.users) {
        includes_obj.users = [...state?.includes?.users, ...action?.includes?.users];
      } else {
        includes_obj.users = [...state?.includes?.users];
      }

      if (action?.includes?.media) {
        includes_obj.media = [...state?.includes?.media, ...action?.includes?.media];
      } else {
        includes_obj.media = [...state?.includes?.media];
      }

      return {
        ...state,
        query: query,
        tweets: tweets,
        users: users,
        includes: includes_obj
      }
    case CLEAR_DATA:
      return {
        ...state,
        tweets: [],
        query: false,
        users: [],
        includes: {
          media: [],
          users: []
        }
      }
    case LATEST_DATA:
      return {
        ...state,
        latestData: action.status
      }
    case ADD_TWEETS_DATA:
      query = action.query;
      tweets = [...action.tweets, ...state.tweets];
      users = [...action.users, ...state.users];
      includes_obj = {};

      if (action?.includes?.users) {
        includes_obj.users = [...action?.includes?.users, ...state?.includes?.users];
      } else {
        includes_obj.users = [...state?.includes?.users];
      }

      if (action?.includes?.media) {
        includes_obj.media = [...action?.includes?.media, ...state?.includes?.media];
      } else {
        includes_obj.media = [...state?.includes?.media];
      }

      return {
        ...state,
        query: query,
        tweets: tweets,
        users: users,
        includes: includes_obj
      }
    default:
      return state;
  }
}




export default reducer;