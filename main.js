const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

// Create the main window
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Image Reszier',
    width: isDev ? 1200 : 500,
    height: 600,
  });

  // Open dev tools if in dev
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

// Create about windown
function createAboutWindow() {
  const aboutWindow = new BrowserWindow({
    title: 'About Image Reszier',
    width: 300,
    height: 300,
  });

  aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));
}

// App is ready
app.whenReady().then(() => {
  createMainWindow();
  // Implement Menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// Menu template
const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    role: 'fileMenu',
  },
];

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});
