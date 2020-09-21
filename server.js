var express = require('express');
var hbs = require('hbs');
var fs = require('fs');

var port = process.env.PORT || 8080;

var app = express();
hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}, ${req.method}, ${req.url}`;
  console.log("Now:",log );
  fs.appendFile('server.log', log +'\n' ,err => {
    if(err) {
      console.log("Error");
    }
  })
  next();
})

// app.use((req, res, next) => {
//     res.render('maintanence.hbs');
// })

app.use(express.static(__dirname+'/public'))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req,res) => {
  // res.send("<h1>hello express</h1>");
  res.render('home.hbs', {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome!!!"
  });
});

app.get('/about', (req,res) => {
  // res.send("<h1>About Page</h1>");
  res.render('about.hbs', {
    pageTitle: "About Page"
  });
});

app.get('/projects', (req,res) => {
  // res.send("<h1>About Page</h1>");
  res.render('projects.hbs', {
    pageTitle: "Project Page"
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage:  'Error occured',
  });
})

app.listen(port, () => {
  console.log("server is running");
});
