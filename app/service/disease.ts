import { Service } from 'egg'
import { DiseaseType } from '../config/type.config'

export default class DiseaseService extends Service {

    // 获取所有疾病列表(分页+模糊搜索)
    public async diseaseList(payload) {
        const { ctx } = this
        const { pageNo, pageSize, name } = payload
        const skip = (pageNo - 1) * pageSize
        const params = {
            $and: [
                { name: { $regex: name || '' } }
            ],
        }
        const result = await ctx.model.Disease.find(params).populate('Disease').skip(skip).limit(pageSize).sort({ createdAt: -1 }).exec()
        const count = await ctx.model.Disease.find(params).countDocuments()

        // console.log(result, data)
        return { count, data: result }
    }

    // 添加单个疾病
    public async create(payload: DiseaseType) {
        const { ctx } = this
        return ctx.model.Disease.create(payload)
    }

    // 删除疾病
    async destroy(id: string) {
        const { ctx } = this
        try {
            const Disease = await ctx.service.Disease.find(id)
            if (!Disease) {
                ctx.throw(101, '未找到相关疾病')
            }
            return ctx.model.Disease.findByIdAndRemove(id)
        } catch{
            ctx.throw(101, '未找到相关疾病')
        }
    }

    // 更新疾病信息
    public async update(id: string, payload: DiseaseType) {
        const { ctx } = this
        try {
            const Disease = await ctx.service.Disease.find(id)
            if (!Disease) {
                ctx.throw(101, '未找到相关疾病')
            }
            return ctx.model.Disease.findByIdAndUpdate(id, payload)
        } catch{
            ctx.throw(101, '未找到相关疾病')
        }
    }

    // 获取单个疾病信息
    async show(id: string) {
        const { ctx } = this
        try {
            const Disease = await ctx.model.Disease.findById(id)
            if (!Disease) {
                ctx.throw(101, '未找到相关疾病')
            }
            return ctx.model.Disease.findById(id)
        } catch{
            ctx.throw(101, '未找到相关疾病')
        }
    }

    // 获取单个疾病信息
    async bodyPartList() {
        const { ctx } = this

        const result = await ctx.model.BodyPart.find({}).populate('BodyPart').exec()
        console.log(result)
        const data = result.map(u => {
            return {
                id: u._id,
                name: u.name,
                key: u.key,
                child: u.child
            }
        })

        return { data }
    }

    // 获取单个疾病信息
    async departmentList() {
        const { ctx } = this

        const result = await ctx.model.Department.find({}).populate('Department').exec()
        console.log(await ctx.model.Department.find().exec())
        const data = result.map(u => {
            return {
                id: u._id,
                name: u.name,
                key: u.key,
                child: u.child
            }
        })

        return { data }
    }
}