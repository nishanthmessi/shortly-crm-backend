const badRequestResponse = {
  success: false,
  err: "",
  data: {},
  message: "Bad Request"
};

const validateAccountCreateRequest = async (req, res, next) => {
  if(!req.body.accountName) {
    badRequestResponse.err = "Account name must be provided"
    return res.status(400).json(badRequestResponse)
  }
  next()
}

module.exports = {
  validateAccountCreateRequest
}