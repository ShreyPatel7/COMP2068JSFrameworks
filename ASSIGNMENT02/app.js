// Importing required modules
const express = require('express'); // Importing Express framework
const bodyParser = require('body-parser'); // Importing body-parser middleware
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB interaction
const methodOverride = require('method-override'); // Importing method-override middleware
const session = require('express-session'); // Importing express-session middleware
const bcrypt = require('bcrypt'); // Importing bcrypt for password hashing
const User = require('./models/user'); // Importing the User model
const Task = require('./models/task'); // Importing the task model

// Initializing the express app
const app = express(); // Creating an instance of the Express app
const PORT = process.env.PORT || 3001; // Defining the port number

// Connecting to MongoDB database
mongoose.connect('mongodb+srv://Shrey071003:Shrey7103@cluster0.ovjonuo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true, // Using the new URL parser
  useUnifiedTopology: true // Using unified topology
}).then(() => {
  console.log('Connected to MongoDB'); // Logging successful database connection
}).catch(err => {
  console.error('Error connecting to MongoDB', err); // Logging error in database connection
});

// Using middleware
app.use(bodyParser.urlencoded({ extended: false })); // Parsing urlencoded bodies
app.use(express.static('public')); // Serving static files from the 'public' directory
app.use(methodOverride('_method')); // Overriding HTTP methods
app.use(session({
  secret: 'ShreyKhushudeepharshKrushilDharm', // Setting the secret for the session
  resave: false, // Not resaving the session
  saveUninitialized: true // Saving uninitialized sessions
}));

// Setting view engine to Jade
app.set('view engine', 'jade'); // Configuring the view engine to Jade

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next(); // Proceeding to the next middleware if a user session exists
  } else {
    res.redirect('/login'); // Redirecting to the login page if no user session is found
  }
};

// Rendering the login form
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' }); // Rendering the login form
});

// Handling login form submission
app.post('/login', async (req, res) => {
  const { email, password } = req.body; // Retrieving email and password from the request body
  try {
    const user = await User.findOne({ email }); // Finding the user with the provided email
    if (!user) { // If user is not found
      res.status(404).send('User not found'); // Sending a 404 status with error message
      return;
    }
    if (await bcrypt.compare(password, user.password)) { // If password is correct
      req.session.user = user; // Setting the user session
      res.redirect('/'); // Redirecting to the home page
    } else {
      res.status(401).send('Incorrect password'); // Sending a 401 status with error message
    }
  } catch (err) {
    console.error(err); // Logging any errors
    res.status(500).send('Server Error'); // Sending a 500 status with error message
  }
});

// Rendering the signup form
app.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign Up' }); // Rendering the signup form
});

// Handling signup form submission
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body; // Retrieving username, email, and password from the request body
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
    await User.create({ username, email, password: hashedPassword }); // Creating a new user
    res.redirect('/login'); // Redirecting to the login page
  } catch (err) {
    console.error(err); // Logging any errors
    res.status(500).send('Server Error'); // Sending a 500 status with error message
  }
});

// Handling logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => { // Destroying the session
    if (err) {
      console.error(err); // Logging any errors
    }
    res.redirect('/login'); // Redirecting to the login page
  });
});

// Protected route - requires authentication
app.get('/', isAuthenticated, (req, res) => {
  res.render('index', { title: 'Home' }); // Rendering the home page
});

// Other routes...
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' }); // Rendering the contact page
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' }); // Rendering the about page
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); // Finding all tasks
    res.render('tasks', { title: 'Tasks', tasks }); // Rendering the tasks page with tasks data
  } catch (err) {
    console.error(err); // Logging any errors
    res.status(500).send('Server Error'); // Sending a 500 status with error message
  }
});

app.get('/tasks/new', (req, res) => {
  res.render('add-task', { title: 'Add Task' }); // Rendering the add-task form
});

app.post('/tasks', async (req, res) => {
  const { title, description, dueDate, dueTime, priority, progress } = req.body; // Retrieving task data from the request body
  try {
    await Task.create({ title, description, dueDate, dueTime, priority, progress }); // Creating a new task
    res.redirect('/tasks'); // Redirecting to the tasks page
  } catch (err) {
    console.error(err); // Logging any errors
    res.status(500).send('Server Error'); // Sending a 500 status with error message
  }
});

app.get('/tasks/:id/edit', async (req, res) => {
  const taskId = req.params.id; // Retrieving task ID from request parameters
  try {
    const task = await Task.findById(taskId); // Finding the task by ID
    if (!task) { // If task is not found
      res.status(404).send('Task not found'); // Sending a 404 status with error message
      return;
    }
    res.render('edit-task', { title: 'Edit Task', task }); // Rendering the edit-task form with task data
  } catch (err) {
    console.error(err); // Logging any errors
    res.status(500).send('Server Error'); // Sending a 500 status with error message
  }
});

app.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id; // Retrieving task ID from request parameters
  const { title, description, dueDate, dueTime, priority, progress, completed } = req.body; // Retrieving task data from the request body
  try {
    const task = await Task.findById(taskId); // Finding the task by ID
    if (!task) { // If task is not found
      res.status(404).send('Task not found'); // Sending a 404 status with error message
      return;
    }
    task.title = title; // Updating task title
    task.description = description; // Updating task description
    task.dueDate = dueDate; // Updating task due date
    task.dueTime = dueTime; // Updating task due time
    task.priority = priority; // Updating task priority
    task.progress = progress; // Updating task progress
    task.completed = completed === 'on'; // Updating task completion status
    await task.save(); // Saving the updated task
    res.redirect('/tasks'); // Redirecting to the tasks page
  } catch (err) {
    console.error(err); // Logging any errors
    res.status(500).send('Server Error'); // Sending a 500 status with error message
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id; // Retrieving task ID from request parameters
  try {
    await Task.findByIdAndDelete(taskId); // Deleting the task by ID
    res.redirect('/tasks'); // Redirecting to the tasks page
  } catch (err) {
    console.error(err); // Logging any errors
    res.status(500).send('Server Error'); // Sending a 500 status with error message
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Logging the server start message
});

module.exports = app; // Exporting the Express app instance
