import { $ } from '../extjs';
import FS from '../filesystem';
import pdf2Base64Array from '../pdf2png';
import env from '../env';
import toggleStartScreen from '../startscreen';
export const tmp = '${os.dir}/.snote/.tmp';
export default class docview {
    constructor() {
        $('#docs').get(0).ondrop = async (e: DragEvent) => {
            e.stopPropagation();
            e.preventDefault();
            var files = e.dataTransfer.items; // Array of all files
            let file = files[0].getAsFile();
            this.openDoc(file);
        };

        $('#docs button').click(() => {
            let i = $('body')
                .child('input')
                .change(() => {
                    this.openDoc(i.get(0).files[0]);
                })
                .attr('type', 'file');
            i.click();
        });
    }

    private openDoc(base_file: any) {
        let file = URL.createObjectURL(base_file);
        return new Promise(resolve => {
            let ext = base_file.name.split('.').reverse()[0];
            console.log(ext);
            let getDoc;
            if (ext == 'pdf') getDoc = this.openPDF(file);
            if (ext == 'snote') getDoc = this.openSDoc(file);
            getDoc.then(() => {
                this.loadFromTmp();
            });
        });
    }

    private async loadFromTmp() {
        let file = await FS.readFile(tmp);
        let images = file.split('\n');
        $('#ss-message').text(`Loaded ${images.length} images`);
        $('#docs').html('');
        images.forEach(image => {
            $('#docs')
                .child('img')
                .attr('src', image);
            $('#notes')
                .child('div')
                .addClass('rich-textarea')
                .attr('spellcheck', 'true')
                .attr('contenteditable', 'true')
                .css('display', 'none');
        });
        $('#notes .rich-textarea')
            .only(0)
            .css('display', 'block');
        $('#docs img')
            .only(0)
            .addClass('visible');
        let controls = $('#docs')
            .child('div')
            .addClass('controls');
        let i = 0;
        let previous = controls.child('button').html('&#8592;');
        let page = controls.child('span');
        let next = controls.child('button').html('&#8594;');
        const update = () => {
            page.text(`Page ${i + 1} / ${images.length}`);
            if (!$('#docs img').exists(i)) return;
            $('#docs img.visible').removeClass('visible');
            $('#notes .rich-textarea').css('display', 'none');
            $('#notes .rich-textarea')
                .only(i)
                .css('display', 'block');
            $('#docs img')
                .only(i)
                .addClass('visible');
        };
        previous.click(() => {
            i--;
            if (i < 0) i = 0;
            update();
        });
        next.click(() => {
            i++;
            if (i >= images.length) i = images.length - 1;
            update();
        });
        update();
        toggleStartScreen();
    }

    private async openSDoc(file: any) {
        toggleStartScreen();
        $('#ss-message').text('Ouverture du fichier');
        return new Promise(async resolve => {
            let reader = new FileReader();
            reader.addEventListener('loadend', (e: any) => {
                /**
                 * [img]${images.only(i).attr('src')}[end_img]${notes
                .only(i)
                .text()}::end_content--snotes:content.end
                 */
                let content: string = e.srcElement.result;
                let c = content.split('::end_content--snotes:content.end');
                c.forEach(part => {
                    console.log(part.split('[end_img]')[1]);
                });
            });
            reader.readAsText(await fetch(file).then(r => r.blob()));
        });
    }

    private async openPDF(file: string) {
        toggleStartScreen();
        $('#ss-message').text('Conversion du PDF');
        return new Promise(async resolve => {
            let images = await pdf2Base64Array(file);

            console.log(images);

            FS.writeFile(tmp, images.join('\n')).then(() => {
                console.log('saved to temp directory');
                resolve();
                $('#ss-message').text('Disponible le répertoire temporaire');
            });
        });
    }
}
