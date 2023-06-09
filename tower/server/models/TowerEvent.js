import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const towerEventSchema = new Schema({
    creatorId: {type: ObjectId, required: true, ref: 'Account'},
    name: { type: String, required: true, maxLength: 40 },
    description: { type: String, required: true, maxLength: 1000},
    coverImg: { type: String, required: true, maxLength: 300, minLength: 15},
    location: { type: String, required: true, maxLength: 40},
    capacity: { type: Number, required: true},
    startDate: { type: Date, required: true},
    isCanceled: { type: Boolean, required: true, default: false},
    type: { type: String, required: true, enum: ['concert', 'convention', 'sport', 'digital']},
},
    {timestamps: true, toJSON: {virtuals: true}}
)

towerEventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket',
    count: true
})