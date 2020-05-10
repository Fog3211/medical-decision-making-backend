import { Service } from 'egg'

export default class DepartmentService extends Service {

    // 获取所有权限
    public async departmentList() {
        const { ctx } = this

        const result = await ctx.model.Department.find({}).populate('department').exec()

        return result
    }
}