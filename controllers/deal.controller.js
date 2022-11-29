const dealService = require('../services/deal.service')
const { successResponseBody, errorResponseBody } = require('../utils/responsebody')
const { STATUS } = require('../utils/constants');

const createDeal = async (req, res) => {
  try {
    const response = await dealService.createDeal(req.body);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully created lead";

    return res.status(STATUS.CREATED).json(successResponseBody);
  } catch (error) {
    if(error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

const getDeals = async (req, res) => {
  try {
    const response = await dealService.fetchDeal(req.query);
    successResponseBody.data = response;
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if(error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

const getDeal = async (req, res) => {
  try {
      const response = await dealService.getDealById(req.params.id);
      successResponseBody.data = response;
      return res.status(STATUS.OK).json(successResponseBody);

  } catch (error) {
      if(error.err) {
          errorResponseBody.err = error.err;
          return res.status(error.code).json(errorResponseBody);
      }
      errorResponseBody.err = error;
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

const updateDeal = async (req, res) => {
  try {
    const response = await dealService.updateDeal(req.params.id, req.body);
    successResponseBody.data = response;
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if(error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

const deleteDeal = async (req, res) => {
  try {
    const response = await dealService.deleteDeal(req.params.id);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully deleted the lead";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if(error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

module.exports = {
  createDeal,
  getDeals,
  getDeal,
  updateDeal,
  deleteDeal,
}
