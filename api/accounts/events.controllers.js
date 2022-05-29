const Event = require('../../models/Event');

exports.eventsGet = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventsGetByFull = async (req, res) => {
  try {
    let events = await Event.find();
    events = events.filter((event) => event.numOfSeats === event.bookedSeats);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.eventsGetByName = async (req, res) => {
  const { eventName } = req.params;
  try {
    let events = await Event.find();
    events = events.filter(
      (event) => event.name.toLowerCase() === eventName.toLowerCase()
    );
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.eventGetById = async (req, res) => {
  const { eventId } = req.params;
  try {
    const events = await Event.find();
    const foundEvent = events.find((event) => event._id === eventId);
    res.json(foundEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventGetByDate = async (req, res) => {
  const { eventDate } = req.params;
  try {
    const events = await Event.find();
    const foundEvents = events.filter(
      (event) => event.startDate.toString() >= `${eventDate}T00:00:00.000Z`
    );
    res.json(foundEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.eventCreate = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventDelete = async (req, res) => {
  const { eventId } = req.params;
  try {
    const foundEvent = await Event.findById(eventId);

    if (foundEvent) {
      await foundEvent.remove();
      res.status(204).end();
    } else {
      console.log('foundEvent', foundEvent);
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventUpdate = async (req, res) => {
  const { eventId } = req.params;
  const body = req.body;
  const state = { new: true };
  try {
    const foundEvent = await Event.findById(eventId);
    if (foundEvent) {
      await Event.findByIdAndUpdate(eventId, {
        _id: eventId,
        organizer: body.organizer,
        name: body.name,
        email: body.email,
        image: body.image,
        numOfSeats: body.numOfSeats,
        bookedSeats: body.bookedSeats,
        startDate: body.startDate,
        endDate: body.endDate,
        state,
      });
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.getAccountByMoreFunds = async (req, res) => {
//   const { funds } = req.params;
//   const accounts = await Account.find();
//   const foundAccounts = accounts.filter((account) => account.funds > +funds);
//   try {
//     if (foundAccounts.length !== 0)   {
//       res.json(foundAccounts);
//     } else {
//       res
//         .status(404)
//         .json({ message: 'Accounts with higher funds are not available' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
