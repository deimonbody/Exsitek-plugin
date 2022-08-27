export const isMatch = (currentWord: string,matchWords:string[]): boolean => {
    return matchWords.some((matchWord) => matchWord === currentWord);
};