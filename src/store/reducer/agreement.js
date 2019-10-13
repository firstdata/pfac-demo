import { GET_AGREEMENT} from '../action/agreement';

const getAgreement = (state = {}, action) => {
  switch (action.type) {
    case GET_AGREEMENT:
      return {
        ...state,
        ...action.agreement
      };
    default:
      return state;
  }
};

export default getAgreement;
