const express = require('express');
const router = express.Router();
const { getRecords, postBooking, updateBooking} = require('../controllers/records-controller');


/* GET records */
router.get('/', getRecords);

/* POST records */
router.post('/', postBooking);

router.put('/', updateBooking);




module.exports = router;