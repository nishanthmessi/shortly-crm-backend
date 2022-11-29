const accountController = require('../controllers/account.controller')
const accountMiddleware = require('../middlewares/account.middleware')

const routes = (app) => {
  app.post('/api/v1/accounts',
    accountMiddleware.validateAccountCreateRequest,
    accountController.createAccount
  )

  app.get('/api/v1/accounts' ,
    accountController.getAccounts
  )

  app.get('/api/v1/accounts/:id',
    accountController.getAccount
  )

  app.patch('/api/v1/accounts/:id',
    accountController.updateAccount
  )

  app.delete('/api/v1/accounts/:id', 
    accountController.deleteAccount
  )
}

module.exports = routes