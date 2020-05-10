import { Controller, Context } from 'egg'
import { CREATE_ADMINER } from '../config/rule.config'

export default class AdminerController extends Controller {
    constructor(ctx: Context) {
        super(ctx)
    }
    // 获取所有用户列表
    public async adminerList() {
        const { ctx, service } = this
        // 组装参数
        const payload = ctx.request.query || {}

        // 调用 Service 进行业务处理
        const result = await service.adminer.adminerList(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, result })
    }

    // 创建单个用户
    async createAdminer() {
        const { ctx, service } = this

        ctx.validate(CREATE_ADMINER)

        const payload = ctx.request.body || {}

        const result = await service.adminer.createAdminer(payload)

        ctx.helper.success({ ctx, result })
    }

    // 删除单个用户
    async destroyAdminer() {
        const { ctx, service } = this
        const { id } = ctx.params

        await service.adminer.destroyAdminer(id)

        ctx.helper.success({ ctx, msg: '删除成功' })
    }

    // 修改角色
    async updateAdminer() {
        const { ctx, service } = this
        const { id } = ctx.params

        const payload = ctx.request.body || {}
        await service.adminer.updateAdminer(id, payload)

        ctx.helper.success({ ctx })
    }

    // 获取单个角色
    async adminerDetail() {
        const { ctx, service } = this
        const { id } = ctx.params

        const result = await service.adminer.adminerDetail(id)

        ctx.helper.success({ ctx, result })
    }

    // 后台用户登录
    async login() {
        const { ctx, service } = this
        const payload = ctx.request.body || {}

        const result = await service.adminer.login(payload)

        ctx.helper.success({ ctx, result })
    }

}
