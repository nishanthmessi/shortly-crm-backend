const leadController = require('../controllers/lead.controller')
const leadMiddleware = require('../middlewares/lead.middleware')

const routes = (app) => {
  app.post('/api/v1/leads',
    leadMiddleware.validateLeadCreateRequest,
    leadController.createLead
  )

  app.get('/api/v1/leads' ,
    leadController.getLeads
  )

  app.get('/api/v1/leads/:id',
    leadController.getLead
  )

  app.patch('/api/v1/leads/:id',
    leadController.updateLead
  )

  app.delete('/api/v1/leads/:id', 
    leadController.deleteLead
  )
}

module.exports = routes