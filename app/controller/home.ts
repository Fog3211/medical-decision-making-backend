import { Controller } from 'egg'

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this
    ctx.body = `hi, egg-RESTfulAPI!
    A optimized Node.js RESTful API Server Template based on egg.js.
    https://github.com/icxcat/egg-RESTfulAPI.git`
  }
}

