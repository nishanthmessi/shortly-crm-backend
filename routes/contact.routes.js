const contactController = require('../controllers/contact.controller')
const contactMiddleware = require('../middlewares/contact.middleware')

const routes = (app) => {
  app.post('/api/v1/contacts',
    contactMiddleware.validateContactCreateRequest,
    contactController.createContact
  )

  app.get('/api/v1/contacts' ,
    contactController.getContacts
  )

  app.get('/api/v1/contacts/:id',
    contactController.getContact
  )

  app.patch('/api/v1/contacts/:id',
   contactController.updateContact
  )

  app.delete('/api/v1/contacts/:id', 
    contactController.deleteContact
  )
}

module.exports = routes