import { Controller, Context } from 'egg'
import { user_rule } from '../config/rule.config'

export default class UserController extends Controller {
    constructor(ctx: Context) {
        super(ctx)
    }
    // 获取所有数据
    public async index() {
        const { ctx, service } = this
        // 校验参数
        ctx.validate(user_rule)
        // 组装参数
        const payload = ctx.request.body || {}
        // 调用 Service 进行业务处理
        const res = await service.user.index(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }

    // 创建单个用户
    async create() {
        const { ctx, service } = this
        ctx.validate(user_rule)
        const payload = ctx.request.body || {}
        const res = await service.user.create(payload)

        ctx.helper.success({ ctx, res })
    }

    // 删除单个用户
    async destroy() {
        const { ctx, service } = this
        const { id } = ctx.params
        await service.user.destroy(id)

        ctx.helper.success({ ctx })
    }

    // 修改角色
    async update() {
        const { ctx, service } = this
        const { id } = ctx.params
        const payload = ctx.request.body || {}
        await service.user.update(id, payload)

        ctx.helper.success({ ctx })
    }

    // 获取单个角色
    async show() {
        const { ctx, service } = this
        const { id } = ctx.params
        const res = await service.user.show(id)

        ctx.helper.success({ ctx, res })
    }

}
