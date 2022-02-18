const { Thought, Post } = require('../models');

module.exports = {
    // Find all thoughts
    getThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .populate('posts')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Find single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .populate('posts')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return Post.findOneAndUpdate(
                    { _id: req.body.postId },
                    { $addToSet: { thought: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'Thought created, but found no post with that ID' })
                    : res.json('Created the thought 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};
