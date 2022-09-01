const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.use('/api/technicianlists', require('./routes/api/technicianlists'));
app.use('/api/maincomponentlists', require('./routes/api/maincomponentlists'));
app.use('/api/customers', require('./routes/api/customers'));
app.use('/api/secondarylists', require('./routes/api/secondarylists'));
app.use('/api/equipments', require('./routes/api/equipments'));
app.use('/api/oicl', require('./routes/api/oicl'));
app.use(
  '/api/maintenanceplanchecklists',
  require('./routes/api/maintenanceplanchecklists')
);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
