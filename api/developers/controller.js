const ErrorResponse = require('../../util/errorResponse');
const asyncHandler = require('../../middleware/async');
const Developer = require('./model');
const axios = require("axios");

const getRequiredRepoData = (data) => {
    const response = [];

    data.map(item => {
        const temp =  {
            name: item?.name,
            html_url: item?.html_url,
            description: item?.description,
            updated_at: item?.updated_at,
        }
        response.push(temp);
    })
    return response;
}

exports.addDeveloper = asyncHandler(async (req, res, next) => {
    let response; 
    let repos;
    try{ 
        response = await axios.get(`https://api.github.com/users/${req.body.id}`);
    }catch{
        return next(new ErrorResponse('GitHub username is invalid', 400));
    }

    if(response?.data?.repos_url){
        repos = await axios.get(response?.data?.repos_url);
    }

    const reposData = getRequiredRepoData(repos.data);
    const data = {
        id: req.body.id,
        avatar_url: response.data.avatar_url,
        name: response.data.name,
        company: response.data.company,
        blog : response.data.blog,
        location: response.data.location,
        email: response.data.email,
        bio: response.data.bio,
        github_id: req.body.id,
        linkedin_id: req.body.linkedin_id,
        codechef_id: req.body.codechef_id,
        hackerrank_id: req.body.hackerrank_id,
        twitter_id: req.body.twitter_id,
        medium_id: req.body.medium_id,
        repos: reposData
    }
    const developer = await Developer.create(data);
    return res.status(201).json({
        success: true,
        message: "User Created",
        id: developer.id
    })
});

exports.getAllDevelopers = asyncHandler(async (req, res, next) => {
    const developers = await Developer.find().select({avatar_url: 1 , _id: 0, id: 1});
    return res.status(200).json({
        success: true,
        data: developers
    });
});

exports.getDeveloper = asyncHandler(async (req, res, next) => {
    const developer = await Developer.findOne({ id: req.params.id});
    return res.status(200).json({
        success: true,
        data: developer,
    });
});

exports.deleteDeveloper = asyncHandler(async (req, res, next) => {
    const developer = await Developer.findOneAndRemove({ id: req.params.id});
    return res.status(200).json({
        success: true,
        message: 'Deleted'
    });
});