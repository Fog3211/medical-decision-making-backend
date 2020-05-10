import { Service } from 'egg'

export default class PartService extends Service {

    // 获取所有权限
    public async partList() {
        const { ctx } = this

        const result = await ctx.model.Part.find({}).populate('part').exec()

        return result
    }
}