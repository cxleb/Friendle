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
Make sure your Node runtime is the latest version and your platform supports `canvas` module
Using npm, `npm install` and then to start run `npm start`, you enabled the application commands, allow sometime for discord to cache the commands