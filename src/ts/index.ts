import FileLoader from './loader/file.loader';
import '../scss/index.scss';
import { $, ExtJsObject } from './tools/extjs';
import snoteDocumentLoader from './loader/snote.loader';
import RichTextBox from './richtextbox';
import { saveJSONAsFile } from './tools/save';
const workspace = $('body')
    .child('div')
    .addClass('workspace');

const controls = workspace.child('div').addClass('controls');
const slides = workspace.child('div').addClass('slides');
const welcome_wrapper = slides.child('div').addClass('welcome-wrapper');
welcome_wrapper.child('img').attr('src', 'images/working.svg');
welcome_wrapper.child('span').text('Bienvenue sur SNote !');
welcome_wrapper
    .child('p')
    .text('Ouvrez un PDF ou un fichier SNote 2.0 pour commencer ☺');

let snoteDoc: snoteDocumentLoader;

[
    {
        icon: 'note_add',
        title: 'Charger un document',
        command: async () => {
            const loader = new FileLoader();
            const doc = await loader.snoteDoc;
            snoteDoc = new snoteDocumentLoader(doc);
        },
    },
    {
        icon: 'save',
        title: 'Sauvegarder',
        command: () => {
            if (snoteDoc == undefined)
                return alert('Aucun document à sauvegarder');
            snoteDoc.save();
        },
    },
    {
        icon: 'cloud_download',
        title: 'Sauvegarder en .snote',
        command: () => {
            if (snoteDoc == undefined)
                return alert('Aucun document à sauvegarder');
            saveJSONAsFile(snoteDoc.save(), 'note.snote');
        },
    },
].forEach((e) => {
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
new RichTextBox(
    `<h2>Titre de niveau 2</h2><div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vulputate sed diam vitae maximus. Nam vestibulum elementum orci non dignissim. Vivamus sed rhoncus diam. Cras tincidunt lectus finibus libero vestibulum pulvinar. Praesent ut mi a nunc vulputate tempus volutpat at tellus. Donec eget lectus in lacus porta consectetur ut non justo. Donec ac nunc ex. Duis aliquam vel odio et ornare. Ut risus mi, eleifend at pellentesque dictum, sollicitudin in odio. Ut ex mauris, pretium eu magna ut, finibus rhoncus orci. Sed et nisi a massa efficitur pretium et ac ipsum. Vivamus odio tortor, molestie eget sem eget, <u>finibus</u> <i>venenatis</i> <b>ligula</b>. Praesent in erat ac risus sagittis ultricies. Curabitur molestie porta est eget placerat.</div><div><br></div><div>Sed lorem quam, egestas et nunc nec, volutpat laoreet orci. Curabitur facilisis ante sit amet facilisis semper. Sed vitae mi ac turpis fringilla commodo. Pellentesque sit amet nibh leo. Aliquam eget risus id mauris convallis iaculis. Nam eros ipsum, porttitor vitae vulputate suscipit, tempor in felis. Nullam hendrerit risus eu nibh dignissim, et dapibus tortor porta. Aliquam condimentum est velit, a rutrum leo tincidunt quis. Fusce id est ante. In fringilla orci nunc, vitae convallis augue luctus tristique.</div></div><div><ol><li>First list item</li><li>Second list item</li><li>Third list item</li></ol>this is a text<br></div><div><ul><li>ceci est un texte</li><ul><li>hello world</li><ul><li>coucou hibou</li></ul></ul></ul></div><div><br></div>`
);
//test- ok
/*
document.body.addEventListener('contextmenu', e => {
    alert('ok');
    e.preventDefault();
});*/
