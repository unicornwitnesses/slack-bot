const { WebClient } = require("@slack/web-api");
const express = require('express')
const app = express();
require('dotenv').config();

let testIntervalId;
let intervalId;

const AUTH_TOKEN = process.env.AUTH_TOKEN;

app.get('/notify', (req, res) => {
  const channel = req.query.channel;
  const message = req.query.message || 'Привет! Кто чем занимается сегодня?';
  const client = new WebClient(AUTH_TOKEN);
  console.log(req, 'req');
  if (!channel) return;

  client.chat.postMessage({
    token: AUTH_TOKEN,
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

app.get('/notify_repeat', (req, res) => {
  const channel = 'daily-reports';
  const message = req.query.message || 'Привет! Кто чем занимается сегодня?';
  const client = new WebClient(AUTH_TOKEN);

  if (!channel) return;

  intervalId = setInterval(() => {
    if (new Date().getUTCHours() === 7) {
      client.chat.postMessage({
        token: AUTH_TOKEN,
        channel: `#${channel}`,
        text: message,
      });
    }
  }, 1000 * 60 * 60);

  res.status(200).json({
    message: 'started',
  });
});

app.get('/notify_repeat_stop', (req, res) => {
  try {
    if (intervalId) {
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

app.get('/notify_test', (req, res) => {
  const channel = 'test-bot';
  const message = req.query.message || 'Привет! Кто чем занимается сегодня?';
  const client = new WebClient(AUTH_TOKEN);
  console.log(req, 'req');
  if (!channel) return;

  intervalId = setInterval(() => {
    if (new Date().getUTCHours() === 12) {
      client.chat.postMessage({
        token: AUTH_TOKEN,
        channel: `#${channel}`,
        text: message,
      });
    }
  }, 1000 * 60 * 60);

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
