import { Application } from 'egg'
import * as dayjs from 'dayjs'

export default (app: Application) => {
    const mongoose = app.mongoose

    const AdminerSchema = new mongoose.Schema({
        name: { type: String, required: true },
        password: { type: String, required: true },
        telphone: { type: Number, required: true },
        createdAt: { type: String, default: dayjs().format('YYYY-MM-DD HH:mm:ss') },
        auth: { type: Number, required: true },
        email: { type: String, required: true }
    })

    return mongoose.model('Adminer', AdminerSchema)
}