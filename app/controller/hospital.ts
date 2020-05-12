import { Controller, Context } from 'egg'
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

        const payload = ctx.request.body || {}
        const result = await service.hospital.create(payload)

        ctx.helper.success({ ctx, result })
    }

    // 删除单个医院
    async destroyHospital() {
        const { ctx, service } = this
        const { id } = ctx.params

        await service.hospital.destroyHospital(id)

        ctx.helper.success({ ctx, msg: '删除成功' })
    }

    // 修改医院
    async updateHospital() {
        const { ctx, service } = this
        const { id } = ctx.params

        const payload = ctx.request.body || {}
        await service.hospital.updateHospital(id, payload)

        ctx.helper.success({ ctx })
    }

    // 获取单个医院详细信息
    async hospitalDetail() {
        const { ctx, service } = this
        const { id } = ctx.params

        const result = await service.hospital.hospitalDetail(id)

        ctx.helper.success({ ctx, result })
    }

}
