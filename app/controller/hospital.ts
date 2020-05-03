import { Controller, Context } from 'egg'
// import { GET_HOSPITAL_LIST, CREATE_HOSPITAL } from '../config/rule.config'

export default class HospitalController extends Controller {
    constructor(ctx: Context) {
        super(ctx)
    }
    // 获取所有用户列表
    public async index() {
        const { ctx, service } = this

        // ctx.validate(GET_HOSPITAL_LIST)
        // 组装参数
        const payload = ctx.request.body || {}
        // 调用 Service 进行业务处理
        const result = await service.hospital.index(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, result })
    }

    // 创建单个用户
    async create() {
        const { ctx, service } = this

        // ctx.validate(CREATE_HOSPITAL)

        const payload = ctx.request.body || {}
        const result = await service.hospital.create(payload)

        ctx.helper.success({ ctx, result })
    }

    // 删除单个用户
    async destroy() {
        const { ctx, service } = this
        const { id } = ctx.params

        await service.hospital.destroy(id)

        ctx.helper.success({ ctx, msg: '删除成功' })
    }

    // 修改角色
    async update() {
        const { ctx, service } = this
        const { id } = ctx.params

        const payload = ctx.request.body || {}
        await service.hospital.update(id, payload)

        ctx.helper.success({ ctx })
    }

    // 获取单个角色
    async show() {
        const { ctx, service } = this
        const { id } = ctx.params

        const result = await service.hospital.show(id)

        ctx.helper.success({ ctx, result })
    }

}
