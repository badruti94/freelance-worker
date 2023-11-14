const { job: jobModel, user: userModel } = require('../../models')

exports.getJobByUsername = async (req, res, next) => {
    try {
        const { page = 1, perPage = 4 } = req.query

        const jobs = await jobModel.findAll({
            include: {
                model: userModel,
                as: 'user',
                attributes: ['username'],
                where: {
                    username: req.params.username
                }
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