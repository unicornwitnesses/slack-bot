const { WebClient } = require("@slack/web-api");

const client = new WebClient("xoxb-468242695412-2394252523313-F1U34u14bNYWRv5ohoONKAFP");

const publishMessage = (id, text) => {
    client.chat.postMessage({
      token: "xoxb-468242695412-2394252523313-F1U34u14bNYWRv5ohoONKAFP",
      channel: id,
      text: text
    })
    .then(result => console.log(result))
    .catch(err => {
      console.error(err, 'error');
    });
}

  publishMessage('#test-bots', 'Привет! Кто чем занимается сегодня?');
