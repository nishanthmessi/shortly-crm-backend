const badRequestResponse = {
  success: false,
  err: "",
  data: {},
  message: "Bad Request"
};

const validateContactCreateRequest = async (req, res, next) => {
  if(!req.body.contactName) {
    badRequestResponse.err = "Contact name must be provided"
    return res.status(400).json(badRequestResponse)
  }

  if(!req.body.company) {
    badRequestResponse.err = "company name must be provided"
    return res.status(400).json(badRequestResponse)
  }
  next()
}

module.exports = {
  validateContactCreateRequest
}