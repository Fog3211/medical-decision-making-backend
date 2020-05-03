import { Application } from 'egg'

export default (app: Application) => {
    const mongoose = app.mongoose

    const HospitalSchema = new mongoose.Schema({
        name: { type: String, required: true },
    })

    return mongoose.model('Hospital', HospitalSchema)
}