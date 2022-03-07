# Friendle
Wordle but with friends as a discord bot

### **Commands**
| Command | Description | 
|-|-|
| `/start` | Starts a new game |
| `/board`| Shows the current board |
| `/guess <word>` | Make a guess in the current game where `<word>` is your guess |

### **Running**

if you want to use it for whatever reason

make an app.json and include these things:
```
{
    "application": "your application id",
    "guild": "your server id",
    "token": "bot token"
}
```
use npm to install `npm install`
run `node deployCommands` and then to start run `npm start`