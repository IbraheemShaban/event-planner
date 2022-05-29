const { model, Schema } = require('mongoose');

// const AccountSchema = new Schema({
//   id: String,
//   username: {
//     type: String,
//     required: true,
//   },
//   funds: {
//     type: Number,
//     default: 0,
//   },
// });

// module.exports = model('Account', AccountSchema);

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validateName = (name) => {
  return !name.toLowerCase().includes('event');
};
// const validateBookedSeats = (bookedSeats) => {
//   return bookedSeats > this.numOfSeats;
// };
const validateStartDate = (startDate) => {
  let tomorrow = new Date();

  return startDate >= tomorrow;
};

const EventSchema = new Schema({
  organizer: {
    type: String,
    max: 20,
  },
  name: {
    type: String,
    max: 20,
    validate: {
      validator: validateName,
      message: () => 'name should not include the word (event)',
    },
  },
  email: {
    type: String,
    validate: {
      validator: validateEmail,
      message: () => 'email address must be valid',
    },
  },
  image: {
    type: String,
    required: true,
  },
  numOfSeats: {
    type: Number,
    min: 5,
  },
  bookedSeats: {
    type: Number,
    default: 0,
    // validate: {
    //   validator: validateBookedSeats,
    //   message: () =>
    //     'booked seats can not be more than the number of available seats',
    // },
  },
  startDate: {
    type: Date,
    validate: {
      validator: validateStartDate,
      message: () => 'Start date should be atleast 1 day from now',
    },
  },
  endDate: Date,
});

module.exports = model('Event', EventSchema);
