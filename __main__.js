module.exports = async (context) => {
  async function countMessage(getTextTemplate, keyInfo) {
    // getTextTemplate -> the default command template, where only the number must be replaced.
    // keyInfo -> the key ID where the number is stored.

    // Start building the message
    body.method = 'sendMessage';
    // Get the old value from the key, add 1 and then set the new value.
    let getKey = await lib.utils.kv['@0.1.16'].get({
      key: keyInfo,
      defaultValue: `0`,
    });
    getKey++;
    let result = await lib.utils.kv['@0.1.16'].set({
      key: keyInfo,
      value: getKey,
    });
    // Set the response message text
    body.text = getTextTemplate.replace('$n', getKey.toString());;
    // Convert body to a JSON response
    let response = {
      headers: { 'Content-Type': 'application/json' },
      statusCode: 200,
      body: JSON.stringify(body),
    };
    return response;
  }
  async function dropUpdates() {
    // Since nothing useful can be done, pending updates will be dropped (by reconfiguring the Webhook)
    // Replace {Bot-ID} with the key from Botfather and {AutocodeLink} with the link to your Autocode server.
    let result = await lib.http.request['@1.1.7']({
      method: 'GET',
      url: `https://api.telegram.org/bot{Bot-ID}/setWebhook?url={AutocodeLink}`
    });
  }
  const request = JSON.parse(context.http.body);
  console.log('Request ', context.http.body);
  let body = {};
  const lib = require('lib')({ token: process.env.STDLIB_SECRET_TOKEN });
  try {
    // Get chat ID and text, necessary for sending a message
    body.chat_id = request.message.chat.id;
    body.text = request.message.text;
  } catch (e) {
    // If they aren't available, the request is useless for this bot. It'll be discarded.
    console.log(e);
    console.log("Not useful request. Without Chat ID and text, the request can't be completed.")
    await dropUpdates();
    return;
  }
  // Now check what the request message is about.
  // If/Else statements are used instead of switch statement due to the includes property.

  if (request.message.text == undefined) {
    // This shouldn't occour, since undefined text messages will be dropped in the try/catch section. In any case, the request must be dropped.
    await dropUpdates();
  } else if (request.message.text.toLowerCase().includes("/counterexample")) {
    return await countMessage('Example count; $n', "counterExample");
    // You can set up more count commands with different keys by using another else if statement.
  } else {
    // If no supported command is executed, drop the update.
    await dropUpdates();
  }

};