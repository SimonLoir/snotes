import { $, ExtJsObject } from '../tools/extjs';

export default class RichTextBox {
    constructor(
        default_html = 'Default text',
        appendTo: ExtJsObject = $('body')
    ) {
        const el = appendTo
            .child('div')
            .addClass('rich-textarea')
            .attr('spellcheck', 'true')
            .attr('contenteditable', 'true')
            .html(default_html);

        el.get(0).addEventListener('blur', (e: FocusEvent) => {
            /*
            -----old code, should be verified
            if ($('.mask').count() > 0) return;
            if (
                e.relatedTarget &&
                $(e.relatedTarget)
                    .parent('.scode-editor')
                    .count() > 0
            )
                return;
            console.log(e, e.relatedTarget);*/
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
                        <span style="display: inline-block; background: red;vertical-align: middle;position: relative;">
                        <table style="display: inline-table; vertical-align: top;">
                            <tr>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                            </tr>
                            <tr>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                            </tr>
                            <tr>
                                <td> </td>
                                <td> </td>
                                <td> </td>
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
}
