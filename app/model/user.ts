import { Application } from 'egg'
import { formatTime } from '../utils/index'

export default (app: Application) => {
    const mongoose = app.mongoose

    const UserSchema = new mongoose.Schema({
        name: { type: String, required: true },
        password: { type: String, required: true },
        nickName: { type: String, required: true },
        birthday: { type: String, required: true },
        age: { type: Number, required: true },
        sex: { type: Boolean, required: true },
        telphone: { type: Number, required: true },
        isForbidden: { type: Boolean, required: true },
        createdAt: { type: String, default: formatTime.nowTime() },
    })

    return mongoose.model('User', UserSchema)
}