const { Schema, model } = require('mongoose');

// Schema to create User model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            date: {
                type: Date,
                default: Date.now
            },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],

        toJSON: {
            virtuals: true,
        },
        id: false,
    },
);

// Create a virtual property `reactionCount` that gets the length of the Thought's reactions.
postSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
});

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = User;