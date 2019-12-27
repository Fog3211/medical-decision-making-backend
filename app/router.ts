import { Application } from 'egg'

export default (app: Application) => {
  const {
    router,
    controller
  } = app
  router.get('/', controller.home.index)

  // role
  router.post('/api/role', controller.role.create)
  router.post('/api/role/:id', controller.role.destroy)
  router.put('/api/role/:id', controller.role.update)
  router.get('/api/role/:id', controller.role.show)
  router.resources('role', '/api/role', controller.role)
}
