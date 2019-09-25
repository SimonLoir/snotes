import { $, ExtJsObject } from '../tools/extjs';
import './style.scss';

export default class RichTextBox {
    private controls: ExtJsObject;
    constructor(
        default_html = 'Default text',
        appendTo: ExtJsObject = $('body')
    ) {
        const base = appendTo.child('div').addClass('rich-textarea');
        this.controls = base.child('div').addClass('controls');
        this.addControls();

        const el = base
            .child('div')
            .addClass('text')
            .attr('spellcheck', 'true')
            .attr('contenteditable', 'true')
            .html(default_html);

        el.get(0).addEventListener('blur', (e: FocusEvent) => {
            if (
                e.relatedTarget &&
                $(e.relatedTarget)
                    .parent('.matrix')
                    .count() > 0
            )
                return;
            e.preventDefault();
            e.stopPropagation();
            //@ts-ignore
            e.target.focus();
        });
        el.keydown((e: KeyboardEvent) => {
            const c = e.keyCode;
            switch (c) {
                case 9:
                    e.preventDefault();
                    if (e.ctrlKey) {
                        e.preventDefault();
                        e.stopPropagation();
                        document.execCommand(
                            'insertHTML',
                            true,
                            `
                        <span class="matrix" contenteditable="false">
                        <table contenteditable="true">
                            <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                        </table>
                        </span> `
                        );
                    } else document.execCommand('insertText', undefined, '\t');
                    break;

                default:
                    break;
            }
        });
    }

    private addControls() {
        const text_type = this.controls.child('select');
        [
            { title: '' },
            { title: 'Titre 1', value: '<h1>', action: 'formatBlock' },
            { title: 'Titre 2', value: '<h2>', action: 'formatBlock' },
            { title: 'Titre 3', value: '<h3>', action: 'formatBlock' },
            { title: 'Titre 4', value: '<h4>', action: 'formatBlock' }
        ].forEach(e => {
            text_type
                .child('option')
                .attr('value', e.title)
                .text(e.title);
            text_type.change(() => {
                if (text_type.value() == e.title) {
                    console.log('e');
                    document.execCommand(e.action, undefined, e.value);
                }
            });
        });

        [
            { icon: 'undo', command: 'undo', title: 'Annuler' },
            { icon: 'redo', command: 'redo', title: 'Refaire' },
            { icon: 'format_bold', command: 'bold', title: 'Mettre en gras' },
            { icon: 'format_italic', command: 'italic' },
            { icon: 'format_strikethrough', command: 'strikeThrough' },
            { icon: 'format_indent_increase', command: 'indent' },
            { icon: 'format_indent_decrease', command: 'outdent' },
            { icon: 'format_underlined', command: 'underline' }
        ].forEach(e => {
            this.controls
                .child('span')
                .addClass('material-icons')
                .attr('title', e.title || '')
                .text(e.icon)
                .click(() => {
                    document.execCommand(e.command);
                });
        });
    }
}
