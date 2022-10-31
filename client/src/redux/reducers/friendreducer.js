import {
  FRIENDS_SEARCH_REQUEST,
  FRIENDS_SEARCH_SUCCESS,
  FRIENDS_SEARCH_FAILURE,
  FRIENDS_RQLIST_REQUEST,
  FRIENDS_RQLIST_SUCCESS,
  FRIENDS_RQLIST_FAILURE,
  FRIENDS_LIST_REQUEST,
  FRIENDS_LIST_SUCCESS,
  FRIENDS_LIST_FAILURE,
  FRIENDS_PROCESS_SUCCESS,
} from 'redux/types';

const initialState = {
  friendsSearch: [],
  friendsList: [],
  friendsRequest: [],
  friendState: Boolean,
};

const friendreducer = (state = initialState, action) => {
  switch (action.type) {
    case FRIENDS_SEARCH_SUCCESS:
      return {
        friendsSearch: [action.payload],
      };
    case FRIENDS_LIST_SUCCESS:
      return {
        ...state,
        friendsList: action.payload,
      };
    case FRIENDS_RQLIST_SUCCESS:
      return {
        ...state,
        friendsRequest: action.payload,
      };
    default:
      return state;
  }
};

export default friendreducer;
