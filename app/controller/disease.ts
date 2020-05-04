import { Controller, Context } from 'egg'
import { CREATE_DISEASE } from '../config/rule.config'
import { DEFAULT_PAGENO, DEFAULT_PAGESIZE } from '../config/constant.config'

export default class DiseaseController extends Controller {
    constructor(ctx: Context) {
        super(ctx)
    }
    // 获取疾病列表
    public async index() {
        const { ctx, service } = this

        // 组装参数
        const payload = ctx.request.query || {}
        const params = {
            ...payload,
            pageNo: Number(payload.pageNo) || DEFAULT_PAGENO,
            pageSize: Number(payload.pageSize) || DEFAULT_PAGESIZE
        }
        const result = await service.disease.index(params)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, result })
    }

    // 创建单个用户
    async create() {
        const { ctx, service } = this

        ctx.validate(CREATE_DISEASE)

        const payload = ctx.request.body || {}
        const result = await service.disease.create(payload)

        ctx.helper.success({ ctx, result })
    }

    // 删除单个用户
    async destroy() {
        const { ctx, service } = this
        const { id } = ctx.params

        await service.disease.destroy(id)

        ctx.helper.success({ ctx, msg: '删除成功' })
    }

    // 修改角色
    async update() {
        const { ctx, service } = this
        const { id } = ctx.params

        const payload = ctx.request.body || {}
        await service.disease.update(id, payload)

        ctx.helper.success({ ctx })
    }

    // 获取单个角色
    async show() {
        const { ctx, service } = this
        const { id } = ctx.params

        const result = await service.disease.show(id)

        ctx.helper.success({ ctx, result })
    }

}
