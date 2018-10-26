import { $ } from './extjs';
import toggleStartScreen from './startscreen';
import FS from './filesystem';
import { tmp } from './docview';
import Popup, { buildInput } from './popup';
import explorer from './file_explorer/explorer';
import env from './env';
let dir: string = undefined;
$('#menu-save').click(() => {
    save();
});
$('body').keydown((e: KeyboardEvent) => {
    if (e.keyCode == 83 && e.ctrlKey == true) {
        e.preventDefault();
        save();
    }
});
export function getSaveText(text: string) {
    return text;
}

let is_saving = false;

export default function save() {
    if (is_saving == true) return;
    is_saving = true;
    if ($('#doc_location').text() == '') dir = undefined;
    else dir = $('#doc_location').text();

    toggleStartScreen();

    $('canvas').forEach(function() {
        let canvas: HTMLCanvasElement = this;
        $(canvas).attr('data-url', '');
    });
    let content = '';
    let notes = $('#notes .rich-textarea');
    let images = $('#docs .xsvg');
    notes.forEach(i => {
        content += `${images
            .only(i)
            .html()}<!--snotes.content.separator-->${notes
            .only(i)
            .html()}<!--snotes.slide.separator-->`;
    });

    if (env() != true) {
        let b = new Blob([content]);
        let url = URL.createObjectURL(b);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'document.snote';
        a.click();
        is_saving = false;
        return toggleStartScreen();
    }

    $('#ss-message').text('Sauvegarde');
    setTimeout(async () => {
        while (dir == undefined && dir != '-1') {
            let p = new Popup();
            p.content.child('h2').text('Sauvegarder sous');

            let directory = buildInput(
                p.content,
                'Chemin du fichier',
                'text',
                'C:\\Users\\simon\\Desktop\\1.snote'
            );
            directory.parent('.field').css('display', 'none');
            let file_name = buildInput(
                p.content,
                'Nom du fichier',
                'text',
                '1.snote'
            );
            file_name.keyup(() => {
                let dir = directory.value().split(/\\|\//g);
                dir.pop();
                directory.value(dir.join('/') + '/' + file_name.value());
            });

            let fileExplorer = new explorer(p.content);
            fileExplorer.change(folder => {
                directory.value(folder + file_name.value());
            });
            fileExplorer.load();

            let save = p.content.child('button').text('Sauvegarder ici');
            let cancel = p.content.child('button').text('Annuler');
            let x = new Promise((resolve: (data: string) => void) => {
                save.click(() => {
                    resolve(directory.value());
                });
                cancel.click(() => {
                    resolve('-1');
                });
                p.m.click(() => cancel.click());
            });
            let new_dir = await x;

            dir = new_dir != '' ? new_dir : undefined;
            p.m.click();
        }

        if (dir == '-1') {
            dir = undefined;
            is_saving = false;
            return toggleStartScreen();
        }

        $('#doc_location').text(dir ? dir : '');

        FS.writeFile(dir, content)
            .then(() => {
                toggleStartScreen();
                is_saving = false;
            })
            .catch(e => {
                alert(e);
                toggleStartScreen();
                is_saving = false;
            });
    }, 200);
}
