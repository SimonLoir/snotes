import NoteObject from './object';
import { ExtJsObject } from '../tools/extjs';

class noteObjectsManager {
    private objects: any[] = [];

    constructor() {}

    public set object(object: any) {
        this.objects.push(object);
    }

    public loadFor(e: ExtJsObject) {
        this.objects.forEach((object) => {
            e.children('.' + object.className).forEach(function() {
                const obj: NoteObject = new object();
                obj.buildFrom(this);
            });
        });
    }
}

export const noteObjManager = new noteObjectsManager();
