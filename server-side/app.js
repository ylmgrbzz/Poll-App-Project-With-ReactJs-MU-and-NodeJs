// Edanur Türkeş 31.12.2022


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const savePoll = require('./models/savePoll');

app.use(bodyParser.json());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-type,Accept'
  );
  next();
});
app.get('/', (req, res) => res.send('hello world!'));
app.post('/api', (req, res) => {
  const x = req.body.question.question;
  const y = req.body.options;
  console.log(x, y);
  var data = new savePoll({
    question: req.body.question.question,
    pollid: req.body.question.id,
    options: req.body.options,
  });
  data
    .save()
    .then((response) => res.send(response))
    .catch((error) => res.send(error));
});
app.post('/editpoll', (req, res) => {
  const x = req.body.question.question;
  const y = req.body.options;
  const k = req.body.pollid;
  console.log(x, y);

  savePoll
    .findOneAndUpdate({ pollid: k }, { question: x, options: y })
    .then((response) => res.send(response))
    .catch((error) => res.send(error));
});

app.post('/links', (req, res) => {
  const x = req.body.id;
  //console.log(x);
  savePoll
    .findOne({ pollid: x })
    .then((response) => res.send(response))
    .catch((error) => res.send(error));
});
app.post('/submitresponse', (req, res) => {
  console.log('api working', req.body.id, req.body.count, req.body.pollid);
  const pollid = req.body.pollid;
  savePoll
    .updateOne(
      { pollid: pollid, 'options.id': req.body.id },
      { $set: { 'options.$.count': req.body.count } }
    )
    .then(() => {
      console.log('Count updated');
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post('/deletepoll', (req, res) => {
  //console.log(req.body.key);
  savePoll
    .findOneAndRemove({ _id: req.body.key })
    .then(() => {
      console.log('Poll deleted');
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get('/getpoll/:id', (req, res) => {
  const x = req.params.id;
  console.log('response made' + x);
  savePoll
    .findOne({ pollid: x })
    .then((response) => res.send(response))
    .catch((error) => res.send(error));
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).send("Username or password is incorrect");

  const access_token = jwt.sign({ sub: user._id }, SECRET, { expiresIn: "30m" });

  res.send({ access_token });
});

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send("Authorization header is missing");

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET, (error, decoded) => {
    if (error) return res.status(401).send("Token is invalid");

    req.user = decoded;
    next();
  });
};

app.get("/protected", authenticateJWT, (req, res) => {
  res.send("Welcome to protected route");
});

app.listen(port, () => console.log(`listening on port ${port}`));
