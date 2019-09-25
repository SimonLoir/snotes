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
        this.controls
            .child('span')
            .text('test')
            .click(() => {
                document.execCommand('insertUnorderedList');
            });
    }
}
