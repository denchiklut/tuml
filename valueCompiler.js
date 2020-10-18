import { get } from "./get.js";

const TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;

export function valueCompiler(template, ctx) {
    let tmpl = template;
    let key = null;

    while ((key = TEMPLATE_REGEXP.exec(template))) {
        if (key[1]) {
            const tmplValue = key[1].trim();
            // get — функция, написанная нами выше
            const data = get(ctx, tmplValue);

            if (typeof data === "function") {
                window[tmplValue] = data;
                tmpl = tmpl.replace(
                    new RegExp(key[0], "gi"),
                    `window.${key[1].trim()}()`
                );
                continue;
            }

            tmpl = tmpl.replace(new RegExp(key[0], "gi"), data);
        }
    }

    if (TEMPLATE_REGEXP.test(tmpl)) {
        return valueCompiler(tmpl, ctx);
    }
    return tmpl;
}
