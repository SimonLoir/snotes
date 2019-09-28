import FileLoader from './loader/file.loader';
import '../scss/index.scss';
import { $, ExtJsObject } from './tools/extjs';
import snoteDocumentLoader from './loader/snote.loader';
import RichTextBox from './richtextbox';
import { saveJSONAsFile } from './tools/save';
import isNodeEnv from './tools/env';
const workspace = $('body')
    .child('div')
    .addClass('workspace');

const controls = workspace.child('div').addClass('controls');
const slides = workspace.child('div').addClass('slides');
const welcome_wrapper = slides.child('div').addClass('welcome-wrapper');
welcome_wrapper.child('img').attr('src', 'images/working.svg');
welcome_wrapper.child('span').text('Bienvenue sur SNotes !');
welcome_wrapper
    .child('p')
    .text('Ouvrez un PDF ou un fichier SNotes 2.0 pour commencer ☺');

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

            if (!isNodeEnv())
                return alert(
                    `Désolé, la fonction sauvegarder n'est pas disponible ici mais vous pouvez toujours utiliser l'option télécharger (icone suivante)`
                );

            console.log('s');
            console.log(require('fs'));

            if (!snoteDoc.doc.file_path) {
                //@ts-ignore
                snoteDoc.doc.file_path = window.saveDialog();
            }

            if (snoteDoc.doc.file_path)
                require('fs').writeFileSync(
                    snoteDoc.doc.file_path,
                    JSON.stringify(snoteDoc.save()),
                    'utf8'
                );
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

const flipper_html_element: HTMLDivElement = flipper.get(0);
let down = false;
let startX: number;
let startWidth: number;

const mouseDown = (e: MouseEvent) => {
    const w = window.getComputedStyle(workspace.get(0)).width;
    const w2 = window.getComputedStyle($('.rich-textarea').get(0)).width;
    startWidth = parseFloat(w.replace('px', ''));
    startX = e.pageX;
    down = true;
};

flipper_html_element.addEventListener('mousedown', mouseDown);

const updateWidth = (e: MouseEvent) => {
    if (!down) return;
    const delta = e.pageX - startX;
    const pageWidth = parseFloat(
        window.getComputedStyle(document.body).width.replace('px', '')
    );
    const leftWidth = Math.min(
        Math.max(startWidth + delta, 200),
        pageWidth - 200
    );
    workspace.css('width', leftWidth + 'px');
    $('.rich-textarea').css('width', pageWidth - leftWidth - 1 + 'px');
};

window.addEventListener('mousemove', updateWidth);

export const updateSize = () => {
    startX = 0;
    //@ts-ignore
    mouseDown({ pageX: 0 });
    //@ts-ignore
    updateWidth({ pageX: 0 });
    down = false;
};

window.addEventListener('resize', updateSize);

window.addEventListener('mouseup', (e) => {
    down = false;
});
new RichTextBox(
    `<h2>SNotes 2.0</h2><div>Bienvenue sur SNotes ! SNotes c'est un logiciel de prise de notes qui est entièrement <i>gratuit</i>. Pas d'abonnement, pas d'achat, toutes les fonctionnalités sont gratuites et le resteront 😎</div><div><br></div><h2>Quoi de neuf en version 2 ?</h2><div>La version 2 de SNotes vient avec le format de prise de notes SNotes format v3. Les notes sont plus structurées au sein du fichier, ce qui rend le logiciel plus efficace lors de l'ouverture des fichiers .snote (ou .snotes, les deux sont valides).</div><div><br></div><div>Une interface plus agréable à utiliser est aussi au rendez-vous ! Le but est d'être efficace à 100% lors de la prise de notes 😁</div>`
);
//test- ok
/*
document.body.addEventListener('contextmenu', e => {
    alert('ok');
    e.preventDefault();
});*/
