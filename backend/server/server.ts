import app from './app';

const port = process.env.PORT || 5000;

// Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});