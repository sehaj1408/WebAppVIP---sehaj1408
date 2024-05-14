let languageSelectorButton = document.getElementById("languageSelectorButton")
let languageSelectorModal = document.getElementById("languageSelectorModal")
let languageSelectorApplyButton = document.getElementById("languageSelectorApplyButton")
let languageSelectorCancelButton = document.getElementById("languageSelectorCancelButton")

let languageSelectorInput = document.getElementById("languageSelectorInput")

let languageSelectorContent = document.getElementById("languageSelectorContent")

function closeLanguageSelectorModal(){
    languageSelectorModal.style.display = "none"
    languageSelectorButton.style.backgroundColor = ""
}

function openLanguageSelectorModal(){
    languageSelectorModal.style.display = ""
    languageSelectorButton.style.backgroundColor = "var(--selected-navbar-list-button-color)"
    languageSelectPopulator()
    let translationSelectionFromLocalStorage = localStorage.getItem("selectedTranslation")
    if (translationSelectionFromLocalStorage == null){
        localStorage.setItem('selectedTranslation', '')
    }else if (translationSelectionFromLocalStorage != ''){
        languageSelectorInput.value = translationSelectionFromLocalStorage
    }
    if (languageSelectorInput.value != "" || languageSelectorInput.value == "Select Language"){
        disableApplyButton()
    }else{
        enableApplyButton()
    }
}

languageSelectorModal.style.display = "none"

languageSelectorButton.addEventListener("click", openLanguageSelectorModal)

languageSelectorCancelButton.addEventListener("click", ()=>{
    closeLanguageSelectorModal()
})

languageSelectorApplyButton.addEventListener("click", ()=>{
    applyTranslation()
    closeLanguageSelectorModal()
})

languageSelectorModal.addEventListener("click", (event)=>{
    if (event.target == languageSelectorModal){
        closeLanguageSelectorModal()
    }
})

function applyTranslation(){
    //debugger;
    try{
      const event = new Event("change");
      let googleTranslateElement = document.getElementById("google_translate_element")
      let googleTranslateSelect = googleTranslateElement.children[0].children[0].children[0]

      googleTranslateSelect.value = languageSelectorInput.value

      localStorage.setItem('selectedTranslation', languageSelectorInput.value)
      googleTranslateSelect.dispatchEvent(event);
    }catch{
      return
    }

    
    
}

function languageSelectPopulator() {
  try{
    let googleTranslateElement = document.getElementById("google_translate_element")
    let googleTranslateSelect = googleTranslateElement.children[0].children[0].children[0]
    languageSelectorInput.innerHTML = googleTranslateSelect.innerHTML
  }catch{
    return
  }
}

function enableApplyButton(){
    languageSelectorApplyButton.disabled = false;
    languageSelectorApplyButton.classList.remove('disabledApply'); 
    languageSelectorApplyButton.classList.add('enabledApply'); 

}

function disableApplyButton(){
    languageSelectorApplyButton.disabled = true;
    languageSelectorApplyButton.classList.remove('enabledApply'); 
    languageSelectorApplyButton.classList.add('disabledApply'); 
}

document.addEventListener('DOMContentLoaded', async ()=> {
    let googleTranslateElement = document.getElementById("google_translate_element")
    while (googleTranslateElement.innerHTML = ""){
        await delay(500)
    }
    let translationSelectionFromLocalStorage = localStorage.getItem("selectedTranslation")
    if (translationSelectionFromLocalStorage == null){
        //
    }else if (translationSelectionFromLocalStorage != ''){
        languageSelectorInput.value = translationSelectionFromLocalStorage
        applyTranslation()
    }
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



window.addEventListener('load', languageSelectPopulator)
languageSelectorInput.addEventListener('change', ()=>{
    if (languageSelectorInput.value == ""){
        disableApplyButton()
    }else{
        enableApplyButton()
    }
})