const badRequestResponse = {
  success: false,
  err: "",
  data: {},
  message: "Bad Request"
};

const validateDealCreateRequest = async (req, res, next) => {
  if(!req.body.dealName) {
    badRequestResponse.err = "Deal name must be provided"
    return res.status(400).json(badRequestResponse)
  }
  next()
}

module.exports = {
  validateDealCreateRequest
}