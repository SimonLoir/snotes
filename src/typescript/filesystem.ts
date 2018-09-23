import { AR } from './extjs';
import { isRegExp } from 'util';
import env from './env';

let fs: any;
let dir: string = '';

if (env() == true) {
    fs = require('fs');
    dir = require('os').homedir();
}

export default class FS {
    public static readFile(file: string) {
        return new Promise((resolve: (data: string) => void, reject) => {
            console.log('read');
            file = file.replace('${os.dir}', dir);
            if (fs == undefined) {
                resolve(localStorage.getItem(file));
            } else {
                fs.readFile(file, 'utf8', (err: string, data: string) => {
                    if (err) throw err;
                    resolve(data);
                });
            }
        });
    }

    public static writeFile(file: string, content: string) {
        console.log('write', fs);
        return new Promise((resolve: (data?: string) => void, reject) => {
            file = file.replace('${os.dir}', dir);
            if (fs == undefined) {
                console.log('written', localStorage.setItem(file, content));
                console.log('ok');
                resolve();
            } else {
                let path = require('path');
                let dirname = path.dirname(file);
                if (!fs.existsSync(dirname)) fs.mkdirSync(dirname);
                fs.writeFile(
                    file,
                    content,
                    'utf8',
                    (err: string, data: string) => {
                        if (err) throw err;
                        resolve(data);
                    }
                );
            }
        });
    }
}
