import { POST_SUBMIT } from "../action/submit";

const pfacSubmit = ( state = {}, action ) => {
  switch( action.type ) {
    case POST_SUBMIT:
      return {
        ...state,
        ...action.response
      };
    default:
      return state;
  }
};

export default pfacSubmit;