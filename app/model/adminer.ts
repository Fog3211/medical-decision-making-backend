import { Application } from 'egg'
import { formatTime } from '../utils/index'

export default (app: Application) => {
    const mongoose = app.mongoose

    const AdminerSchema = new mongoose.Schema({
        name: { type: String, required: true },
        password: { type: String, required: true },
        telphone: { type: Number, required: true },
        createdAt: { type: String, default: formatTime.nowTime() },
        auth: { type: String, required: true },
        email: { type: String, required: true }
    })

    return mongoose.model('Adminer', AdminerSchema)
}