export const getTheme =  async ()=>{
   return new Promise ((resolve)=>{
    chrome.storage.sync.get(['theme'],(result)=>{
       return resolve(result['theme']);
    })
   })
}

export const setTheme = (theme='popup-color-theme-purple')=>{
    chrome.storage.sync.set({'theme':theme});
    return theme;
}

export const changeTheme = (theme:string)=>{
    const popup = document.querySelector('.popup-change') as HTMLElement;
    if(popup){
        popup.classList.remove('popup-color-theme-black');
        popup.classList.remove('popup-color-theme-red');
        popup.classList.remove('popup-color-theme-purple');
        
        popup.classList.add(theme); 
        setTheme(theme);
    }
}