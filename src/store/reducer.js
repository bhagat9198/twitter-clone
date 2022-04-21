import { QUERY, RECENT } from "./actions";

const initialState = {
  tweets: [],
  query: false,
  users: [],
  includes: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECENT:
      return state;
    case QUERY:
      console.log('reducer :: action :: ', action);
      return {
        query: action.query,
        tweets: action.tweets,
        users: action.users,
        includes: action.includes
      };
    default:
      return state;
  }
}

export default reducer;