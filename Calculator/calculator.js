let runningTotal=0
let buffer="0"
let previousOperator=null

const section=document.querySelector('.section')

function buttonClick(value){
    if(isNaN(value)){
        //this is not a number
        handleSymbol(value)
    }else{
        //this is a number
        handleNumber(value)
    }
    section.innerText=buffer
}
function handleSymbol(symbol){
    console.log('handleSymbol',symbol);
    switch(symbol){
        case 'AC':
            buffer='0'
            runningTotal=0
            break;
        case'=':
         if(previousOperator===null){
            //need two numbers to do math
            return
         }
         flushOperation(parseInt(buffer))
         previousOperator=null
         buffer=runningTotal
         runningTotal=0
         break;
        case'+':
        case'-':
        case'×':
        case'÷':
            handleMath(symbol)
            break;
    }
}

function handleMath(symbol){
    if(buffer==='0'){
        //do nothing
        return
    }
    const intBuffer=/*or + */parseInt(buffer)
    if(runningTotal===0){
        runningTotal=intBuffer
        
    }else{
        flushOperation(intBuffer)
    }
    previousOperator=symbol

    buffer='0'
}

function flushOperation(intBuffer){
    if(previousOperator==='+'){
        runningTotal+=intBuffer
    }else if(runningTotal==='-'){
        runningTotal-=intBuffer
    }else if(previousOperator==='×'){
        runningTotal*=intBuffer
    }else{
        runningTotal/=intBuffer
    }
}
function handleNumber(numberString){
    if( buffer === "0"){
        buffer=numberString
    }else{
        buffer+=numberString
    }  
}


function init(){
    //wraps all the calc buttons
    document.querySelector('.Btns')
    .addEventListener('click',function(e){
        buttonClick(e.target.innerText)
    })
}

init()