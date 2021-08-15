const { WebClient } = require("@slack/web-api");

const express = require('express')
const app = express();
app.get('/notify', (req, res) => {
  const client = new WebClient("xoxb-468242695412-2394252523313-F1U34u14bNYWRv5ohoONKAFP");
  client.chat.postMessage({
    token: "xoxb-468242695412-2394252523313-F1U34u14bNYWRv5ohoONKAFP",
    channel: '#activities',
    text: 'Привет! Кто чем занимается сегодня?'
  })
  .then(result => console.log(result))
  .then(() => res.send('Welcome to learn backend with express!'))
  .catch(err => {
    console.error(err, 'error');
    res.send('bad')
  });
});

app.get('/', (req, res) => {
  res.send('bklasjdfklj');
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Example app listening on port 8000!')
});
