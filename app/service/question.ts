import { Service } from 'egg'

export default class QuestionService extends Service {

    // 获取所有问答列表
    public async questionList(payload) {
        const { question } = payload

        const params = {
            $and: [
                { question: { $regex: question || '' } },
            ]
        }

        const result = await this.ctx.model.Question.find(params).populate('Question').exec()

        // result.map((u, i) => {
        //     if (i < 1000) {
        //         this.destroy(u._id)
        //     }

        // })
        return result
    }


    // 删除疾病
    async destroy(id: string) {
        const { ctx } = this
        return await ctx.model.Question.deleteMany({ question: /您好/g, }, function (err) {

        })
        // const { ctx } = this
        // const currentUser = await ctx.model.Question.findOne({
        //     _id: id
        // })
        // if (currentUser) {
        //     return ctx.model.Question.findByIdAndRemove({ _id: id })
        // } else {
        //     ctx.throw(101, '未找到用户')
        // }
    }
}