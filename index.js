const { app, BrowserWindow, Tray, Menu, protocol } = require('electron');
// const Store = require('electron-store');
const path = require('path');
const singleInstanceLock = app.requestSingleInstanceLock();

let mainWindow;
let settingsWindow;
let appIcon;
// const localStorage = new Store();

if (!singleInstanceLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js'),
        },
        title: "TikTok Music",
        autoHideMenuBar: true,
        icon: path.join(__dirname, 'icon.png'),
        minHeight: 600,
        minWidth: 800,
    });

    mainWindow.on('close', async function (evt) {
        /*let settnignsmnsdms = localStorage.get("closeOnMinimize")

        if (settnignsmnsdms == null || settnignsmnsdms == "false") {
            if (settingsWindow) {
                mainWindow.removeAllListeners('close'); 
                mainWindow.close();

                settingsWindow.removeAllListeners('close'); 
                settingsWindow.close();
                
                app.quit();
            } else {
                mainWindow.removeAllListeners('close'); 
                mainWindow.close();

                app.quit();
            }
        }  else {
            evt.preventDefault();
            mainWindow.hide();
        } */

        evt.preventDefault();
        mainWindow.hide();
    });

    const ses = mainWindow.webContents.session;

    ses.cookies.get({}, (error, cookies) => {
        if (!error) {
            const cookieArray = cookies.map((cookie) => {
                return {
                    url: `https://${cookie.domain}`,
                    name: cookie.name,
                    value: cookie.value,
                };
            });

            ses.cookies.set(cookieArray, (setCookiesError) => {
                if (setCookiesError) {
                    console.error('Exception while loading session cookies:', setCookiesError);
                }
            });
        } else {
            console.error('Exception while getting session cookies:', error);
        }
    });

    mainWindow.loadURL('https://music.tiktok.com/player');
}

function ToggleSettingsWindow() {
    if (settingsWindow) {
        settingsWindow.show();
    } else {
        settingsWindow = new BrowserWindow({
            width: 300,
            height: 400,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: true,
                enableRemoteModule: false,
                preload: path.join(__dirname, 'preload.js'),
            },
            title: "TikTok Music",
            autoHideMenuBar: true,
            icon: path.join(__dirname, 'icon.png'),
            minHeight: 300,
            minWidth: 400,
        });

        settingsWindow.on('close', function (evt) {
            evt.preventDefault();
            settingsWindow.hide();
        });

        const ses = settingsWindow.webContents.session;

        ses.cookies.get({}, (error, cookies) => {
            if (!error) {
                const cookieArray = cookies.map((cookie) => {
                    return {
                        url: `https://${cookie.domain}`,
                        name: cookie.name,
                        value: cookie.value,
                    };
                });

                ses.cookies.set(cookieArray, (setCookiesError) => {
                    if (setCookiesError) {
                        console.error('Exception while loading session cookies:', setCookiesError);
                    }
                });
            } else {
                console.error('Exception while getting session cookies:', error);
            }
        });

        settingsWindow.loadFile("Settings/index.html");
    }
}

app.on('ready', async () => {
    protocol.registerStringProtocol('bytedance', (request, callback) => {
        console.log("PREVENTED BYTEDANCE DIALOG");
    })

    createWindow();

    appIcon = new Tray(path.join(__dirname, 'icon.png'));
    appIcon.setToolTip("TikTok Music");

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Quit',
            click: () => {
                if (settingsWindow) {
                    mainWindow.removeAllListeners('close');
                    mainWindow.close();

                    settingsWindow.removeAllListeners('close');
                    settingsWindow.close();

                    app.quit();
                } else {
                    mainWindow.removeAllListeners('close');
                    mainWindow.close();

                    app.quit();
                }
            }
        }
        // {
        //     label: 'Settings',
        //     click: () => {
        //         ToggleSettingsWindow();
        //     }
        // }
    ]);

    appIcon.setContextMenu(contextMenu);

    appIcon.on('click', () => mainWindow.show());
});
