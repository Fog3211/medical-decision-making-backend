import { Application } from 'egg'
import * as dayjs from 'dayjs'

export default (app: Application) => {
    const mongoose = app.mongoose

    const UserSchema = new mongoose.Schema({
        name: { type: String, required: true },
        age: { type: Number, required: true },
        adress: { type: String, required: true },
        createdAt: { type: String, default: dayjs().format('YYYY-MM-DD HH:mm:ss') }
    })

    return mongoose.model('User', UserSchema)
}