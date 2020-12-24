const Blink1 = require('node-blink1');
const DiscordRPC = require('discord-rpc');
const http = require('http');
const gracefulShutdown = require('node-graceful-shutdown')

const clientId = '791120549873975317';
const clientSecret = 'w6ne7nReK0JMAwMYTNF8pz17_PSpI6Ht'
const scopes = ['rpc', 'rpc.notifications.read']

var blink1 = new Blink1();
console.log('Connected to Blink(1)', blink1.serialNumber);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
rpc.on('ready', () => {
	console.log('Connected to Discord for', rpc.user.username);
	rpc.getVoiceSettings()
		.then(vs => updateBlink(vs));
	rpc.subscribe("VOICE_SETTINGS_UPDATE", vs => updateBlink(vs));
});
rpc.login({ clientId: clientId, clientSecret: clientSecret, scopes: scopes, redirectUri: 'http://127.0.0.1' }).catch(console.error);

const server = http.createServer((req, res) => {
	res.end();
});

async function updateBlink(vs) {
	if (vs.mute) {
		blink1.fadeToRGB(500, 0, 100, 0);
	} else {
		blink1.fadeToRGB(500, 100, 0, 0);
	}
}

async function shutdown() {
	blink1.off(() => {
		console.log('Blink1 turned off.');
	});
	blink1.close(() => {
		console.log('Blink1 client closed.');
	});
	rpc.destroy()
		.then(() => {
			console.log('Discord RPC client closed.');
		});

	server.close(() => {
		console.log('Server shut down.');
	});
};

gracefulShutdown.onShutdown(shutdown);

server.listen(53134);


