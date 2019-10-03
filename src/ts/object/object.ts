export default class NoteObject {
    public static type = 'default_object';
    public static className = '';
    protected e: HTMLElement;
    public buildFrom(e: HTMLElement) {
        this.e = e;
        e.setAttribute('data-snote-object', '');
        this.build();
    }
    protected build(): void {
        throw 'Not implemented';
    }
}
