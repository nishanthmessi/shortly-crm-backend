const leadService = require('../services/lead.service')
const { successResponseBody, errorResponseBody } = require('../utils/responsebody')
const { STATUS } = require('../utils/constants');

const createLead = async (req, res) => {
  try {
    const response = await leadService.createLead(req.body);
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

const getLeads = async (req, res) => {
  try {
    const response = await leadService.fetchLead(req.query);
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

const getLead = async (req, res) => {
  try {
      const response = await leadService.getLeadById(req.params.id);
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

const updateLead = async (req, res) => {
  try {
    const response = await leadService.updateLead(req.params.id, req.body);
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

const deleteLead = async (req, res) => {
  try {
    const response = await leadService.deleteLead(req.params.id);
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
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
}
