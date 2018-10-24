/**
 *  On déclare des variables de base
 */
const { app, globalShortcut, Menu, ipcMain, shell } = require('electron');
const electron = require('electron');
const bw = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const os = require('os');
const fs = require('fs');

/**
 * Quand l'app est prête.
 */
app.on('ready', function() {
    /**
     * Création de la fenêtre d'affichage
     */
    var main_window = new bw();
    /**
     * On défini l'url du browser window.
     */
    main_window.loadURL(
        url.format({
            pathname: path.join(__dirname, '../index.html'),
            protocol: 'file:',
            slashes: true
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
    ipcMain.on('print', event => {
        const pdfPath = path.join(os.tmpdir(), 'print.pdf');
        event.sender.webContents.printToPDF({}, function(error, data) {
            if (error) throw error;
            fs.writeFile(pdfPath, data, function(error) {
                if (error) {
                    throw error;
                }
                shell.openItem(pdfPath);
            });
        });
    });
});
