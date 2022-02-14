const mongoose = require('mongoose');
const developerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Please provide your GitHub Username'],
        unique: true,
    },
    avatar_url: {
        type: String,
        unique: false,
    },
    name: {
        type: String,
        unique: false,
    },
    company: {
        type: String,
        unique: false,
    },
    blog: {
        type: String,
        unique: false,
    },
    location: {
        type: String,
        unique: false,
    },
    email: {
        type: String,
        unique: false,
    },
    bio: {
        type: String,
        unique: false,
    },
    github_id: {
        type: String,
        unique: true,
    },
    linkedin_id: {
        type: String,
        required: false
    },
    codechef_id: {
        type: String,
        required: false
    },
    hackerrank_id: {
        type: String,
        required: false
    },
    twitter_id: {
        type: String,
        required: false
    },
    medium_id: {
        type: String,
        required: false
    },
    repos: {
        type: [{
            name: {
                type: String
            },
            html_url: {
                type: String
            },
            description: {
                type: String
            },
            updated_at: {
                type: String
            }
        }]
    },
});

module.exports = mongoose.model('Developer', developerSchema);
