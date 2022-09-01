export interface IDictinary {
    [key:string]:string[];
}
export interface IAtrribute {
    key:string;
    value:string;
}
export interface ICreateElement {
    tagName: string;
    classList?: string;
    attributes?: IAtrribute[];
}

export interface IPopUp {
    prevText: string;
    replacments: string[];
    choseChange: (word: string) => void;
    activeItemID: number;
    cursorPosition:ICursorPointer
}

export interface IMatchResult {
    spaceIndex?:number,
    wordIndex?:number,
    wordToChange?:string;
}

export interface ICursorPointer {
    x:number;
    y:number;
}