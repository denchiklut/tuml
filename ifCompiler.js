const IF_REGEXP = /\*if=\{\{(.*?)\}\}/gi;

export function ifCompiler(template, ctx) {
    let tmpl = template;
    let ifKey = null;

    while ((ifKey = IF_REGEXP.exec(tmpl))) {
        const _k = ifKey[1].trim();
        const _v = ctx[_k];

        const tempIdx = tmpl.slice(0, ifKey.index).split("").reverse().indexOf("<");
        const left = tmpl.slice(0, ifKey.index).split("").reverse();
        left.splice(tempIdx + 1, 0, "<!-- ");

        const tag = /(<([^>]+)>)/i;
        const right = tmpl.slice(ifKey.index + ifKey[0].length);
        const endIdx = right.match(tag);
        const _right = right.split("");
        _right.splice(endIdx.index + endIdx[0].length, 0, " -->");

        if (_v) {
            tmpl = left.reverse().join("") + _right.join("");
        }
    }

    return tmpl;
}
