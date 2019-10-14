export const POST_SUBMIT = "POST_SUBMIT";

const pfacSubmit = response => {
  return {
    type: POST_SUBMIT,
    response
  }
};

export default pfacSubmit;