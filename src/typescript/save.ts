import { $ } from './extjs';
import toggleStartScreen from './startscreen';
import FS from './filesystem';
import { tmp } from './docview';
import Popup, { buildInput } from './popup';
let dir: string = undefined;
$('#menu-save').click(() => {
    save();
});
$('body').keydown((e: KeyboardEvent) => {
    if (e.keyCode == 83 && e.ctrlKey == true) {
        save();
    }
});
export function getSaveText(text: string) {
    return text;
}
export default function save() {
    if ($('#doc_location').text() == '') dir = undefined;
    else dir = $('#doc_location').text();

    toggleStartScreen();
    $('#ss-message').text('Sauvegarde');
    setTimeout(async () => {
        let content = '';
        let notes = $('#notes .rich-textarea');
        let images = $('#docs img');
        notes.forEach(i => {
            content += `[img]${images
                .only(i)
                .attr('src')}[end_img]${getSaveText(
                notes.only(i).html()
            )}::end_content--snotes:content.end`;
        });

        while (dir == undefined && dir != '-1') {
            let p = new Popup();
            p.content.child('h2').text('Sauvegarder sous');

            let directory = buildInput(
                p.content,
                'Chemin du fichier',
                'text',
                'C:\\Users\\simon\\Desktop\\1.snote'
            );
            let save = p.content.child('button').text('Sauvegarder ici');
            let cancel = p.content.child('button').text('Annuler');
            let x = new Promise((resolve: (data: string) => void) => {
                save.click(() => {
                    resolve(directory.value());
                });
                cancel.click(() => {
                    resolve('-1');
                });
            });
            let new_dir = await x;

            dir = new_dir != '' ? new_dir : undefined;
            p.m.click();
        }

        if (dir == '-1') {
            dir = undefined;
            return toggleStartScreen();
        }

        $('#doc_location').text(dir ? dir : '');

        FS.writeFile(dir, content).then(() => {
            toggleStartScreen();
        });
    }, 200);
}
