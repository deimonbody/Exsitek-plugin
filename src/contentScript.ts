import { dictionary } from './common/data';
import { isMatch } from './helper/isMathc.helper';
import { popupChanges } from './helper/popup.helper';

window.onload =   () => {
    const allElements = [
        ...document.querySelectorAll('input'),
        ...document.querySelectorAll('textarea'),
        ...document.querySelectorAll('div[contenteditable="true"]'),
    ]
    const matchWords: string[] = Object.keys(dictionary);
    let activeItemID = 0;
    let activeVariants: NodeListOf<Element> | null = null;
    
    const onChangeHandler = async (
        elem: HTMLInputElement,
        isDiv:boolean,
        e: Event
    ) => {
        const value = isDiv ? elem.textContent as string : (e.target as HTMLInputElement).value;
        const words = value.split(' ');
        const wordToChange = words[words.length - 1];
        if (isMatch(wordToChange, matchWords)) {
            const choseChange = (value: string) => {
                container.remove();
                words.pop();
                words.push(value);
                if(isDiv){
                    elem.textContent = words.join(' ');
                }else{
                    elem.value = words.join(' ');
                    elem.focus();
                }
                
                activeItemID = 0;
                document.removeEventListener(
                    'keydown',
                    directVariants
                );
            };
            const {container,wordsContainerElements} = await popupChanges({
                prevText: wordToChange,
                replacments: dictionary[wordToChange],
                choseChange,
                activeItemID,
            });
            activeVariants = wordsContainerElements;
            document.addEventListener('keydown', directVariants);
            document.body.appendChild(container);
            
        } else {
            const container = document.querySelector('.popup-change');
            if (container) {
                container.remove();
                activeItemID = 0;
            }
        }
    };

    allElements.forEach(elem => {
        if(elem.tagName == 'DIV'){
            elem.addEventListener('input', onChangeHandler.bind(this,elem as HTMLInputElement ,true));
        }else{
            elem.addEventListener('input', onChangeHandler.bind(this,elem as HTMLInputElement,false));
        }
       
    });
  
    const directVariants = (e:KeyboardEvent) => {
        if (e.key === 'ArrowUp' && activeVariants) {
            activeItemID -= 1;
            if (activeItemID < 0) activeItemID = activeVariants.length - 1;
            activeVariants.forEach((variant) => {
                variant.classList.remove('selected');
            });
            activeVariants.forEach((variant, index) => {
                if (index === activeItemID) {
                    variant.classList.add('selected');
                }
            });
        }
        if (e.key === 'ArrowDown' && activeVariants) {
            activeItemID += 1;
            if (activeItemID > activeVariants.length - 1) activeItemID = 0;
    
            activeVariants.forEach((variant) => {
                variant.classList.remove('selected');
            });
    
            activeVariants.forEach((variant, index) => {
                if (index === activeItemID) {
                    variant.classList.add('selected');
                }
            });
        }
    };
};
