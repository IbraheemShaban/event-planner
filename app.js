// let accounts = require('./accounts');
const express = require('express');
const app = express();
const eventsRoutes = require('./api/accounts/events.routes');
const connectDb = require('./database');
console.log(Date());
connectDb();

app.use(express.json());
app.use('/events', eventsRoutes);

app.listen(8000, () => {
  console.log('The application is running on localhost:8000');
});
