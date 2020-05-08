import { Application } from 'egg'
import { formatTime } from '../utils/index'

export default (app: Application) => {
    const mongoose = app.mongoose

    const PartSchema = new mongoose.Schema({
        name: { type: String, required: true },
        key: { type: String, required: true },
        child: { type: Array, required: true },
        createdAt: { type: String, default: formatTime.nowTime() },
    })

    return mongoose.model('Part', PartSchema)
}