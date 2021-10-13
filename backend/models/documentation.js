import mongoose from 'mongoose';

const docSchema = mongoose.Schema({
    division: { type: String, required: true },
    module: { type: String, required: true },
    host: { type: String, required: true },
    api: { type: String, required: true },
    method: { type: Number, required: true },
    headers: { type: String, default: '-' },
    params: { type: String, default: '-' },
    token: { type: String, default: '-' },
    body: { type: String, default: '-' },
    ver: { type: String, required: true },
    route: { type: String, required: true }

}, { timestamps: true } );

export default mongoose.model('doc',docSchema);

