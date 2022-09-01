import { dictionary } from './common/data';
import { ICursorPointer } from './common/types';
import { isMatch } from './helper/isMatch.helper';
import { popupChanges } from './helper/popup.helper';

window.onload = () => {
    const allElements = [
        ...document.querySelectorAll('input'),
        ...document.querySelectorAll('textarea'),
        ...document.querySelectorAll('div[contenteditable="true"]'),
    ];
    const matchWords: string[] = Object.keys(dictionary);
    let activeItemID = 0;
    let activeVariants: NodeListOf<Element> | null = null;
    let cursorPosition: ICursorPointer = {
        x: 0,
        y: 0,
    };
    const onChangeHandler = async (
        elem: HTMLInputElement,
        isDiv: boolean,
        e: Event
    ) => {
        const container = document.querySelector('.popup-change');
        if (container) {
            container.remove();
            activeItemID = 0;
        }
        const value = isDiv ? (elem.textContent as string) : (e.target as HTMLInputElement).value;
        const words = value.split(' ');
        let resultOfMatch = isMatch(words, matchWords);
        if (resultOfMatch?.wordIndex) {
            const choseChange = (value: string) => {
                words.splice(resultOfMatch.wordIndex as number,1,value);
                words.splice(resultOfMatch.spaceIndex as number,1);
                if (isDiv) {
                    elem.textContent = words.join(' ');
                } else {
                    elem.value = words.join(' ');
                    elem.focus();
                }

                activeItemID = 0;
                document.removeEventListener('keydown', directVariants);
                 container.remove();
            };
            const { container, wordsContainerElements } = await popupChanges({
                prevText: resultOfMatch.wordToChange as string,
                replacments: dictionary[resultOfMatch.wordToChange as string],
                choseChange,
                activeItemID,
                cursorPosition,
            });
            activeVariants = wordsContainerElements;
            document.addEventListener('keydown', directVariants);
            document.body.appendChild(container);
        }
    };

    allElements.forEach((elem) => {
        if (elem.tagName == 'DIV') {
            elem.addEventListener(
                'input',
                onChangeHandler.bind(this, elem as HTMLInputElement, true)
            );
        } else {
            elem.addEventListener(
                'input',
                onChangeHandler.bind(this, elem as HTMLInputElement, false)
            );
        }
    });

    const directVariants = (e: KeyboardEvent) => {
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

    document.addEventListener('mousemove', (e) => {
        cursorPosition.x = e.clientX;
        cursorPosition.y = e.clientY;
    });
};
