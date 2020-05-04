import { Controller, Context } from 'egg'

export default class AuthController extends Controller {
    constructor(ctx: Context) {
        super(ctx)
    }
    // 获取权限映射表
    public async authList() {
        const { ctx, service } = this

        const result = await service.auth.authList()

        ctx.helper.success({ ctx, result })
    }
}
