const Account = require('../models/account.model')
const { STATUS } = require('../utils/constants')

const createAccount = async (contactData) => {
  try {
    const account = await Account.create(contactData);
    return account;
  } catch (error) {
    throw {error: ValidationError, code: STATUS.UNPROCESSABLE_ENTITY};
  }
}

const fetchAccount = async (filter) => {
  let query = {}
  if (filter.accountName) {
    query.accountName = filter.accountName
  }
  let accounts = await Account.find(query)
  if(!accounts) {
    throw {
      err: 'Not able to find account',
      code: STATUS.NOT_FOUND
    }
  }
  return accounts
}

const getAccountById = async (id) => {
  const account = await Account.findById(id);
  if(!account) {
      throw {
          err: "No account found for the corresponding id provided",
          code: STATUS.NOT_FOUND
      }
  };
  return account
}

const updateAccount = async (id, data) => {
  try {
    const account = await Account.findByIdAndUpdate(id, data, {new: true, runValidators: true});
    return account
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

const deleteAccount = async (id) => {
  try {
    const response = await Account.findByIdAndDelete(id);
    if(!response) {
      throw {
          err: "No account record found for the id provided",
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
  createAccount,
  fetchAccount,
  getAccountById,
  updateAccount,
  deleteAccount,
}