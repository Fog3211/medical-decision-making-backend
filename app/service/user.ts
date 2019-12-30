import { Service } from 'egg'
import { userType } from '../config/interface.config'

export default class UserService extends Service {

    // 获取所有用户列表(分页+模糊搜索)
    public async index(payload: userType) {
        const { ctx } = this
        const { pageNo, pageSize, name, adress } = payload
        const skip = ((Number(pageNo)) - 1) * Number(pageSize || 20)

        const res = await this.ctx.model.User.find({
            //多条件交集，数组
            $and: [
                { adress: { $regex: adress || '' } },
                { name: { $regex: name || '' } }
            ]
        }).populate('user').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        const count = res.length
        const list = res.map((e: any, index: number) => {
            const jsonObject = Object.assign({}, e._doc)
            jsonObject.key = index
            jsonObject.createdAt = ctx.helper.formatTime(e.createdAt)
            return jsonObject
        })

        return { count, list }
    }

    // 添加单个用户
    public async create(payload: userType) {
        const { ctx } = this
        return ctx.model.User.create(payload)
    }

    // 删除用户 
    async destroy(_id: string) {
        const { ctx } = this
        try {
            const user = await ctx.service.user.find(_id)
            if (!user) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.User.findByIdAndRemove(_id)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 更新用户信息
    public async update(_id: string, payload: userType) {
        const { ctx } = this
        try {
            const user = await ctx.service.user.find(_id)
            if (!user) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.User.findByIdAndUpdate(_id, payload)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 获取单个用户信息
    async show(_id: string) {
        const { ctx } = this
        try {
            const user = await ctx.service.user.find(_id)
            if (!user) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.User.findById(_id)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 更加id查找数据
    async find(id: string) {
        return this.ctx.model.User.findById(id)
    }

}