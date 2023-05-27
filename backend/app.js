const mongoose = require('mongoose');
const express = require('express');
const MongoClient = require('mongodb')
const bodyParser = require('body-parser');
const Book = require("./model/Book")
const User = require("./model/User")
const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://abhashkraj:abhash123@cluster0.n1kk76u.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const paginate = (model, options) => {
  return (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    model.paginate({}, { offset: skip, limit, ...options }, (err, result) => {
      if (err) {
        console.error('Error paginating:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(result);
      }
    });
  };
};

app.get('/book', (req, res) => {
  Book.find()
    .then((books) => {
      res.render('book', { books });
    })
    .catch((error) => {
      console.error('Error getting books:', error);
      res.status(500).send('Internal Server Error');
    });
});


app.post('/book', (req, res) => {
  const { author, country, imgLink, language, link, pages, title, year, price } = req.body;

  const newBook = new Book({
    author,
    country,
    imgLink,
    language,
    link,
    pages,
    title,
    year,
    price,
  });

  newBook.save()
    .then(() => {
      res.send('Book created successfully');
    })
    .catch((error) => {
      console.error('Error creating book:', error);
      res.status(500).send('Internal Server Error');
    });
});


app.get('/book', (req, res) => {
  Book.find()
    .then((books) => {
      res.json(books);
    })
    .catch((error) => {
      console.error('Error getting books:', error);
      res.status(500).send('Internal Server Error');
    });
});


app.get('/book/:id', (req, res) => {
  const bookId = req.params.id;

  Book.findById(bookId)
    .then((book) => {
      if (!book) {
        res.status(404).send('Book not found');
      } else {
        res.json(book);
      }
    })
    .catch((error) => {
      console.error('Error getting book:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.put('/book/:id', (req, res) => {
  const bookId = req.params.id;
  const { author, country, imgLink, language, link, pages, title, year, price } = req.body;

  Book.findByIdAndUpdate(bookId, { author, country, imgLink, language, link, pages, title, year, price }, { new: true })
    .then((updatedBook) => {
      if (!updatedBook) {
        res.status(404).send('Book not found');
      } else {
        res.json(updatedBook);
      }
    })
    .catch((error) => {
      console.error('Error updating book:', error);
      res.status(500).send('Internal Server Error');
    });
});



app.delete('/book/:id', (req, res) => {
  const bookId = req.params.id;
  Book.findByIdAndDelete(bookId)
    .then(() => {
      res.send('Book deleted successfully');
    })
    .catch((error) => {
      console.error('Error deleting book:', error);
      res.status(500).send('Internal Server Error');
    });
});


app.post('/user', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  const newUser = new User({
    username,
    password
  });

  newUser.save()
    .then(() => {
      res.send('User created successfully');
    })
    .catch((error) => {
      console.error('Error in user creation:', error);
      res.status(500).send('Internal Server Error');
    });
});


app.get('/book', paginate(Book));

app.get('/user', (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      console.error('Error getting users:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      console.error('Error getting user:', error);
      res.status(500).send('Internal Server Error');
    });
});


app.put('/user/:id', (req, res) => {
  const userId = req.params.id;
  const { username, password } = req.body;

  User.findByIdAndUpdate(userId, { username, password },
    { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(404).send('User not found');
      } else {
        res.json(updatedUser);
      }
    })
    .catch((error) => {
      console.error('Error updating user:', error);
      res.status(500).send('Internal Server Error');
    });
});


app.delete('/user/:id', (req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete(userId)
    .then(() => {
      res.send('User deleted successfully');
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

