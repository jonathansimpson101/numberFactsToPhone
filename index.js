const fetch = require('node-fetch');
const chalk = require('chalk');
const prompt = require('prompt-sync')();
require('dotenv').config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Privide phone numbers
const sandboxNumber = '+{}';
const myNumber = '{}';

// Prompt to get number input
let number = prompt(chalk.bgYellow('What number would you like a fact about?'));

// Hit numbers API
const url = `http://numbersapi.com/${number}/math?json`;

fetch(url).then(response => response.json())
          .then(result => {

            // Present the result to the screen
            console.log(chalk.bgGreen(result.text));


            // Send fact via Whatsapp
            client.messages.create({
              from: `whatsapp:${sandboxNumber}`,
              body: result.text,
              to: `whatsapp:${myNumber}`
            })


          })
