import { Controller, Context } from 'egg'

export default class QuestionController extends Controller {
    constructor(ctx: Context) {
        super(ctx)
    }
    // 获取问答列表
    public async questionList() {
        const { ctx, service } = this

        const result = await service.question.questionList()

        ctx.helper.success({ ctx, result })
    }
}
