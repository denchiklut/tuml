import { ifCompiler } from "./ifCompiler.js";
import { valueCompiler } from "./valueCompiler.js";

export function compileTemplate(template, ctx) {
    const tempIf = ifCompiler(template, ctx);
    const temp = valueCompiler(tempIf, ctx);

    return temp;
}

const result = compileTemplate(
    `
<div onClick="{{handleClick}}">
    {{ field1 }}
    <span *if={{show}}>{{field2}}</span>
    <span>{{ field3.info.name }}</span>
</div>`,
    {
        field1: "Text 1",
        field2: 42,
        show: true,
        field3: {
            info: {
                name: "Simon"
            }
        },
        handleClick: () => {
            console.log(document.body);
        }
    }
);

const root = document.getElementById('root')
root.innerHTML = result
console.log(result);
