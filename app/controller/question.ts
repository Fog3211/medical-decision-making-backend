import { Controller, Context } from 'egg'

export default class QuestionController extends Controller {
    constructor(ctx: Context) {
        super(ctx)
    }
    // 获取问答列表
    public async questionList() {
        const { ctx, service } = this

        const payload = ctx.request.query || {}

        const result = await service.question.questionList(payload)

        ctx.helper.success({ ctx, result })
    }

    // 删除单个用户
    async destroy() {
        const { ctx, service } = this
        const { id } = ctx.params

        await service.question.destroy(id)

        ctx.helper.success({ ctx, msg: '删除成功' })
    }
}
