import './style/print.scss';
import './typescript/notes/code';
import { $ } from './typescript/extjs';
import CodeEditor from './typescript/notes/code';
window.onload = () => {
    $('.scode-editor').forEach(function() {
        let c = new CodeEditor($(this));
    });
    requestAnimationFrame(() => {
        setTimeout(() => {
            try {
                const ipcRenderer = require('electron').ipcRenderer;
                ipcRenderer.send('print', '');
            } catch (error) {
                print();
                window.close();
            }
        }, 1000);
    });
};
