import { Application } from 'egg'
import { formatTime } from '../utils/index'

export default (app: Application) => {
    const mongoose = app.mongoose

    const DiseaseSchema = new mongoose.Schema({
        name: { type: String, required: true },
        key: { type: String, required: true },
        handler: { type: String, required: true, default: 'system init' },
        symptom: { type: String, required: true },
        partKey: { type: String, required: true },
        partName: { type: String, required: true },
        departmentKey: { type: String, required: true },
        departmentName: { type: String, required: true },
        alias: { type: String, required: true },
        introduction: { type: String, required: true },
        crowd: { type: String, required: true },
        treatment: { type: String, required: true },
        createdAt: { type: String, default: formatTime.nowTime() },
        isHidden: { type: Boolean, required: true }
    })

    return mongoose.model('Disease', DiseaseSchema)
}