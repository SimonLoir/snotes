/**
 * Specifies if teh app is running under nodejs
 */
export default function env(): boolean {
    //@ts-ignore
    return window.process ? true : false;
}
