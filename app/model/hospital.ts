import { Application } from 'egg'
import * as dayjs from 'dayjs'

export default (app: Application) => {
    const mongoose = app.mongoose

    const HospitalSchema = new mongoose.Schema({
        hospitalName: { type: String, required: true },
        hospitalCode: { type: String, required: true },
        handler: { type: String, required: true },
        address: { type: String, required: true },
        createdAt: { type: String, default: dayjs().format('YYYY-MM-DD HH:mm:ss') },
    })

    return mongoose.model('Hospital', HospitalSchema)
}