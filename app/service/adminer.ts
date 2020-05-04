import { Service } from 'egg'
import { AdminerType } from '../config/type.config'

export default class AdminerService extends Service {

    // 获取所有疾病列表(分页+模糊搜索)
    public async index(payload) {
        const { pageNo, pageSize, name } = payload
        const skip = ((Number(pageNo)) - 1) * Number(pageSize || 20)

        const result = await this.ctx.model.Adminer.find({
            //多条件取交集
            $and: [
                { name: { $regex: name || '' } }
            ]
        }).populate('Adminer').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        const count = result.length
        const data = result.map((e: any, index: number) => {
            const jsonObject = Object.assign({}, e._doc)
            jsonObject.key = index
            return jsonObject
        })

        return { count, data }
    }

    // 添加单个用户
    public async create(payload: AdminerType) {
        const { ctx } = this
        const hasUser = await ctx.model.Adminer.findOne({ $or: [{ email: payload.email }, { telphone: payload.telphone }] })
        if (hasUser) {
            ctx.throw(103, '用户已存在')
        } else {
            return ctx.model.Adminer.create(payload)
        }
    }

    // 删除用户 
    async destroy(id: string) {
        const { ctx } = this
        try {
            const Adminer = await ctx.service.Adminer.find(id)
            if (!Adminer) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.Adminer.findByIdAndRemove(id)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 更新用户信息
    public async update(id: string, payload: AdminerType) {
        const { ctx } = this
        try {
            const Adminer = await ctx.service.Adminer.find(id)
            if (!Adminer) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.Adminer.findByIdAndUpdate(id, payload)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 获取单个用户信息
    public async show(id: string) {
        const { ctx } = this
        try {
            const Adminer = await ctx.service.Adminer.find(id)
            if (!Adminer) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.Adminer.findById(id)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 更加id查找数据
    public async find(id: string) {
        return this.ctx.model.Adminer.findById(id)
    }

    // 用户登录
    public async login(payload: AdminerType) {
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
        const currentUser = await ctx.model.Adminer.findOne(params)

        if (currentUser) {
            return {
                id: currentUser.id,
                name: currentUser.name,
                auth: currentUser.auth,
                // token
            }
        } else {
            ctx.throw(102, '登录失败,密码或账号错误!')
        }
    }
}