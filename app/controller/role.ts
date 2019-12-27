import { Controller } from 'egg'

export default class RoleController extends Controller {
    constructor(ctx) {
        super(ctx)
    }

    // 创建角色
    public async create() {
        const { ctx, service } = this
        // 组装参数
        const payload = ctx.request.body || {}
        // 调用 Service 进行业务处理
        const res = await service.role.create(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }

    // 删除单个角色
    async destroy() {
        const { ctx, service } = this
        // 校验参数
        const { id } = ctx.params
        // 调用 Service 进行业务处理
        await service.role.destroy(id)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }

    // 修改角色
    async update() {
        const { ctx, service } = this
        // 组装参数
        const { id } = ctx.params
        const payload = ctx.request.body || {}
        // 调用 Service 进行业务处理
        await service.role.update(id, payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }

    // 获取单个角色
    async show() {
        const { ctx, service } = this
        // 组装参数
        const { id } = ctx.params
        // 调用 Service 进行业务处理
        const res = await service.role.show(id)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }

}
