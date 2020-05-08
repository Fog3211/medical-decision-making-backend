import { Application } from 'egg'
import { formatTime } from '../utils/index'

export default (app: Application) => {
    const mongoose = app.mongoose

    const HospitalSchema = new mongoose.Schema({
        name: { type: String, required: true },
        phone: { type: String, required: true },
        handler: { type: String, required: true },
        province: { type: String, required: true },
        city: { type: String, required: true },
        address: { type: String, required: true },
        introduction: { type: String, required: true },
        createdAt: { type: String, default: formatTime.nowTime() },
    })

    return mongoose.model('Hospital', HospitalSchema)
}