import { Controller, Context } from 'egg'
import { GET_USER_LIST, CREATE_USER } from '../config/rule.config'

export default class UserController extends Controller {
    constructor(ctx: Context) {
        super(ctx)
    }
    // 获取所有用户列表
    public async index() {
        const { ctx, service } = this

        ctx.validate(GET_USER_LIST)
        // 组装参数
        const payload = ctx.request.body || {}
        // 调用 Service 进行业务处理
        const result = await service.user.index(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, result })
    }

    // 删除单个用户
    public async destroy() {
        const { ctx, service } = this
        const { id } = ctx.params

        await service.user.destroy(id)

        ctx.helper.success({ ctx, msg: '删除成功' })
    }

    // 修改角色
    public async update() {
        const { ctx, service } = this
        const { id } = ctx.params

        const payload = ctx.request.body || {}
        await service.user.update(id, payload)

        ctx.helper.success({ ctx })
    }

    // 获取单个角色
    public async show() {
        const { ctx, service } = this
        const { id } = ctx.params

        const result = await service.user.show(id)

        ctx.helper.success({ ctx, result })
    }

    // 用户登录
    public async login() {
        const { ctx, service } = this
        const payload = ctx.request.body || {}

        const result = await service.user.login(payload)

        ctx.helper.success({ ctx, result })
    }

    // 用户注册
    public async register() {
        const { ctx, service } = this

        ctx.validate(CREATE_USER)

        const payload = ctx.request.body || {}
        const result = await service.user.register(payload)

        ctx.helper.success({ ctx, result })
    }
}
