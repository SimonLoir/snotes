import { $ } from './extjs';
import Popup from './popup';
let dir: string = undefined;
$('#menu-export').click(() => {
    exportHTML();
});

let is_saving = false;

export function exportHTML() {
    let content = '';
    $('canvas').forEach(function() {
        let canvas: HTMLCanvasElement = this;
        $(canvas).attr('data-url', canvas.toDataURL());
    });
    let notes = $('#notes .rich-textarea');
    let images = $('#docs img');
    notes.forEach(i => {
        content += `<img class="img" src="${images
            .only(i)
            .attr('src')}"></img><br />${notes.only(i).html()}`;
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
        let xp: HTMLDivElement = p.get(0);
        let img = p.child('img');
        img.attr('src', $(this).attr('data-url'));
        xp.insertBefore(img.get(0), this);
        $(this).remove();
    });
}
