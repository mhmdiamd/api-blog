export const successResponse = (status, data, ...others) => {
  if (!others || others.length == 0) {
    return {
      success: true,
      status: status,
      data: data,
    };
  }

  return {
    success: true,
    status: status,
    data: data ? data : null,
    others,
  };
};

export const errorResponse = (status, message) => {
  const err = new Error();
  err.success = false;
  err.status = status;
  err.message = message;
  return err;
};

export const errorRequired = (error) => {
  const errRequired = {
    succes: false,
    status: 400,
    message: [],
  };

  for (const data in error) {
    errRequired.message.push({ [data]: error[data].message });
  }

  return errRequired;
};
