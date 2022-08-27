import { ICreateElement } from "../common/types";


export const createElement = ({ tagName, classList, attributes }: ICreateElement) => {
    const el = document.createElement(tagName);
    if (classList) {
        const classStrings = classList.split(' ');
        classStrings.forEach((style)=>{
            el.classList.add(style);
        })
    }
    if(attributes){
        attributes.forEach((attr)=>{
            el.setAttribute(attr.key,attr.value);
        })
    }
    return el;
};
