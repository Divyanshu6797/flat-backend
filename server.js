const express=require('express')
require('dotenv').config()
const mongoose=require('mongoose')
const PropertyRoute = require('./routes/PropertyRoute');


const app = express()
const port = process.env.PORT || 4000

var cors = require('cors')
 
const corsOptions = {
    origin: 'http://localhost:3000',  // Only allow requests from your frontend origin
    credentials: true,                // Allow credentials (cookies, authentication)
    optionsSuccessStatus: 200
  };

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});



// Routes
app.use('/api/property', PropertyRoute);
// app.use('/api/user/post', postRoute);
// app.use('/api/user/comment',commentRoute);
// app.use('/api/user/follow',followRoute);
// app.use('/api/user/like',likeRoute);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log('Server started on port', port);
      console.log('Connected to database');
    });
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });