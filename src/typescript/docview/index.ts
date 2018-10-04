import { $ } from '../extjs';
import FS from '../filesystem';
import pdf2Base64Array from '../pdf2png';
import env from '../env';
import toggleStartScreen from '../startscreen';
import Notes from '../notes';
import { loadGraph } from '../notes/math';
export const tmp = '${os.dir}/.snote/.tmp';
export default class docview {
    constructor() {
        $('#docs').get(0).ondrop = async (e: DragEvent) => {
            e.stopPropagation();
            e.preventDefault();
            if ($('#docs #open').count() == 0) return;
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
            getDoc.then((data: any) => {
                this.loadFromTmpAndFromData(data);
                //@ts-ignore
                if (ext == 'snote' && base_file.path != undefined)
                    //@ts-ignore
                    $('#doc_location').text(base_file.path);
            });
        });
    }

    private async loadFromTmpAndFromData(data: string[]) {
        let file = await FS.readFile(tmp);
        file = file.trim();
        let images = file.split('\n');
        $('#ss-message').text(`Loaded ${images.length} images`);
        $('#docs').html('');
        images.forEach((image, i) => {
            $('#docs')
                .child('img')
                .attr('src', image);

            new Notes(data ? data[i] : '');
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
                .css('display', 'block')
                .children('canvas')
                .forEach(function() {
                    loadGraph($(this));
                });
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
        return new Promise(async (resolve: any) => {
            let reader = new FileReader();
            reader.addEventListener('loadend', async (e: any) => {
                let content: string = e.srcElement.result;
                let c = content.split('::end_content--snotes:content.end');
                let imgs: string[] = [];
                let texts: string[] = [];
                c.forEach(part => {
                    let spl = part.split('[end_img]');
                    spl[0] = spl[0].replace('[img]', '');
                    imgs.push(spl[0]);
                    texts.push(spl[1]);
                });
                await this.saveImagesToTmp(imgs);
                resolve(texts);
            });
            reader.readAsText(await fetch(file).then(r => r.blob()));
        });
    }

    private async openPDF(file: string) {
        toggleStartScreen();
        $('#ss-message').text('Conversion du PDF');
        return new Promise(async resolve => {
            let images = await pdf2Base64Array(file);

            resolve(await this.saveImagesToTmp(images));

            console.log(images);
        });
    }

    private async saveImagesToTmp(images: string[]) {
        return new Promise(resolve => {
            FS.writeFile(tmp, images.join('\n')).then(() => {
                console.log('saved to temp directory');
                resolve();
                $('#ss-message').text('Disponible le répertoire temporaire');
            });
        });
    }
}
