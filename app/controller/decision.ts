import { Controller, Context } from 'egg'
import { DEFAULT_PAGENO, DEFAULT_PAGESIZE } from '../config/constant.config'

export default class DecisionController extends Controller {
    constructor(ctx: Context) {
        super(ctx)
    }
    // 获取所有会话列表
    public async decisionList() {
        const { ctx, service } = this

        // 组装参数
        const payload = ctx.request.query || {}
        const params = {
            ...payload,
            pageNo: Number(payload.pageNo) || DEFAULT_PAGENO,
            pageSize: Number(payload.pageSize) || DEFAULT_PAGESIZE
        }

        const result = await service.decision.decisionList(params)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, result })
    }

    // 删除单个用户
    public async destroyDecision() {
        const { ctx, service } = this
        const { id } = ctx.params

        await service.decision.destroyDecision(id)

        ctx.helper.success({ ctx, msg: '关闭成功' })
    }

    // 修改角色
    public async updateDecision() {
        const { ctx, service } = this
        const { id } = ctx.params

        const payload = ctx.request.body || {}
        await service.decision.updateDecision(id, payload)

        ctx.helper.success({ ctx })
    }

    // 获取单个角色
    public async decisionDetail() {
        const { ctx, service } = this
        const { id } = ctx.params

        const result = await service.decision.decisionDetail(id)

        ctx.helper.success({ ctx, result })
    }

}
