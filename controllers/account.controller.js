const accountService = require('../services/account.service')
const { successResponseBody, errorResponseBody } = require('../utils/responsebody')
const { STATUS } = require('../utils/constants');

const createAccount = async (req, res) => {
  try {
    const response = await accountService.createAccount(req.body);
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

const getAccounts = async (req, res) => {
  try {
    const response = await accountService.fetchAccount(req.query);
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

const getAccount = async (req, res) => {
  try {
      const response = await accountService.getAccountById(req.params.id);
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

const updateAccount = async (req, res) => {
  try {
    const response = await accountService.updateAccount(req.params.id, req.body);
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

const deleteAccount = async (req, res) => {
  try {
    const response = await accountService.deleteAccount(req.params.id);
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
  createAccount,
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
}
