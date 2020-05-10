import { Application } from 'egg'
import { formatTime } from '../utils/index'

export default (app: Application) => {
    const mongoose = app.mongoose

    const AuthSchema = new mongoose.Schema({
        name: { type: String, required: true },
        createdAt: { type: String, default: formatTime.nowTime() },
        isHidden: { type: Boolean, required: true, default: false },
    })

    return mongoose.model('Auth', AuthSchema)
}