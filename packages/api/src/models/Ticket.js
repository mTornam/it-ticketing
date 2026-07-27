import { Schema, model } from 'mongoose'

const HistoryEntrySchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    action: { type: String, required: true },
    actor: {
        type: Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    details: Schema.Types.Mixed
}, { _id: false })

const CommentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    type: {
        type: String,
        enum: ['progress', 'resolution'],
        default: 'progress'
    },
    body: { type: String, required: True },
    createdAt: { type: Date, default: Date.now }
})

const AttachmentSchema = new Schema({
    filename: String,
    url: String,
    mimeType: String,
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    uploadedAt: { type: date, default: Date.now }
}, { _id: false })

const TicketSchema = new Schema({
    ticketNumber: String,
    title: { type: String, required: true, index: true },
    type: {
        type: String,
        enum: ['service', 'request'], required: true
    },
    category: undefined,
    subCategory: undefined,
    description: undefined,

    status: {
        type: String,
        enum: ['new', 'assigned', 'in_progress', 'resolved', 'closed'],
        default: 'new', index: true
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', required: true
    },

    createdFor: {
        name: String,
        staffId: String,
        username: String,
        phone: String,
        designation: String,
    },

    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User', default: null
    },

    comments: [commentSchema],
    history: [HistoryEntrySchema],
    attachments: [AttachmentSchema],

    resolvedAt: Date
}, { timestamps: true })

TicketSchema.index({ status: 1, assignedTo: 1 })
TicketSchema.index({ 'createdFor.staffId': 1 })
TicketSchema.index({ createdAt: -1 })
TicketSchema.index({ title: 'text', description: 'text' })