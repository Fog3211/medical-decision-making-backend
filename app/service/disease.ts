import { Service } from 'egg'
import { DiseaseType } from '../config/type.config'

export default class DiseaseService extends Service {

    // 获取所有疾病列表(分页+模糊搜索)
    public async index(payload: DiseaseType) {
        const { pageNo, pageSize, name } = payload
        const skip = ((Number(pageNo)) - 1) * Number(pageSize || 20)

        const result = await this.ctx.model.Disease.find({
            //多条件取交集
            $and: [
                { name: { $regex: name || '' } }
            ]
        }).populate('Disease').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        const count = result.length
        const data = result.map((e: any, index: number) => {
            const jsonObject = Object.assign({}, e._doc)
            jsonObject.key = index
            return jsonObject
        })

        return { count, data }
    }

    // 添加单个用户
    public async create(payload: DiseaseType) {
        const { ctx } = this
        return ctx.model.Disease.create(payload)
    }

    // 删除用户 
    async destroy(id: string) {
        const { ctx } = this
        try {
            const Disease = await ctx.service.Disease.find(id)
            if (!Disease) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.Disease.findByIdAndRemove(id)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 更新用户信息
    public async update(id: string, payload: DiseaseType) {
        const { ctx } = this
        try {
            const Disease = await ctx.service.Disease.find(id)
            if (!Disease) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.Disease.findByIdAndUpdate(id, payload)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 获取单个用户信息
    async show(id: string) {
        const { ctx } = this
        try {
            const Disease = await ctx.service.Disease.find(id)
            if (!Disease) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.Disease.findById(id)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 更加id查找数据
    async find(id: string) {
        return this.ctx.model.Disease.findById(id)
    }

}