import { Application } from 'egg'

export default (app: Application) => {
  const {
    router,
    controller
  } = app

  router.get('/', controller.home.index)
  // admin

  // login
  router.post('/admin/login', controller.adminer.login)

  // user
  router.get('/admin/user', controller.user.index)
  // router.post('/admin/user', controller.user.create)
  router.del('/admin/user/:id', controller.user.destroyUser)
  router.put('/admin/user/:id', controller.user.update)
  router.get('/admin/user/:id', controller.user.showUserDetail)

  // auth
  router.get('/admin/auth', controller.auth.authList)

  // disease
  // router.get('/admin/disease', controller.disease.index)
  // router.post('/admin/disease', controller.disease.create)
  // router.del('/admin/disease/:id', controller.disease.destroy)
  // router.put('/admin/disease/:id', controller.disease.update)
  // router.get('/admin/disease/:id', controller.disease.show)
  router.resources('disease', '/admin/disease', controller.disease)

  // adminer
  router.get('/admin/adminer', controller.adminer.index)
  router.post('/admin/adminer', controller.adminer.createAdminer)
  router.del('/admin/adminer/:id', controller.adminer.destroyAdminer)
  router.put('/admin/adminer/:id', controller.adminer.update)
  router.get('/admin/adminer/:id', controller.adminer.adminerDetail)

  // hospital
  router.get('/admin/hospital', controller.hospital.hospitalList)
  router.post('/admin/hospital', controller.hospital.create)
  router.del('/admin/hospital/:id', controller.hospital.destroy)
  router.put('/admin/hospital/:id', controller.hospital.update)
  router.get('/admin/hospital/:id', controller.hospital.show)

  // decision
  router.get('/admin/decision', controller.decision.index)
  router.del('/admin/decision/:id', controller.decision.destroyDecision)
  router.put('/admin/decision/:id', controller.decision.update)
  router.get('/admin/decision/:id', controller.decision.show)
  // router.resources('decision', '/admin/decision', controller.decision)



  // api
  // login
  router.post('/api/login', controller.user.login)
  router.post('/api/register', controller.user.register)
}
