import { $, ExtJsObject } from '../extjs';
import '../../style/main/explorer.scss';
import FS from '../filesystem';
export default class explorer {
    private onchange: (filePath: string) => void;
    private e: ExtJsObject;
    constructor(parent: ExtJsObject) {
        let e = parent.child('div');
        e.addClass('fileExplorer');
        this.e = e;
    }

    public async load(dir: string = '${os.dir}') {
        this.onchange(dir + '/');
        let content = [[dir + '/..', 'true'], ...(await FS.readDir(dir))];
        this.e.html('');
        content.forEach(file => {
            let name = file[0].split(/\\|\//g).pop();
            this.e
                .child('button')
                .html(name == '..' ? '<b>Retour</b>' : name)
                .addClass(file[1] == 'true' ? 'directory' : 'file')
                .click(() => {
                    if (file[1] == 'true') this.load(file[0]);
                });
        });
    }

    public change(callback: (filePath: string) => void) {
        this.onchange = callback;
    }
}
