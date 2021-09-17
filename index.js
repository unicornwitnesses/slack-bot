const { WebClient } = require("@slack/web-api");
const express = require('express')
const app = express();
require('dotenv').config();

const AUTH_KEY = process.env.AUTH_KEY;

let testIntervalId;
let intervalId;

app.get('/notify', (req, res) => {
  const channel = req.query.channel;
  const message = req.query.message || 'Привет! Кто чем занимается сегодня?';
  const client = new WebClient(AUTH_KEY);
  console.log(req, 'req');
  if (!channel) return;

  client.chat.postMessage({
    token: AUTH_KEY,
    channel: `#${channel}`,
    text: message,
  })
    .then(result => console.log(result))
    .then(() => res.status(200).json({
      message: 'Message sent successfully',
    }))
    .catch(err => {
      console.error(err, 'error');
      res.status(500).json({
        error: err.message,
      });
    });
});

app.get('/notify_test', (req, res) => {
  const channel = 'test-bot';
  const message = req.query.message || 'Привет! Кто чем занимается сегодня?';
  const client = new WebClient(AUTH_KEY);
  console.log(req, 'req');
  if (!channel) return;

  client.chat.postMessage({
    token: AUTH_KEY,
    channel: `#${channel}`,
    text: message,
  });

  intervalId = setInterval(() => {
    client.chat.postMessage({
      token: AUTH_KEY,
      channel: `#${channel}`,
      text: message,
    });
  }, 60000);

  res.status(200).json({
    message: 'started',
  });
});

app.get('/notify_test_stop', (req, res) => {
  try {
    if (testIntervalId) {
      clearInterval(intervalId);
      res.status(200).json({
        message: 'good',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.get('/say', (req, res) => {
  res.send('say something');
});

app.get('/', (req, res) => {
  res.send('bklasjdfklj');
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Example app listening on port 8000!')
});
