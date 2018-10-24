import { $ } from './extjs';
import Popup from './popup';
let dir: string = undefined;
$('#menu-export').click(() => {
    exportHTML();
});

let is_saving = false;

export async function exportHTML() {
    let content = '';
    $('canvas').forEach(function() {
        let canvas: HTMLCanvasElement = this;
        $(canvas).attr('data-url', canvas.toDataURL());
    });
    let notes = $('#notes .rich-textarea');
    let images = $('#docs .xsvg');
    notes.forEach(i => {
        content += `${images
            .only(i)
            .html()}<div class="break"></div>${notes
            .only(i)
            .html()}<div class="break"></div>`;
    });
    let p = new Popup();
    p.content.html(content);
    p.content.cssObj({
        width: '90vw',
        height: '90vh',
        overflow: 'auto'
    });
    p.content.children('canvas').forEach(function() {
        let p = $(this).parent();
        console.log(this);
        let xp: HTMLDivElement = p.get(0);
        let img = p.child('img');
        img.attr('src', $(this).attr('data-url'));
        xp.insertBefore(img.get(0), this);
        $(this).remove();
    });
    console.log(await (await fetch('./dist/export.bundle.js')).text());
    p.m.click();
    let htmlBlob = new Blob(
        [
            `<!DOCTYPE html>
            <html lang="fr">
            <head>
              <meta charset="utf-8">
              <title>snote.html</title>
              <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
            </head>
            <body>
            ${p.content.html()}
            
            <script>${await (await fetch(
                './dist/export.bundle.js'
            )).text()}</script>
            </body>
            </html>`
        ],
        { type: 'text/html' }
    );
    open(URL.createObjectURL(htmlBlob), '_blank');
}
