/**
 * Checks if SNotes acts as a website or as an app
 */
export default function isNodeEnv() {
    return 'process' in window ? true : false;
}
