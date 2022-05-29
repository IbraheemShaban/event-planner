const express = require('express');
const router = express.Router();
const {
  eventsGet,
  eventUpdate,
  eventDelete,
  eventCreate,
  eventsGetByFull,
  eventsGetByName,
  eventGetById,
  eventGetByDate,
} = require('./events.controllers');

router.get('/', eventsGet);
router.get('/full', eventsGetByFull);
router.get('/name/:eventName', eventsGetByName);
router.get('/id/:eventId', eventGetById);
router.get('/date/:eventDate', eventGetByDate);

router.post('/', eventCreate);

router.delete('/:eventId', eventDelete);

router.put('/:eventId', eventUpdate);

module.exports = router;
