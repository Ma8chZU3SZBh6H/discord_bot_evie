const chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, until} = require('selenium-webdriver');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config()
client.login(process.env.discord_bot_token);
client.on('ready', async ()=>{
    console.log(`Logged in as ${client.user.tag}!`);
});





(async function example() {
    //.setChromeOptions(new chrome.Options().headless())
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless().addArguments("--mute-audio")).build();
    await driver.get('https://www.eviebot.com/en/');
    await driver.findElement(By.xpath('/html/body/div[2]/div[1]/div[2]/div[2]/p[6]/span')).click();

    let finished_talking = 1;
    client.on('messageCreate', async message => { // Message function
        if (finished_talking) {
            const bot = message.mentions.users.filter(mention => mention.id == process.env.app_id);
        
            if (bot.size > 0) {
                const user = bot.first();
                const msg = message.content.replace(`<@!${user.id}>`, '').trim();
                if (msg.length > 0) {
                    await driver.findElement(By.xpath('/html/body/div[2]/div[1]/div[2]/div[1]/form/input[1]')).sendKeys(msg);
                    await driver.findElement(By.xpath('/html/body/div[2]/div[1]/div[2]/div[1]/form/input[2]')).click();
                    finished_talking = 0;
                    while (finished_talking == 0) {
                        finished_talking = await driver.executeScript(`return document.querySelector("#line1 > span").children.length`);
                    }
                    const line = await driver.findElement(By.xpath('//*[@id="line1"]')).getText();
                    message.reply(line);
                }
                
            }
        }
    });

    

    
    
//   try {
    
    
    
    
    
//     console.log(line);
//     //const text = await driver.findElement(By.xpath('//*[@id="line1"]')).getText();
//     //console.log(text);
//     //await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
//     //await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//   } finally {
// // setInterval(()=>{
// // console.log(document.querySelector("#line1 > span").children.length);
// // }, 100);
//     await driver.quit();
//   }
})();