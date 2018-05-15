'use strict';

const {app, dialog, BrowserWindow, Menu, ipcMain} = require('electron');
const fs = require('fs');

/**
 * Load env params
 */
require('../env.js');

/**
 * Set and create app folder
 */
global.appFolder = app.getPath('userData');

if (!fs.existsSync(global.appFolder)) {
  fs.mkdirSync(global.appFolder);
}

/**
 * Enable errors handling
 * @type {hawkCatcher}
 */
if (process.env.HAWK_TOKEN) {
  let hawkCatcher = require('@codexteam/hawk.nodejs')({
    accessToken: process.env.HAWK_TOKEN
  });

  hawkCatcher.initGlobalCatcher();
  global.catchException = hawkCatcher.catchException;
}

/**
 * Enable logger
 * @example global.logger.info('Hey yo');
 */
global.logger = require('./utils/logger');
global.utils = require('./utils/utils');

/** Get deviceId */
const machineIdSync = require('node-machine-id').machineIdSync;
global.deviceId = machineIdSync({original: true});

let pkg = require('./../package.json');

/**
 * Enable Pug
 */
const locals = {
  title: 'CodeX Notes',
};
const pug = require('electron-pug')({
  cache: false,
  // debug: true,
  // compileDebug: true
}, locals);

/**
 * Enable autoupdates
 */
const updater = require('./updater');

/**
 * Cloud-Synchronization controller
 */
const CloudSyncObserver = require('./controllers/cloudSyncObserver');

/**
 * Client-Synchronization controller
 */
const ClientSyncObserver = require('./controllers/clientSyncObserver');

/**
 * Folders controller
 */
const FoldersController = require('./controllers/folders');

/**
 * Notes controllers
 */
const NotesController = require('./controllers/notes');

/**
 * Authorization
 */
const AuthController = require('./controllers/auth');

/**
 * User Controller
 */
const UserController = require('./controllers/user');

/**
 * AppProtocol Controller
 */
const AppProtocol = require('./controllers/app-protocol');

/**
 * Note unread (unseed) state observer
 */
const SeenStateObserver = require('./controllers/seenStateObserver');

/**
 * SyncQueue
 */
const SyncQueue = require('./controllers/syncQueue');

/**
 * User model
 */
const User = require('./models/user');

/**
 * Sockets Controller
 */
const SocketsController = require('./controllers/sockets');

/**
 * PushNotification Controller
 */
const PushNotifications = require('./controllers/pushNotifications');

/**
 * Database setup
 */
const db = require('./utils/database');
db.makeInitialSettings(global.appFolder);

/**
 * All windows is closed
 */
app.on('window-all-closed', function () {
  app.quit();
});

/**
 * @class      CodexNotes
 * @classdesc  Main application class
 *
 * @typedef {CodexNotes} CodexNotes
 * @property {BrowserWindow} mainWindow
 */
class CodexNotes {
  /**
   * Initializes an application
   */
  constructor() {
    /**
     * Web links with codex:// protocol will be handled by application
     * @type {string}
     */
    this.appProtocol = 'codex';

    let windowParams = {
      title: pkg.productName,
      width: 1200,
      minWidth: 1070,
      minHeight: 600,
      height: 700,
      backgroundColor: '#fff',
      titleBarStyle: 'hiddenInset',
      show: false
    };

    /**
     * Show small half screen window for debugging
     */
    if (process.env.DEBUG === 'true') {
      windowParams.x = 10;
      windowParams.y = 50;
      windowParams.width = 740;
      windowParams.minWidth = 600;
    }

    this.mainWindow = new BrowserWindow(windowParams);

    /**
     * @todo make crossplaform menu
     */
    if (process.platform === 'darwin') {
      this.makeMenu();
    }

    this.mainWindow.loadURL('file://' + __dirname + '/views/editor.pug');

    this.mainWindow.once('ready-to-show', () => {
      global.logger.debug('\nMain Window is ready to show. Let\'s go \n');
      this.mainWindow.show();
    });

    /** Open the DevTools. */
    if (process.env.DEBUG === 'true') {
      this.mainWindow.webContents.openDevTools();
    }

    this.mainWindow.on('closed', () => {
      this.destroy();
    });

    /**
     * Init controllers
     */
    this.initComponents()

    /**
     * Set application protocol
     */
      .then(() => {
        this.setAppProtocol();
      })
      .catch((e) => {
        global.logger.debug('App initialization failed because of ', e);
        global.catchException(e);
      });
  }

  /**
   * Activate controller
   */
  initComponents() {
    this.user = new User();

    return this.user.init()
      .then(() => {
        global.logger.debug('Current user data is: ', this.user);

        /**
         * @type {User}
         */
        global.user = this.user;
        this.folders = new FoldersController();
        this.notes = new NotesController();
        this.userCtrl = new UserController();

        /**
         * @type {Sockets}
         */
        this.sockets = new SocketsController();

        this.auth = new AuthController();

        /**
         * @type {CloudSyncObserver}
         */
        this.cloudSyncObserver = new CloudSyncObserver();

        /**
         * @type {ClientSyncObserver}
         */
        this.clientSyncObserver = new ClientSyncObserver();

        /**
         * @type {SeenStateObserver}
         */
        this.seenStateObserver = new SeenStateObserver();

        /**
         * @type {SyncQueue}
         */
        this.syncQueue = new SyncQueue();

        /**
         * @type {Sockets}
         */
        this.sockets = new SocketsController();

        /**
         * @type {PushNotifications}
         */
        this.pushNotifications = new PushNotifications();
      })
      .catch(function (err) {
        global.logger.debug('Initialization error', err);
      });
  }


  /**
   * Makes native application menu
   * @author @guryn
   */
  makeMenu() {
    let createMenuTemplate = require('./menu'),
        menues = createMenuTemplate(app),
        menuBar = Menu.buildFromTemplate(menues.menuBar),
        menuDock = Menu.buildFromTemplate(menues.menuDock);

    Menu.setApplicationMenu(menuBar);
    app.dock.setMenu(menuDock);
  }

  /**
   * Set app protocol to handle internal links
   */
  setAppProtocol() {
    app.setAsDefaultProtocolClient(this.appProtocol);
    app.on('open-url', AppProtocol.process);
  }

  /**
   * Destroyes an application
   */
  destroy() {
    this.mainWindow = null;
  }

  // /**
  //  * Enable updates checker. When
  //  */
  // checkForUpdates() {
  //   try {
  //     // let updateIsDownloaded = false;
  //
  //     // /**
  //     //  * Call "check for updates" function
  //     //  */
  //     // updater.checkForUpdates();
  //
  //     // /**
  //     //  * Check updates hourly
  //     //  */
  //     // setInterval(() => {
  //     //   if (!updateIsDownloaded) {
  //     //     global.logger.debug('[updater] check....');
  //     //     updater.checkForUpdates();
  //     //   }
  //     // }, 60 * 60 * 1000);
  //   } catch (e) {
  //     global.logger.debug('Cannot run updates checker cause %s', e.message);
  //   }
  // }
}

/**
 * Electron is ready
 */
app.on('ready', function () {
  try {
    global.app = new CodexNotes();
  } catch(error) {
    global.catchException(error);
    global.logger.error(`\n
      \n
      ...........................\n
      \n
      CodeX Notes runtime error:`, error, `\n
      \n
      ...........................`);
  }
});
