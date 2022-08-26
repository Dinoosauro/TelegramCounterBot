# Telegram Counter Bot
A Telegram bot that count the number a specific command/phrase/word etc. is written in a Telegram chat

## Configuration
The bot was designed to work with [Autocode](https://autocode.com/), that offers free 1000 requests per month, but it can easily be adapted for other services.

### Autocode-specific instructions
If you don't have one, create an Autocode account. Then, from your dashboard, create a new web service. Choose a name for your project and click the "Create project" button. 


Now, replace the main.js file of your project with the main.js file of this repository. 

### General instructions

Remember to change the {Bot-ID} with your bot token (you can get that from Botfather) & {AutocodeLink} with the link of your server. If you use Autocode, you can find the link of your server on the bottom of the page.

Also, edit the JavaScript if/else statement to add more commands, so that you can set up the bot to respond to the phrases/commands you want.

Finally, if you want that the bot counts phrases and not commands, you must make it an admin in a group, so that it can read every message.
