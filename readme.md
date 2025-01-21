# Espruino LoRa Chat

_Using Espruino Original and Ebyte E32-TTL-100_

This was cobbled together from old boards over a weekend, and it worked surprisingly well!

The [chat app](/chat) is a simple CLI, written in 50 lines, to be run with Node.js on a computer that's connected to an Espruino. It communicates via [the code](/main.js) on the Espruino, another 50 lines, that chirps messages using the E32-TTL-100 LoRa module (SX1278).

The transmitted data is scrambled. It's a very weak encryption, but at least it's not plaintext. It would be a nice challenge for someone to try to crack the cipher without having seen the code. It's definitely doable :)

While this code is for Espruino Original and E32-TTL-100, it should be easy to adapt to other Espruino boards and LoRa modules.

#### Example

```sh
./chat alice -d usbmodem48DC886433301
```
```yaml
alice: hello?
bob: hi there!
alice: hey, bob!
bob: funny we should meet here
alice: i know!
bob: lora is the best
alice: █
```

## Requirements

Per peer.

#### Hardware

- 1 x [Espruino Original](https://www.espruino.com/Original) board
- 1 x Ebyte E32-TTL-100 LoRa module ([datasheet](/assets/EBYTE%20E32%20SX1278.pdf))
- 3 x 4.7kΩ resistors
- Breadboard and jumper wires for prototyping

#### Software

- [Node.js](https://nodejs.org/) with npm
- [Espruino Tools](https://www.npmjs.com/package/espruino) installed globally (with `-g`)
- Relatively recent [Espruino firmware](https://www.espruino.com/Download) on the boards

## Schema

| E32-TTL-100 | Espruino Original   |
|-------------|---------------------|
| M0	        | GND (normal mode)   |
| M1	        | GND (normal mode)   |
| RX	        | A2 (4.7kΩ pull-up)  |
| TX	        | A3 (4.7kΩ pull-up)  |
| AUX        	| Not connected       |
| VCC	        | 3.3 (or VBAT if 5V) |
| GND	        | GND                 |

Both Espruino and E32-TTL-100 have 3.3V working voltage, making things easy.

See [this guide for more](https://mischianti.org/lora-e32-device-for-arduino-esp32-or-esp8266-specs-and-basic-usage-part-1/). The schemas for _Wemos D1 mini_, _ESP-32_ and _SAMD MKR WiFi 1010_ will also work for Espruino Original, using the pins listed above.

## Install

1. Note the device name of your Espruino board:

```sh
espruino --list
```

2. Upload and save `main.js` to the Espruino board. From the project's root directory:

```sh
espruino -d [device] -m main.js -e "save()"
```

A unique substring of the device name is enough, you don't need the whole path.

## Usage

From the project's root directory:

```
./chat [alias] -d [device]
```

- `[alias]` is the alias to use while chatting
- `-d [device]` specifies the Espruino device (optional if only one is connected)

To close the chat: `Ctrl-C`

## Help

If the connection fails, try `espruino -d [device]` to see if there are any errors. You may have to enter `echo(1)` to get a REPL (type it and press enter even if you don't see anything).

## License

The Unlicense
