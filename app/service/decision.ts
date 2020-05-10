import { Service } from 'egg'
import { DecisionType } from '../config/type.config'

export default class DecisionService extends Service {

    // 获取所有用户列表(分页+模糊搜索)
    public async decisionList(payload) {
        const { ctx } = this
        const { pageNo, pageSize, name, handler, question, status } = payload
        const skip = (pageNo - 1) * pageSize
        const params = {
            $and: [
                { name: { $regex: name || '' } },
                { handler: { $regex: handler || '' } },
                { question: { $regex: question || '' } },
            ],
            status: status || null
        }
        Object.keys(params).forEach((key) => {
            if (params[key] === null || params[key] === undefined) {
                delete params[key]
            }
        })
        const result = await ctx.model.Decision.find(params).populate('Decision').skip(skip).limit(pageSize).sort({ createdAt: -1 }).exec()
        const count = await ctx.model.Decision.find(params).countDocuments()

        return { count, data: result }
    }

    // 删除决策
    async destroyDecision(_id: string) {
        const { ctx } = this

        const decision = await ctx.model.Decision.findOne({ _id })
        if (!decision) {
            ctx.throw(101, '未找到决策信息')
        }
        return ctx.model.Decision.findByIdAndUpdate(_id, { status: 3 })
    }

    // 更新决策信息
    public async updateDecision(_id: string, payload: DecisionType) {
        const { ctx } = this

        const decision = await ctx.model.Decision.findOne({ _id })
        if (!decision) {
            ctx.throw(101, '未找到决策信息')
        }
        return ctx.model.Decision.findByIdAndUpdate(_id, payload)
    }

    // 获取单条会话信息
    async decisionDetail(id: string) {
        const { ctx } = this

        const currentDecision = await ctx.model.Decision.findOne({
            _id: id
        })
        if (currentDecision) {
            return currentDecision
        } else {
            ctx.throw(101, '未找到用户')
        }
    }
}