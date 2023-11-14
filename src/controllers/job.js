const { job: jobModel, user: userModel } = require('../../models')
const { jobSchema } = require('../validations/job')
const { imageValidation } = require('../validations/image')
const { uploadToCloudinary } = require('../utils/upload')

exports.getAllJob = async (req, res, next) => {
    try {
        const { page = 1, perPage = 4 } = req.query

        const jobs = await jobModel.findAll({
            include: {
                model: userModel,
                as: 'user',
                attributes: ['username'],
            },
            offset: (parseInt(page) - 1) * parseInt(perPage),
            limit: parseInt(perPage),
            order: [['id', 'ASC']],

        })
        res.status(200).send({
            data: jobs
        })
    } catch (error) {
        next(error)
    }
}

exports.getJobById = async (req, res, next) => {
    try {
        const job = await jobModel.findByPk(req.params.id,{
            include: {
                model: userModel,
                as: 'user',
                attributes: ['username', 'name', 'phone_number'],
            },
        })
        res.status(200).send({
            data: job
        })
    } catch (error) {
        next(error)
    }
}

exports.createJob = async (req, res, next) => {
    try {
        const { error } = jobSchema.validate(req.body)
        if (error) throw error
        imageValidation(req.files, 'image')

        const image = await uploadToCloudinary(req.files.image)
        const job = await jobModel.create({
            ...req.body,
            image,
            user_id: req.userId,
        })

        res.status(201).send({
            message: 'Create job success'
        })
    } catch (error) {
        next(error)
    }
}


exports.updateJob = async (req, res, next) => {
    try {
        const { error } = jobSchema.validate(req.body)
        if (error) throw error
        if (req.files) {
            imageValidation(req.files, 'image')
            req.body.image = await uploadToCloudinary(req.files.image)
        }
        if (req.body.image === '') {
            delete req.body.image
        }

        const job = await jobModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        res.status(200).send({
            message: 'Update job success'
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteJob = async (req, res, next) => {
    try {
        const job = await jobModel.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).send({
            message: 'Delete job success'
        })
    } catch (error) {
        next(error)
    }
}

exports.closeJob = async (req, res, next) => {
    try {
        const job = await jobModel.update({ open: false }, {
            where: {
                id: req.params.id
            }
        })

        res.status(200).send({
            message: 'Close job success'
        })
    } catch (error) {
        next(error)
    }
}