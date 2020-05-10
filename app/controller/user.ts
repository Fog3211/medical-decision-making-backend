import { Controller, Context } from 'egg'
import { CREATE_USER } from '../config/rule.config'
import { DEFAULT_PAGENO, DEFAULT_PAGESIZE } from '../config/constant.config'

export default class UserController extends Controller {
    constructor(ctx: Context) {
        super(ctx)
    }
    // 获取所有用户列表
    public async userList() {
        const { ctx, service } = this
        // 组装参数
        const payload = ctx.request.query || {}
        const params = {
            ...payload,
            pageNo: Number(payload.pageNo) || DEFAULT_PAGENO,
            pageSize: Number(payload.pageSize) || DEFAULT_PAGESIZE
        }
        const result = await service.user.userList(params)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, result })
    }

    // 封禁单个用户
    public async destroyUser() {
        const { ctx, service } = this
        const { id } = ctx.params

        await service.user.destroyUser(id)

        ctx.helper.success({ ctx, msg: '封禁/解封成功' })
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
    public async showUserDetail() {
        const { ctx, service } = this
        const { id } = ctx.params

        const result = await service.user.showUserDetail(id)

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
