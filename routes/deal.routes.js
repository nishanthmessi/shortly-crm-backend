const dealController = require('../controllers/deal.controller')
const dealMiddleware = require('../middlewares/deal.middleware')

const routes = (app) => {
  app.post('/api/v1/deals',
    dealMiddleware.validateDealCreateRequest,
    dealController.createDeal
  )

  app.get('/api/v1/deals' ,
    dealController.getDeals
  )

  app.get('/api/v1/deals/:id',
    dealController.getDeal
  )

  app.patch('/api/v1/deals/:id',
   dealController.updateDeal
  )

  app.delete('/api/v1/deals/:id', 
    dealController.deleteDeal
  )
}

module.exports = routes