class CustomErrorHandler extends Error {
  constructor(message, statuscode, from) {
    super(message);
    this.statuscode = statuscode || 500;
    this.from = from;
    Error.captureStackTrace(this, this.constructor);
  }
}

const GlobalErrorHandler = (err , req, res , next) => {
    const statuscode = err.statuscode || 500;
    const message = err.message || "Something went wrong";
    const from = err.from || "Unknown";
    if(err){
        res.status(statuscode).json({message});
    }
    else{
        next();
    }
}
// For asynchoronous error handlingy
const asyncHandler = (func) => {
  return (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };

}


export {GlobalErrorHandler , CustomErrorHandler ,asyncHandler};