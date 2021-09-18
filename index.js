const { WebClient, LogLevel } = require("@slack/web-api");
const express = require('express')
const app = express();
require('dotenv').config();

let testIntervalId;
let intervalId;

const AUTH_TOKEN = process.env.AUTH_TOKEN;
const SECRET = process.env.SECRET;

app.get('/notify', (req, res) => {
  try {
    const channel = req.query.channel;
    const message = req.query.message || 'Привет! Кто чем занимается сегодня?';
    const secret = req.query.secret;

    if (secret !== SECRET) {
      throw new Error('Wrong secret key');
    }

    const client = new WebClient(AUTH_TOKEN);

    client.chat.postMessage({
      token: AUTH_TOKEN,
      channel: `#${channel}`,
      text: message,
    })
  } catch (err) {
    console.error(err, 'error');
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get('/notify_repeat', (req, res) => {
  try {
    const channel = req.query.channel || 'daily-reports';
    const message = req.query.message || 'Привет! Кто чем занимается сегодня?';
    const secret = req.query.secret;

    if (secret !== SECRET) {
      throw new Error('Wrong secret key');
    };

    const sendMessage = () => {
      console.log('called');

      if (new Date().getUTCHours() === 7 && new Date().getUTCMinutes() === 0) {
        const client = new WebClient(AUTH_TOKEN, {
          logLevel: LogLevel.DEBUG,
        });

        console.log('worked');

        client.chat.postMessage({
          token: AUTH_TOKEN,
          channel: `#${channel}`,
          text: message,
        });
      }
    };

    intervalId = setInterval(sendMessage, 1000 * 60);

    res.status(200).json({
      message: 'Started notifiying successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get('/notify_repeat_stop', (req, res) => {
  try {
    const secret = req.query.secret;

    if (secret !== SECRET) {
      throw new Error('Wrong secret key');
    };

    console.log('intervalId', intervalId);
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
  try {
    const channel = 'test-bot';
    const message = req.query.message || 'Привет! Кто чем занимается сегодня?';
    const secret = req.query.secret;

    if (secret !== SECRET) {
      throw new Error('Wrong secret key');
    };

    const sendMessage = () => {
      console.log('called');
      if (new Date().getUTCHours() === 9 && new Date().getUTCMinutes() === 10) {
        const client = new WebClient(AUTH_TOKEN, {
          logLevel: LogLevel.DEBUG,
        });
        console.log('worked');
        client.chat.postMessage({
          token: AUTH_TOKEN,
          channel: `#${channel}`,
          text: message,
        });
      }
    };

    intervalId = setInterval(sendMessage, 1000 * 60);

    res.status(200).json({
      message: 'started',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.get('/notify_test_stop', (req, res) => {
  try {
    const secret = req.query.secret;

    if (secret !== SECRET) {
      throw new Error('Wrong secret key');
    };

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

app.get('/', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Started listening on port: ', process.env.PORT);
});
