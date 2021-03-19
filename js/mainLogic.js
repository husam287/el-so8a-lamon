var changed=false ;
var trans1 = document.querySelector('#trans1');
var trans2 = document.querySelector('#trans2');
var translateButton = document.querySelector("#translateButton");
var changeButton = document.querySelector('#changeButton');
var buttonToCopy = document.querySelector('#buttonToCopy');
var textarea2 = document.querySelector('#textarea2');
var textarea1 = document.querySelector('#textarea1');
var copyText = document.querySelector('#copyText');


window.addEventListener('load',function () {
    let ele = document.querySelector('#textarea1');
    ele.focus();
})



translateButton.addEventListener('click',write);
changeButton.addEventListener('click',changer);
buttonToCopy.addEventListener('click',copy)

function write() {


    let text1 = textarea1;
    let text2 = textarea2;



    if(text1.value.length > 5000 ) {
        alert("Your text is more than 5000 char")
        return 0;
    }
    
    
    if(!isArabic(text1.value)){
        alert("أكتب عربي يسطا.");
        return 0;
    }
    

    if(!changed) text2.value = translateToArabic(text1.value)
    else text2.value = translateToLamon(text1.value)

    
}
function copy(){
    textarea2.disabled=false;
    textarea2.select();
    textarea2.setSelectionRange(0, 99999)
    document.execCommand("copy");
    textarea2.disabled=true;

    copyText.classList.remove('d-none');
    setTimeout(() => {

    copyText.classList.add('d-none');
        
    }, 1000);

}

function changer(){
    
    changed=!changed;
    console.log(changed)
    let temp = trans1.innerHTML;
    trans1.innerHTML=trans2.innerHTML;
    trans2.innerHTML=temp;

}

function translateToLamon(text="") {
    let words = text.split(' ');
    let translatedWords=[];
    let wordsDic = ["نا","عب","فرن","لمون","قمل","حسام","خزين","جميل","سمير","انا","مين"];

    String.prototype.replaceAt=function(index, char) {
        var a = this.split("");
        a[index] = char;
        return a.join("");
    }

    for (let i = 0; i < words.length; i++) {
        let theChar ='';
        if(words[i][0]==='ا' && words[i][1]==='ل'){
            theChar = words[i][2];
            words[i]=words[i].replaceAt(2, 'س')
        }
        else{
            theChar = words[i][0];
            words[i]=words[i].replaceAt(0, 'س')
        }

        translatedWords.push(words[i]);
        let randNumber = (Math.random()*10).toFixed(0);
        translatedWords.push(wordsDic[randNumber].replaceAt(0,theChar));

    }
    
    return translatedWords.join(' ');

}

function isArabic (text="") {
    let arabic = /[\u0600-\u06FF]/;
    let symbols = /[$-/:-?{-~!"^_`\[\]]/;

    for (let index = 0; index < text.length; index++) {
        if( !arabic.test(text[index]) && 
            text[index]!==' ' &&
            text[index]!=='\n'&& 
            !symbols.test(text[index]) )
        {
            return 0;
        }    
    }
    return 1;
}


function translateToArabic(text="") {

    let words = text.split(' ');
    let translatedWords=[];

    String.prototype.replaceAt=function(index, char) {
        var a = this.split("");
        a[index] = char;
        return a.join("");
    }
    
    for (let i = 0; i < words.length-1; i+=2) {

        if(words[i][0]==='ا' && words[i][1]==='ل')
            words[i]=words[i].replaceAt(2, words[i+1][0])
        else
        words[i]=words[i].replaceAt(0, words[i+1][0])

        translatedWords.push(words[i]);
        
    }
    
    return translatedWords.join(' ');
}

