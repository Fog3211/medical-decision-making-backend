import { Controller, Context } from 'egg'
// import { GET_HOSPITAL_LIST, CREATE_HOSPITAL } from '../config/rule.config'
import { DEFAULT_PAGENO, DEFAULT_PAGESIZE } from '../config/constant.config'

export default class HospitalController extends Controller {
    constructor(ctx: Context) {
        super(ctx)
    }
    // 获取所有医院列表
    public async hospitalList() {
        const { ctx, service } = this
        const payload = ctx.request.query || {}
        const params = {
            ...payload,
            pageNo: Number(payload.pageNo) || DEFAULT_PAGENO,
            pageSize: Number(payload.pageSize) || DEFAULT_PAGESIZE
        }
        const result = await service.hospital.hospitalList(params)

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
