export const sendSuccess = (res: any, data: any, message = "Success", statusCode = 200) => {
  res.status(statusCode).json({ success: true, message, data });
};

export const sendError = (res: any, message = "Something went wrong", statusCode = 500) => {
  res.status(statusCode).json({ success: false, message });
};
