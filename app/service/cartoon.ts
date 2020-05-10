import { Service } from 'egg'

export default class CartoonService extends Service {

    // 获取所有漫画数据
    public async cartoonList(payload) {
        const { ctx } = this
        const { pageNo, pageSize } = payload

        const skip = (pageNo - 1) * pageSize
        const params = {}
        const result = await ctx.model.Cartoon.find(params).populate('Cartoon').skip(skip).limit(pageSize).exec()
        const count = await ctx.model.Cartoon.find(params).countDocuments()

        return { count, data: result }
    }
}