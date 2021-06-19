import { GET_DATA } from "../type";
import { UPDATE_DATA } from "../type";
import { GET_COMMENTS } from "../type";
import { CLOSE_COMMENTS } from "../type";


const handlers = {
  [GET_DATA]: (state, { payload }) => {
   return ({ ...state, posts:[...state.posts, ...payload] ,loading:false})}
  
  ,
  [UPDATE_DATA]: (state, { payload }) => ({
    ...state,
    posts: [...state.posts, ...payload],
  }),
  [CLOSE_COMMENTS]: (state, { payload }) => ({
    ...state,
    visible:false,
  }),
  [GET_COMMENTS]: (state, { payload }) =>{
      return ({
    ...state,
    comments: payload,
    visible:true
  })},
  DEFAULT: (state) => state,
};



export const DataReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

