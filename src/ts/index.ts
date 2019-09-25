import FileLoader from './loader/file.loader';
import RichTextBox from './richtextbox';
import '../scss/index.scss'; // style must be loaded at the end so that it's used instead of default style
import { $ } from './tools/extjs';
$('body')
    .child('button')
    .text('Choisir un fichier')
    .click(async () => {
        const fload = new FileLoader();
        const doc = await fload.snoteDoc;
        console.log(doc);
    });

//new RichTextBox();
