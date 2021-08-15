const { WebClient } = require("@slack/web-api");

const client = new WebClient("xoxb-468242695412-2394252523313-F1U34u14bNYWRv5ohoONKAFP");

let isFirstTimeSent = false;

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

  const init = () => {
    isFirstTimeSent = true;
    publishMessage('#activities', 'Привет! Кто чем занимается сегодня?');
  }
  

  setInterval(() => {
    publishMessage('#activities', 'Привет! Кто чем занимается сегодня?');
  }, 75600000);

init();
