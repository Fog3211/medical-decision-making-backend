import { Application } from 'egg'
import * as dayjs from 'dayjs'

export default (app: Application) => {
    const mongoose = app.mongoose

    const AuthSchema = new mongoose.Schema({
        name: { type: String, required: true },
        createdAt: { type: String, default: dayjs().format('YYYY-MM-DD HH:mm:ss') },
        isHidden: { type: Boolean, required: true },
    })

    return mongoose.model('Auth', AuthSchema)
}