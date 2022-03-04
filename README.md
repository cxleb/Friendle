# Friendle
Wordle but with friends as a discord bot

### **Commands**
| Command | Description | 
|-|-|
| `/start` | Starts a new game |
| `/board`| Shows the current board |
| `/guess :word <guess>` | Make a guess in the current game where `:word` is your guess |

### **Running**

if you want to use it for whatever reason

make an app.json and include these things
```
{
    "token":"bot token",
    "application":"your application id",
    "guild":"your server id"
}
```
use npm to install `discord.js @discordjs/builders @discordjs/rest discord-api-types canvas`
run `node deploy-command` and then to start run `node app`