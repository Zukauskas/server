const utils = {};

utils.fileExtension = (url) => {
    // '' -> ''
    // 'css/main.css' -> 'css'
    // 'js/main.js' -> 'js'
    // 'favicon.ico' -> 'ico'
    // 'css/fontAwesome.min.css' -> 'css'
    // 'css/main.js?v=2' -> 'js'

    const parts = url.split('?')[0].split('.');
    return parts.length === 1 ? '' : parts.at(-1);
}

export { utils }