import { IMatchResult } from "../common/types";

export const matchWord = (currentWord: string,matchWords:string[]): boolean => {
    return matchWords.some((matchWord) => matchWord === currentWord);
};

export const isMatch = (inputWords: string[],matchWords:string[])=>{
    let result:IMatchResult = {};
    inputWords.forEach((word,index)=>{
        if(word === '' &&  matchWord(inputWords[index-1],matchWords) && Object.keys(result).length === 0){
            result = {
                spaceIndex:index,
                wordIndex:index-1,
                wordToChange:inputWords[index-1]
            };
        }
    })
    return result;
}