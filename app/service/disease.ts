import { Service } from 'egg'
import { diseaseType } from '../config/type.config'
import { formatTime } from '../utils'

export default class UserService extends Service {

    // 获取所有疾病列表(分页+模糊搜索)
    public async index(payload: diseaseType) {
        const { pageNo, pageSize, name } = payload
        const skip = ((Number(pageNo)) - 1) * Number(pageSize || 20)

        const res = await this.ctx.model.User.find({
            //多条件取交集
            $and: [
                { name: { $regex: name || '' } }
            ]
        }).populate('user').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        const count = res.length
        const data = res.map((e: any, index: number) => {
            const jsonObject = Object.assign({}, e._doc)
            jsonObject.key = index
            jsonObject.createdAt = formatTime(e.createdAt)
            return jsonObject
        })

        return { count, data }
    }

    // 添加单个用户
    public async create(payload: diseaseType) {
        const { ctx } = this
        return ctx.model.User.create(payload)
    }

    // 删除用户 
    async destroy(id: string) {
        const { ctx } = this
        try {
            const user = await ctx.service.user.find(id)
            if (!user) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.User.findByIdAndRemove(id)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 更新用户信息
    public async update(id: string, payload: diseaseType) {
        const { ctx } = this
        try {
            const user = await ctx.service.user.find(id)
            if (!user) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.User.findByIdAndUpdate(id, payload)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 获取单个用户信息
    async show(id: string) {
        const { ctx } = this
        try {
            const user = await ctx.service.user.find(id)
            if (!user) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.User.findById(id)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 更加id查找数据
    async find(id: string) {
        return this.ctx.model.User.findById(id)
    }

}