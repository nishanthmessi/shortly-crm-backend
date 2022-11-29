const Lead = require('../models/lead.modal')
const { STATUS } = require('../utils/constants')

const createLead = async (leadData) => {
  try {
    const lead = await Lead.create(leadData);
    return lead;
  } catch (error) {
    throw {error: ValidationError, code: STATUS.UNPROCESSABLE_ENTITY};
  }
}

const fetchLead = async (filter) => {
  let query = {}
  if (filter.leadName) {
    query.leadName = filter.leadName
  }
  let leads = await Lead.find(query)
  if(!leads) {
    throw {
      err: 'Not able to find lead',
      code: STATUS.NOT_FOUND
    }
  }
  return leads
}

const getLeadById = async (id) => {
  const lead = await Lead.findById(id);
  if(!lead) {
      throw {
          err: "No lead found for the corresponding id provided",
          code: STATUS.NOT_FOUND
      }
  };
  return lead;
}

const updateLead = async (id, data) => {
  try {
    const lead = await Lead.findByIdAndUpdate(id, data, {new: true, runValidators: true});
    return lead;
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

const deleteLead = async (id) => {
  try {
    const response = await Lead.findByIdAndDelete(id);
    if(!response) {
      throw {
          err: "No lead record found for the id provided",
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
  createLead,
  fetchLead,
  getLeadById,
  updateLead,
  deleteLead,
}