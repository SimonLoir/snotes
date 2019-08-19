import { $ } from '../extjs';
import pdf2SVG from '../pdf2png';
import toggleStartScreen from '../startscreen';
import Notes from '../notes';
import { loadGraph } from '../notes/math';
export const tmp = '${os.dir}/.snote/.tmp';

$('#menu-open-from-scloud').click(() => {
    return alert("SCloud n'est pas encore disponible :-(");
    //$('#doc_location').text('scloud://');
    let w = window.open('scloud/');
    w.addEventListener('hashchange', e => {
        let xhash = w.location.hash;
        xhash = xhash.replace('#', '');
    });
});

export default class docview {
    private images: string[] = [];
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
            let getDoc;
            if (ext == 'pdf') getDoc = this.openPDF(file);
            if (ext == 'snote') getDoc = this.openSDoc(file);
            getDoc.then((data: any) => {
                this.loadFromTmpAndFromData(data);
                if (ext == 'snote' && base_file.path != undefined)
                    //@ts-ignore
                    $('#doc_location').text(base_file.path);
            });
        });
    }

    private async loadFromTmpAndFromData(data: string[]) {
        let images = this.images;

        $('#ss-message').text(`Loaded ${images.length} images`);

        $('#docs').html('');

        images.forEach((image, i) => {
            $('#docs')
                .child('div')
                .addClass('xsvg')
                .html(image);

            new Notes(data ? data[i] : '');
        });

        $('#notes .rich-textarea')
            .only(0)
            .css('display', 'block');

        $('#docs svg')
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

            if (!$('#docs svg').exists(i)) return;

            $('#docs svg.visible').removeClass('visible');

            $('#notes .rich-textarea').css('display', 'none');

            $('#notes .rich-textarea')
                .only(i)
                .css('display', 'block')
                .children('canvas')
                .forEach(function() {
                    loadGraph($(this));
                });

            $('#docs svg')
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

        let xi = 0;

        return new Promise(async (resolve: any) => {
            let reader = new FileReader();

            reader.addEventListener('load', e => {
                console.log(e);
            });

            reader.addEventListener('loadend', async (e: any) => {
                let content: string = e.srcElement.result;

                let c = content.split('<!--snotes.slide.separator-->');

                c.pop();

                let imgs: string[] = [];
                let texts: string[] = [];

                const showProgress = () => {
                    $('#ss-message').text(
                        `Lecture du fichier et préparation à l'affichage ${(xi *
                            100) /
                            c.length}%`
                    );
                };
                c.forEach(e => {
                    let spl = e.split('<!--snotes.content.separator-->');
                    imgs.push(spl[0]);
                    texts.push(spl[1]);
                    xi++;
                    showProgress();
                });

                this.images = imgs;

                resolve(texts);
            });

            let xfile = await fetch(file).then(r => r.blob());

            $('#ss-message').text('Fichier téléchargé - Lecture');

            reader.readAsText(xfile);
        });
    }

    private async openPDF(file: string) {
        toggleStartScreen();

        $('#ss-message').text('Conversion du PDF');

        return new Promise(async resolve => {
            let images = await pdf2SVG(file);
            this.images = images;
            resolve(images.map(e => ''));
        });
    }
}
