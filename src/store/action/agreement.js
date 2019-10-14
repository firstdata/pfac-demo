export const GET_AGREEMENT = 'GET_AGREEMENT';

const getAgreement = agreement => {
  return {
    type: GET_AGREEMENT,
    agreement,
  };
};

export default getAgreement;
