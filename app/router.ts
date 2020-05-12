import { Application } from 'egg'

export default (app: Application) => {
  const {
    router,
    controller,
    middleware
  } = app

  // admin 后台相关接口
  // login 登录
  router.post('/admin/login', controller.adminer.login)

  // user 前台用户管理
  router.get('/admin/user', middleware.jwt(), controller.user.userList)
  router.del('/admin/user/:id', middleware.jwt(), controller.user.destroyUser)
  router.put('/admin/user/:id', middleware.jwt(), controller.user.update)
  router.get('/admin/user/:id', middleware.jwt(), controller.user.showUserDetail)

  // auth 权限管理
  router.get('/admin/auth', middleware.jwt(), controller.auth.authList)

  // disease 疾病管理
  router.get('/admin/disease', middleware.jwt(), controller.disease.diseaseList)
  router.post('/admin/disease', middleware.jwt(), controller.disease.create)
  router.del('/admin/disease/:id', middleware.jwt(), controller.disease.destroyDisease)
  router.put('/admin/disease/:id', middleware.jwt(), controller.disease.updateDisease)
  router.get('/admin/disease/:id', middleware.jwt(), controller.disease.diseaseDetail)

  // adminer 后台用户管理
  router.get('/admin/adminer', middleware.jwt(), controller.adminer.adminerList)
  router.post('/admin/adminer', middleware.jwt(), controller.adminer.createAdminer)
  router.del('/admin/adminer/:id', middleware.jwt(), controller.adminer.destroyAdminer)
  router.put('/admin/adminer/:id', middleware.jwt(), controller.adminer.updateAdminer)
  router.get('/admin/adminer/:id', middleware.jwt(), controller.adminer.adminerDetail)

  // hospital 医院管理
  router.get('/admin/hospital', middleware.jwt(), controller.hospital.hospitalList)
  router.post('/admin/hospital', controller.hospital.create)
  router.del('/admin/hospital/:id', middleware.jwt(), controller.hospital.destroyHospital)
  router.put('/admin/hospital/:id', middleware.jwt(), controller.hospital.updateHospital)
  router.get('/admin/hospital/:id', middleware.jwt(), controller.hospital.hospitalDetail)

  // decision 决策管理
  router.get('/admin/decision', middleware.jwt(), controller.decision.decisionList)
  router.del('/admin/decision/:id', middleware.jwt(), controller.decision.destroyDecision)
  router.put('/admin/decision/:id', middleware.jwt(), controller.decision.updateDecision)
  router.get('/admin/decision/:id', middleware.jwt(), controller.decision.decisionDetail)

  // part 按部位查询
  router.get('/admin/part', middleware.jwt(), controller.part.partList)

  // department 按科室查询
  router.get('/admin/department', middleware.jwt(), controller.department.departmentList)


  // api 前台相关接口
  // login
  router.post('/api/login', controller.user.login)
  router.post('/api/register', controller.user.register)

  // part 按部位查询
  router.get('/api/part', controller.part.partList)

  // department 按科室查询
  router.get('/api/department', controller.department.departmentList)

  // question 问答管理
  router.get('/api/question', controller.question.questionList)
  router.del('/api/question/:id', controller.question.destroy)

  // 查询疾病
  router.get('/api/disease', controller.disease.diseaseList)

  // 漫画数据
  router.get('/api/cartoon', controller.cartoon.cartoonList)
}
