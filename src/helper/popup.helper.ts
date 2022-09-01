import { IAtrribute, IPopUp } from '../common/types';
import { changeTheme, getTheme } from './color.helper';
import { createElement } from './dom.helper';

export const popupChanges = async ({
    prevText,
    replacments,
    choseChange,
    activeItemID,
    cursorPosition
}: IPopUp) => {
   
    const container = createElement({tagName: 'div',classList: 'popup-change'});
    const title = createElement({ tagName: 'p', classList: 'popup-title' });
    const firstChangeColor = createElement({ tagName: 'div', classList: 'changeColorBlock first-changeColor',attributes:[{key:'chng-theme',value:"popup-color-theme-red"}] });
    const secondChangeColor = createElement({ tagName: 'div', classList: 'changeColorBlock second-changeColor' ,attributes:[{key:'chng-theme',value:"popup-color-theme-purple"}] });
    const thirdChangeColor = createElement({ tagName: 'div', classList: 'changeColorBlock third-changeColor',attributes:[{key:'chng-theme',value:"popup-color-theme-black"}] });
    
    const theme = await getTheme() as undefined | string;
   
    

    const wordsContainer = createElement({
        tagName: 'ul',
        classList: 'words-container',
    });
   
    replacments.forEach((word, index) => {
        const attribute: IAtrribute = {
            key: 'change-number',
            value: `${index}`,
        };
        const changeWord = createElement({
            tagName: 'li',
            classList: 'changeWordVariant',
            attributes: [attribute],
        });
        changeWord.textContent = word;
        index === activeItemID ? changeWord.classList.add('selected') : null;
        changeWord.addEventListener('click', e => choseChange(word));
        wordsContainer.appendChild(changeWord);
    });
    
    firstChangeColor.addEventListener('click',changeTheme.bind(this,firstChangeColor.getAttribute('chng-theme') as string));
    secondChangeColor.addEventListener('click',changeTheme.bind(this,secondChangeColor.getAttribute('chng-theme') as string));
    thirdChangeColor.addEventListener('click',changeTheme.bind(this,thirdChangeColor.getAttribute('chng-theme') as string));
    
    if(theme == undefined){
        container.classList.add('popup-color-theme-purple');
    }else{
        container.classList.add(theme);
    }

    title.textContent = `Change word ${prevText} to:`;
    
    container.appendChild(title);
    container.appendChild(firstChangeColor);
    container.appendChild(secondChangeColor);
    container.appendChild(thirdChangeColor);
    container.appendChild(wordsContainer);
    container.style.top = `${cursorPosition.y}px`;
    container.style.left = `${cursorPosition.x}px`;

    return {
        container,
        wordsContainerElements:wordsContainer.querySelectorAll('.changeWordVariant')
    };
};
