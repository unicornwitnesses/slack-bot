const { WebClient } = require("@slack/web-api");

let isStarted = false;


const handleRequest = async (request) => {
  if (!isStarted || isStarted) {
    isStarted = true;

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

  publishMessage('#test-bots', 'test');
}


  // if we found data somewhere - return it
  return new Response('success, I guess', { status: 200 });
};

// listen and handle requests
addEventListener("fetch", (event) => {
event.respondWith(
  handleRequest(event.request).catch(
    (err) => new Response(err.stack, { status: 500 })
  )
);
});
