const express =require('express')
const router = express.Router()
const jobController = require('../controllers/job')
const {mustRole } = require('../middlewares/auth')

router.get('/', jobController.getAllJob)
router.get('/:id', jobController.getJobById)
router.post('/', mustRole('user'), jobController.createJob)
router.put('/:id', mustRole('user'), jobController.updateJob)
router.delete('/:id', mustRole('user'), jobController.deleteJob)
router.patch('/:id/close', mustRole('user'), jobController.closeJob)


module.exports = router