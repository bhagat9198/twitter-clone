import { QUERY, RECENT } from "./actions";

const initialState = {
  recent: [],
  query: false
}

const reducer = (state = initialState, action) => {
  switch (action.case) {
    case RECENT:
      return state;
    case QUERY:
      return state;
    default:
      return state;
  }
}

export default reducer;