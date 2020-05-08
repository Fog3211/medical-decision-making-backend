import { Application } from 'egg'

export default (app: Application) => {
  const {
    router,
    controller
  } = app

  // admin 后台相关接口

  // login 登录
  router.post('/admin/login', controller.adminer.login)

  // user 前台用户管理
  router.get('/admin/user', controller.user.userList)
  router.del('/admin/user/:id', controller.user.destroyUser)
  router.put('/admin/user/:id', controller.user.update)
  router.get('/admin/user/:id', controller.user.showUserDetail)

  // auth 权限管理
  router.get('/admin/auth', controller.auth.authList)

  // disease 疾病管理
  router.get('/admin/disease', controller.disease.diseaseList)
  router.post('/admin/disease', controller.disease.create)
  router.del('/admin/disease/:id', controller.disease.destroy)
  router.put('/admin/disease/:id', controller.disease.update)
  router.get('/admin/disease/:id', controller.disease.show)

  // part 按部位查询
  router.get('/admin/part', controller.part.partList)

  // department 按科室查询
  router.get('/admin/department', controller.department.departmentList)

  // adminer 后台用户管理
  router.get('/admin/adminerList', controller.adminer.adminerList)
  router.post('/admin/adminer', controller.adminer.createAdminer)
  router.del('/admin/adminer/:id', controller.adminer.destroyAdminer)
  router.put('/admin/adminer/:id', controller.adminer.update)
  router.get('/admin/adminer/:id', controller.adminer.adminerDetail)

  // hospital 医院管理
  router.get('/admin/hospital', controller.hospital.hospitalList)
  router.post('/admin/hospital', controller.hospital.create)
  router.del('/admin/hospital/:id', controller.hospital.destroy)
  router.put('/admin/hospital/:id', controller.hospital.update)
  router.get('/admin/hospital/:id', controller.hospital.show)

  // decision 决策管理
  router.get('/admin/decision', controller.decision.decisionList)
  router.del('/admin/decision/:id', controller.decision.destroyDecision)
  router.put('/admin/decision/:id', controller.decision.update)
  router.get('/admin/decision/:id', controller.decision.show)
  // router.resources('decision', '/admin/decision', controller.decision)

  // question 问答管理
  router.get('/admin/question', controller.question.questionList)
  // router.del('/admin/decision/:id', controller.decision.destroyDecision)
  // router.put('/admin/decision/:id', controller.decision.update)
  // router.get('/admin/decision/:id', controller.decision.show)



  // api 前台相关接口

  // login
  router.post('/api/login', controller.user.login)
  router.post('/api/register', controller.user.register)

}
