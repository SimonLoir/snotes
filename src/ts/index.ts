import FileLoader from './loader/file.loader';
import RichTextBox from './richtextbox';
import '../scss/index.scss'; // style must be loaded at the end so that it's used instead of default style
import { $, ExtJsObject } from './tools/extjs';
import snoteDocumentLoader from './loader/snote.loader';
const workspace = $('body')
    .child('div')
    .addClass('workspace');

const controls = workspace.child('div').addClass('controls');
let snoteDoc: snoteDocumentLoader;

[
    {
        icon: 'note_add',
        title: 'Charger un document',
        command: async () => {
            const loader = new FileLoader();
            const doc = await loader.snoteDoc;
            snoteDoc = new snoteDocumentLoader(doc);
        }
    },
    {
        icon: 'save',
        title: 'Sauvegarder',
        command: () => {
            snoteDoc.save();
        }
    },
    {
        icon: 'cloud_download',
        title: 'Sauvegarder en .snote',
        command: () => {}
    }
].forEach(e => {
    controls
        .child('span')
        .addClass('material-icons')
        .attr('title', e.title || '')
        .text(e.icon)
        .click(() => {
            e.command();
        });
});

const flipper: ExtJsObject = workspace.child('div').addClass('flip')
    .html(`<i class="material-icons">
                flip
            </i>`);

new RichTextBox();
