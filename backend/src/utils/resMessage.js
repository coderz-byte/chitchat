export const resMessage = (success, message, ...rest) => {
  return {
    success,
    message,
    rest,
  };
};
