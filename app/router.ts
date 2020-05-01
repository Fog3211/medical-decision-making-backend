import { Application } from 'egg'

export default (app: Application) => {
  const {
    router,
    controller
  } = app

  router.get('/', controller.home.index)

  // router.resources('user', '/api/user', app.middleware.jwt(), controller.user)

  // user
  // router.get('/api/user', controller.user.index)
  // router.post('/api/user', controller.user.create)
  // router.del('/api/user/:id', controller.user.destroy)
  // router.put('/api/user/:id', controller.user.update)
  // router.get('/api/user/:id', controller.user.show)
  router.resources('user', '/api/user', controller.user)
}
