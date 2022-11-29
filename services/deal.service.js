const Deal = require('../models/deal.model')
const { STATUS } = require('../utils/constants')

const createDeal = async (dealData) => {
  try {
    const deal = await Deal.create(dealData);
    return deal;
  } catch (error) {
    throw {error: ValidationError, code: STATUS.UNPROCESSABLE_ENTITY};
  }
}

const fetchDeal = async (filter) => {
  let query = {}
  if (filter.dealName) {
    query.dealName = filter.dealName
  }
  let deals = await Deal.find(query)
  if(!deals) {
    throw {
      err: 'Not able to find lead',
      code: STATUS.NOT_FOUND
    }
  }
  return deals
}

const getDealById = async (id) => {
  const deal = await Deal.findById(id);
  if(!deal) {
      throw {
          err: "No deal found for the corresponding id provided",
          code: STATUS.NOT_FOUND
      }
  };
  return lead;
}

const updateDeal = async (id, data) => {
  try {
    const deal = await Deal.findByIdAndUpdate(id, data, {new: true, runValidators: true});
    return deal;
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

const deleteDeal = async (id) => {
  try {
    const response = await Deal.findByIdAndDelete(id);
    if(!response) {
      throw {
          err: "No dael record found for the id provided",
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
  createDeal,
  fetchDeal,
  getDealById,
  updateDeal,
  deleteDeal,
}