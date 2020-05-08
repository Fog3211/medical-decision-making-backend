import { Service } from 'egg'
import { DecisionType } from '../config/type.config'

export default class DecisionService extends Service {

    // 获取所有用户列表(分页+模糊搜索)
    public async decisionList(payload) {
        const { ctx } = this
        const { pageNo, pageSize, name } = payload
        const skip = (pageNo - 1) * pageSize
        const params = {
            $and: [
                { name: { $regex: name || '' } }
            ]
        }
        const result = await ctx.model.Decision.find(params).populate('Decision').skip(skip).limit(pageSize).sort({ createdAt: -1 }).exec()
        const count = await ctx.model.Decision.find(params).countDocuments()

        const data = result.map(u => {
            return {
                id: u._id,
                name: u.name,
                nickName: u.nickName,
                sex: u.sex,
            }
        })

        return { count, data }
    }

    // 删除用户 
    async destroyDecision(id: string) {
        const { ctx } = this
        try {
            const decision = await ctx.service.decision.find(id)
            if (!decision) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.Decision.findByIdAndRemove(id)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 更新用户信息
    public async update(id: string, payload: DecisionType) {
        const { ctx } = this
        try {
            const decision = await ctx.service.decision.find(id)
            if (!decision) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.Decision.findByIdAndUpdate(id, payload)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 获取单个用户信息
    async show(id: string) {
        const { ctx } = this
        try {
            const decision = await ctx.service.decision.find(id)
            if (!decision) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.Decision.findById(id)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 更加id查找数据
    async find(id: string) {
        return this.ctx.model.Decision.findById(id)
    }

    // 用户注册
    public async register(payload: DecisionType) {
        const { ctx } = this
        const params = {
            ...payload
        }
        return ctx.model.Decision.create(params)
    }

    // 用户登录
    public async login(payload) {
        const { ctx } = this
        const params = {
            email: payload.email,
            telphone: payload.telphone,
            password: payload.password
        }
        Object.keys(params).forEach((key) => {
            if (params[key] === null || params[key] === undefined) {
                delete params[key]
            }
        })
        const currentDecision = await ctx.model.Decision.findOne(params)

        if (currentDecision) {
            return {
                id: currentDecision.id,
                name: currentDecision.name,
                auth: currentDecision.auth,
                // token
            }
        } else {
            ctx.throw(101, '登录失败,密码或账号错误!')
        }
    }
}