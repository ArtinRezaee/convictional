export const isBodyValid = (body: any): boolean => {
  if (!body) {
    return false;
  }

  if (body instanceof Function) {
    return false;
  }

  return Object.keys(body).length !== 0;
};
