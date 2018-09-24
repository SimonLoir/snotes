import { $, ExtJsObject } from './extjs';

export default class Popup {
    private body: ExtJsObject;

    private mask: ExtJsObject;

    constructor() {
        this.mask = $(document.body)
            .child('div')

            .addClass('mask');

        this.mask.click(e => {
            this.mask.remove();

            this.body.remove();
        });

        this.body = $(document.body)
            .child('div')

            .addClass('popup');

        this.body

            .child('span')

            .text('×')

            .cssObj({
                position: 'absolute',

                top: '15px',

                right: '15px',

                cursor: 'pointer',

                color: 'crimson'
            })

            .click(() => this.mask.click());
    }

    get content() {
        return this.body;
    }

    get m() {
        return this.mask;
    }
}

export function buildInput(
    parent: ExtJsObject,
    label_text: string,
    type: string,
    default_value?: string,
    settings?: () => void
): ExtJsObject {
    let input_types = [
        'text',

        'password',

        'email',

        'number',

        'range',

        'date',

        'time',

        'color',

        'datetime',

        'datetime-local'
    ];

    let other_types = ['textarea', 'select'];

    let div = parent.child('div').addClass('field');

    let label = div

        .child('label')

        .addClass('top')

        .html(label_text);

    let input: ExtJsObject;

    if (input_types.indexOf(type) >= 0) {
        input = div.child('input').addClass('input');

        input.get(0).type = type;
    } else {
        input = div

            .child(type)

            .addClass('input')

            .addClass(type);

        if (settings != undefined) {
            input.css('display', 'inline-block');

            input.css('width', '90%');

            div.child('span')

                .html('&#9881;')

                .css('cursor', 'pointer')

                .click(settings);
        }
    }

    let i = input.get(0);

    i.onfocus = function() {
        this.parentElement.classList.add('focus');

        if (this.parentElement.classList.contains('notempty')) {
            this.parentElement.classList.remove('notempty');
        }
    };

    i.onblur = function() {
        if (type != 'date' && type != 'time') {
            this.parentElement.classList.remove('focus');
        }

        if (this.value != '') {
            this.parentElement.classList.add('notempty');
        }
    };

    if (default_value) input.value(default_value);

    i.onfocus();

    i.onblur();

    return input;
}
