const Contact = require('../models/contact.model')
const { STATUS } = require('../utils/constants')

const createContact = async (contactData) => {
  try {
    const contact = await Contact.create(contactData);
    return contact;
  } catch (error) {
    throw {error: ValidationError, code: STATUS.UNPROCESSABLE_ENTITY};
  }
}

const fetchContact = async (filter) => {
  let query = {}
  if (filter.contactName) {
    query.contactName = filter.contactName
  }
  let contacts = await Contact.find(query)
  if(!contacts) {
    throw {
      err: 'Not able to find contact',
      code: STATUS.NOT_FOUND
    }
  }
  return contacts
}

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  if(!contact) {
      throw {
          err: "No contact found for the corresponding id provided",
          code: STATUS.NOT_FOUND
      }
  };
  return contact
}

const updateContact = async (id, data) => {
  try {
    const contact = await Contact.findByIdAndUpdate(id, data, {new: true, runValidators: true});
    return contact
  } catch (error) {
    if(error.name == 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
          err[key] = error.errors[key].message;
      });
      console.log(err);
      throw {err: err, code: STATUS.UNPROCESSABLE_ENTITY};
    } else {
      throw error;
    }
  }
}

const deleteContact = async (id) => {
  try {
    const response = await Contact.findByIdAndDelete(id);
    if(!response) {
      throw {
          err: "No contact record found for the id provided",
          code: STATUS.NOT_FOUND
      }
  }
  return response
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createContact,
  fetchContact,
  getContactById,
  updateContact,
  deleteContact,
}