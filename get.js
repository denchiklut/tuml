export const get = (obj, path) => {
    const keys = path.split('.');
    // @ts-ignore
    return keys.reduce((result, key) => result[key], obj);
}
