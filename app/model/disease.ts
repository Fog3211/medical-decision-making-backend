import { Application } from 'egg'

export default (app: Application) => {
    const mongoose = app.mongoose

    const DiseaseSchema = new mongoose.Schema({
        name: { type: String, required: true },
    })

    return mongoose.model('Disease', DiseaseSchema)
}