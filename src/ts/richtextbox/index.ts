import { $, ExtJsObject } from '../tools/extjs';
import './style.scss';
import SNotesMath from '../math';

export default class RichTextBox {
    private checkClasses(e: any) {
        if (e.relatedTarget.classList.contains('blur-allowed')) return true;
        for (let i = 0; i < this.classes.length; i++) {
            const c = this.classes[i];
            //console.log(e.relatedTarget, c, $(e.relatedTarget).parent('.' + c));
            try {
                if (
                    e.relatedTarget &&
                    $(e.relatedTarget)
                        .parent('.' + c)
                        .count() > 0 &&
                    $(e.relatedTarget)
                        .parent('.' + c)
                        .get(0) != null
                )
                    return true;
            } catch (error) {}
        }
        return false;
    }
    private controls: ExtJsObject;
    private base: ExtJsObject;
    private textarea: ExtJsObject;
    private classes = ['matrix', 'snotes-math-object'];
    constructor(
        default_html = 'Default text',
        appendTo: ExtJsObject = $('body')
    ) {
        const base = appendTo.child('div').addClass('rich-textarea');
        this.base = base;
        this.controls = base.child('div').addClass('controls');
        this.addControls();

        const el = base
            .child('div')
            .addClass('text')
            .attr('spellcheck', 'true')
            .attr('contenteditable', 'true')
            .html(default_html);

        this.textarea = el;

        el.get(0).addEventListener('blur', (e: FocusEvent) => {
            if (this.checkClasses(e)) return;

            e.preventDefault();
            e.stopPropagation();
            //@ts-ignore
            e.target.focus();
        });
        el.keyup((e: KeyboardEvent) => {
            switch (e.key) {
                case 'm':
                    if (e.ctrlKey) {
                        document.execCommand(
                            'insertHTML',
                            false,
                            `<span class="${SNotesMath.className} new">SMathObjectForSNotes</span> `
                        );
                    }
                    const x: HTMLElement = e.srcElement
                        //@ts-ignore
                        .querySelector('.new');
                    const m = new SNotesMath();
                    m.buildFrom(x);
                    x.classList.remove('new');
                    m.focus();
                    break;

                default:
                    break;
            }
        });
        el.keydown((e: KeyboardEvent) => {
            const event: any = { ...e };
            event.relatedTarget = e.target;
            //console.log(this.checkClasses(event));
            if (this.checkClasses(event)) return;
            console.log(e);
            const c = e.keyCode;
            switch (e.key) {
                case 'm':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    break;

                default:
                    break;
            }
            switch (c) {
                case 9:
                    e.preventDefault();
                    if (e.ctrlKey) {
                        e.preventDefault();
                        //e.stopPropagation();
                        console.log(e.target);
                        document.execCommand(
                            'insertHTML',
                            true,
                            `<span class="matrix" contenteditable="false">
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
                        </span>`
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
            { title: 'Titre 4', value: '<h4>', action: 'formatBlock' },
        ].forEach((e) => {
            text_type
                .child('option')
                .attr('value', e.title)
                .text(e.title);
            text_type.change(() => {
                if (text_type.value() == e.title) {
                    //console.log('e');
                    document.execCommand(e.action, undefined, e.value);
                }
            });
        });

        [
            { icon: 'undo', command: 'undo', title: 'Annuler' },
            { icon: 'redo', command: 'redo', title: 'Refaire' },
            { icon: 'format_bold', command: 'bold', title: 'Mettre en gras' },
            {
                icon: 'format_italic',
                command: 'italic',
                title: 'Mettre en italique',
            },
            {
                icon: 'format_strikethrough',
                command: 'strikeThrough',
                title: 'Barrer',
            },
            {
                icon: 'format_indent_increase',
                command: 'indent',
                title: "Augmenter l'indentation",
            },
            {
                icon: 'format_indent_decrease',
                command: 'outdent',
                title: "Diminuer l'indentation",
            },
            {
                icon: 'format_underlined',
                command: 'underline',
                title: 'Souligner',
            },
            {
                icon: 'format_list_bulleted',
                command: 'insertUnorderedList',
                title: 'Liste non numérotée',
            },
            {
                icon: 'format_list_numbered',
                command: 'insertOrderedList',
                title: 'Liste numérotée',
            },
        ].forEach((e) => {
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

    public hide() {
        this.base.css('display', 'none');
    }

    public show() {
        this.base.css('display', 'block');
    }

    public get html() {
        return this.textarea.html();
    }
}
