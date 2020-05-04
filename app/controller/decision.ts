import { Controller, Context } from 'egg'
import { GET_DECISION_LIST, CREATE_DECISION } from '../config/rule.config'
import { DEFAULT_PAGENO, DEFAULT_PAGESIZE } from '../config/constant.config'

export default class DecisionController extends Controller {
    constructor(ctx: Context) {
        super(ctx)
    }
    // 获取所有用户列表
    public async index() {
        const { ctx, service } = this

        ctx.validate(GET_DECISION_LIST)
        // 组装参数
        const payload = ctx.request.query || {}
        const params = {
            ...payload,
            pageNo: Number(payload.pageNo) || DEFAULT_PAGENO,
            pageSize: Number(payload.pageSize) || DEFAULT_PAGESIZE
        }
        const result = await service.decision.index(params)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, result })
    }

    // 删除单个用户
    public async destroyDecision() {
        const { ctx, service } = this
        const { id } = ctx.params

        await service.decision.destroyDecision(id)

        ctx.helper.success({ ctx, msg: '删除成功' })
    }

    // 修改角色
    public async update() {
        const { ctx, service } = this
        const { id } = ctx.params

        const payload = ctx.request.body || {}
        await service.decision.update(id, payload)

        ctx.helper.success({ ctx })
    }

    // 获取单个角色
    public async show() {
        const { ctx, service } = this
        const { id } = ctx.params

        const result = await service.decision.show(id)

        ctx.helper.success({ ctx, result })
    }

    // 用户登录
    public async login() {
        const { ctx, service } = this
        const payload = ctx.request.body || {}

        const result = await service.decision.login(payload)

        ctx.helper.success({ ctx, result })
    }

    // 用户注册
    public async register() {
        const { ctx, service } = this

        ctx.validate(CREATE_DECISION)

        const payload = ctx.request.body || {}
        const result = await service.decision.register(payload)

        ctx.helper.success({ ctx, result })
    }
}
