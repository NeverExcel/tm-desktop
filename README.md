# tm-desktop | TikTok Music Desktop Client

A desktop application designed to achieve compatibility with Linux devices.

bludd

## Why?
TikTok Music is only available in very few countries, including mine. Since I frequently use Linux and the company has not released an application for Linux, I know that many others, not just me, need a solution. We need a way to enjoy the streaming service without having to rely on the annoying web browser tab at `https://music.tiktok.com/player`. That's why I created this project.

You can really make use of this to make a desktop client to anything website.
<hr/>

## Mirrors
The only official mirror for the tm-desktop package is snapcraft.io
https://snapcraft.io/tm-desktop

And you can install it using 
```sh
sudo snap install tm-desktop
```

## Features
- Minimize to tray, a feature that almost all music streaming services offer.

- The only way to close is from the **System Tray** > **TikTok Music** > **Quit**, I'll update this to be an option in the future.

## How to Run/Build

First, install `electron` and `electron-builder` globally to use this application properly.

```sh
npm install -g electron
npm install -g electron-builder
```
<hr/>

Install the dependencies of "tm-desktop" with npm.

```sh
cd tm-desktop
npm install
```
<hr/>

Then, you can use the following command to run the application:
```sh
electron .
```
<hr/>

You can also compile this for any platform, which is why I chose Electron. I recommend referring to the [electron-builder docummentation](https://www.electron.build/cli) to learn how to do this.
<hr/>

_— Made with love by Excel. <3_
