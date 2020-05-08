import { Service } from 'egg'

export default class QuestionService extends Service {

    // 获取所有问答列表
    public async questionList() {

        const result = await this.ctx.model.Question.find({}).populate('Question').exec()

        return { data: result }
    }
}