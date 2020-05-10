import { Service } from 'egg'
import { DiseaseType } from '../config/type.config'

export default class DiseaseService extends Service {

    // 获取所有疾病列表(分页+模糊搜索)
    public async diseaseList(payload) {
        const { ctx } = this
        const { pageNo, pageSize, name, partKey, departmentKey, alias } = payload

        const skip = (pageNo - 1) * pageSize
        const params = {
            $and: [
                { name: { $regex: name || '' } },
                { partKey: { $regex: partKey || '' } },
                { departmentKey: { $regex: departmentKey || '' } },
                { alias: { $regex: alias || '' } },
            ],
        }
        const result = await ctx.model.Disease.find(params).populate('Disease').skip(skip).limit(pageSize).exec()
        const count = await ctx.model.Disease.find(params).countDocuments()

        return { count, data: result }
    }

    // 添加单个疾病
    public async create(payload: DiseaseType) {
        const { ctx } = this
        return ctx.model.Disease.create(payload)
    }

    // 删除疾病
    async destroyDisease(_id: string) {
        const { ctx } = this
        const currentDisease = await ctx.model.Disease.findOne({
            _id
        })
        if (currentDisease) {
            return ctx.model.Disease.findByIdAndRemove({ _id })
        } else {
            ctx.throw(101, '未找到相关疾病')
        }
    }

    // 更新疾病信息
    public async updateDisease(_id: string, payload: DiseaseType) {
        const { ctx } = this

        const Disease = await ctx.model.Disease.findOne({
            _id
        })
        if (!Disease) {
            ctx.throw(101, '未找到相关疾病')
        }
        return ctx.model.Disease.findByIdAndUpdate(_id, payload)
    }

    // 获取单个疾病信息
    async diseaseDetail(id: string) {
        const { ctx } = this

        const Disease = await ctx.model.Disease.findById(id)
        if (!Disease) {
            ctx.throw(101, '未找到相关疾病')
        }
        return ctx.model.Disease.findById(id)
    }
}