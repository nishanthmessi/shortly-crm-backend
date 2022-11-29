const contactService = require('../services/contact.service')
const { successResponseBody, errorResponseBody } = require('../utils/responsebody')
const { STATUS } = require('../utils/constants');

const createContact = async (req, res) => {
  try {
    const response = await contactService.createContact(req.body);
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

const getContacts = async (req, res) => {
  try {
    const response = await contactService.fetchContact(req.query);
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

const getContact = async (req, res) => {
  try {
      const response = await contactService.getContactById(req.params.id);
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

const updateContact = async (req, res) => {
  try {
    const response = await contactService.updateContact(req.params.id, req.body);
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

const deleteContact = async (req, res) => {
  try {
    const response = await contactService.deleteContact(req.params.id);
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
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
}
