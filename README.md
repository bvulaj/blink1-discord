# blink1-discord

Blink(1) integration for Discord. Currently supports changing colors based on mute status.

## Requirements

- A Blink(1) device
  - https://blink1.thingm.com/
- Discord installed, running, and signed in to

## Application Setup

- Create a new Discord application at https://discord.com/developers/applications
- Copy and update the client ID and client secret (this can be found under OAuth2 settings) in `blinkmute.js`
- Under OAuth2 settings, add `http://127.0.0.1` as a redirect URI

## Running

- Run `npm install` on first run
- Run with `node blinkmute.js`
- Check Discord and agree to account access
- Blink(1) will change color based on whether or not you are muted
- Kill with `Ctrl-c`
