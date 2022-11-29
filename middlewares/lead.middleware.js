const badRequestResponse = {
  success: false,
  err: "",
  data: {},
  message: "Bad Request"
};

const validateLeadCreateRequest = async (req, res, next) => {
  if(!req.body.leadName) {
    badRequestResponse.err = "Lead name must be provided"
    return res.status(400).json(badRequestResponse)
  }
  next()
}

module.exports = {
  validateLeadCreateRequest
}