import { Application } from 'egg'
import { formatTime } from '../utils/index'

export default (app: Application) => {
    const mongoose = app.mongoose

    const CartoonSchema = new mongoose.Schema({
        title: { type: String, required: true },
        link: { type: String, required: true },
        imgSrc: { type: String, required: true },
        pushNumber: { type: Number, required: true },
        createdAt: { type: String, default: formatTime.nowTime() },
    })

    return mongoose.model('Cartoon', CartoonSchema)
}