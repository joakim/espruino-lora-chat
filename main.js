let name = 'anon';

function encode(data) {
  return btoa(data).split('').map(function (char) {
    return String.fromCharCode(char.charCodeAt(0) - 10);
  }).join('');
}

function decode(data) {
  return atob(data.split('').map(function (char) {
    return String.fromCharCode(char.charCodeAt(0) + 10);
  }).join(''));
}

function send(text) {
  if (text && text.length) {
    Serial2.print(encode(name + ': ' + text) + '\0');
  }

  LED2.reset();
}

Serial2.setup(9600, { rx: A3, tx: A2, errors: true });

let buffer = [];

Serial2.on('data', function (data) {
  LED3.set();
  buffer.push(data);

  if (data.slice(-1) === '\0') {
    let message = decode(buffer.join('').slice(0, -1));

    if (message.slice(message.indexOf(': ') + 2) === 'ping') {
      send('pong');
    }
    else {
      print(message);
      LED2.set();
    }

    buffer = [];
  }

  LED3.reset();
});

setWatch(function () {
  send('ping');
}, BTN, { repeat: true, edge: 'rising', debounce: 25 });
