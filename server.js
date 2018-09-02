const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname+'/views/partials')
app.set("view engine", "hbs");
// app.use( (req, res, next) => {
//   res.render("maintenance.hbs");
// });
app.use( (req, res, next) => {
  var formattedHour = new Date().toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    milissecond: "4-digit",
  });
  var log = `${formattedHour}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log("Unable to append to server.log file");
  });
  next();
});
app.use(express.static(__dirname+'/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
app.get('/', (req, res) => {
  // res.send('<h1>Hello express</h1>');
  res.render("home.hbs", {
    pageTitle: 'Home Page',
    name: 'Juari',
    likes: [
      'eating',
      'sleeping',
      'shopping',
    ]
  });
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

// bad errorMessage
app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "Something went bad."
  });
});
