import { Service } from 'egg'

export default class AuthService extends Service {

    // 获取所有权限
    public async authList() {
        const params = {
            isHidden: false
        }
        const result = await this.ctx.model.Auth.find(params).populate('Auth').exec()

        const data = result.map(u => {
            return {
                id: u.id,
                name: u.name,
            }
        })

        return { data }
    }
}