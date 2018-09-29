import { $, ExtJsObject } from '../extjs';
import MathGraph from './math';
let tools = [
    ['undo', 'undo'],
    ['redo', 'redo'],
    ['bold', 'format_bold'],
    ['italic', 'format_italic'],
    ['underline', 'format_underlined'],
    ['strikeThrough', 'format_strikethrough'],
    ['indent', 'format_indent_increase'],
    ['outdent', 'format_indent_decrease'],
    ['math', 'show_chart'],
    ['insertUnorderedList', 'format_list_bulleted'],
    ['insertOrderedList', 'format_list_numbered'],
    ['hiliteColor', 'highlight'],
    ['code', 'code'],
    ['justifyFull', 'format_align_justify'],
    ['justifyLeft', 'format_align_left'],
    ['justifyCenter', 'format_align_center'],
    ['justifyRight', 'format_align_right'],
    ['formatBlock_h2', 'Titre'],
    ['formatBlock_h3', 'Titre 1'],
    ['formatBlock_h4', 'Titre 2']
];
tools.forEach(tool => {
    let t = $('#tools')
        .child('span')
        .attr('id', tool[0]);
    if (tool[1].indexOf('Titre') == 0) {
        t.child('b').text(tool[1]);
    } else {
        t.child('i')
            .addClass('material-icons')
            .addClass('md-15')
            .text(tool[1]);
    }
});
tools.map(e => e[0]).forEach(func => {
    let x = func.split('_');
    func = x[0];
    $(`#${x.join('_')}`).click(e => {
        console.log();
        e.preventDefault();
        e.stopPropagation();
        if (func == 'math') {
            document.execCommand('insertText', undefined, `\n`);
            document.execCommand(
                'insertHTML',
                undefined,
                `<p>
                    <canvas data-process="tbd">::simonloir.smath.core.graph::</canvas>
                </p> `
            );
            document.execCommand('insertText', undefined, `\n`);
            let canvas = $('#notes').children('[data-process="tbd"]');
            canvas.attr('data-process', 'done');
            let g = new MathGraph(canvas);
            g.reload();
        } else if (func == 'hiliteColor') {
            document.execCommand(func, undefined, 'yellow');
        } else if (func == 'formatBlock') {
            document.execCommand(func, undefined, '<' + x[1] + '>');
        } else document.execCommand(func);
    });
});
export default class Notes {
    constructor(default_html: string) {
        let el: ExtJsObject = $('#notes')
            .child('div')
            .addClass('rich-textarea')
            .attr('spellcheck', 'true')
            .attr('contenteditable', 'true')
            .css('display', 'none')
            .html(default_html);
        el.get(0).addEventListener('blur', (e: FocusEvent) => {
            e.preventDefault();
            e.stopPropagation();
            //@ts-ignore
            e.target.focus();
        });
        el.keydown((e: KeyboardEvent) => {
            let c = e.keyCode;
            let isMathKey = c == 77 && e.ctrlKey == true;
            if (c == 9 || isMathKey) e.preventDefault();
            if (isMathKey) {
                $('#math').click();
            } else if (c == 9) {
                document.execCommand('insertText', undefined, '\t');
            }
        });
        el.children('canvas').forEach(function() {
            let e = $(this);
            if (e.text().indexOf('::simonloir.smath.core.graph::') == 0) {
                let g = new MathGraph(e);
                setTimeout(() => {
                    g.reload();
                }, 200);
            }
        });
    }
}
