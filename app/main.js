/**
 *  On déclare des variables de base
 */
const { app, globalShortcut } = require('electron');
const electron = require('electron');
const bw = electron.BrowserWindow;
const path = require('path');
const url = require('url');

/**
 * Quand l'app est prête.
 */
app.on('ready', function() {
    /**
     * Création de la fenêtre d'affichage
     */
    var main_window = new bw({
        webPreferences: {
            nodeIntegration: true,
        },
    });
    //main_window.setMenu(null);
    /**
     * On défini l'url du browser window.
     */
    main_window.loadURL(
        url.format({
            pathname: path.join(__dirname, '../index.html'),
            protocol: 'file:',
            slashes: true,
        })
    );
    /**
     * L'app se ferme quand le browser window est fermé
     */
    main_window.on('closed', function() {
        main_window = null;
        app.exit();
    });
    /**
     * Quand toutes les fenêtres de l'app sont fermées, on ferme l'app.
     */
    app.on('window-all-closed', function() {
        app.quit();
    });

    if (process.argv[2] != '--dev') {
        main_window.setMenu(null);
    }
});

console.log(process.argv);

if (process.argv.length == 2) {
    const { ipcMain } = require('electron');
}
