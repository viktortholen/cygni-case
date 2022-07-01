// import mongoose from 'mongoose';
import app from './app';

const port = process.env.PORT || 5000;

const url = process.env.DB_URL || '';

// mongoose.connect(url, {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', (error) => console.log(error));
// db.once('open', () => console.log('Connected to database'));

// Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});