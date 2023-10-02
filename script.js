function add(a,b){
    return a + b
}
function substract(a,b){
    return a - b
}
function multiply(a,b){
    return a*b
}
function divide(a,b){
    return a/b
}
let num1=0
let num2=0
let operator=''
let calResult = 0
function operate(num1,num2,operator){
    if (operator=='+'){
        return add(num1,num2)
    }else if(operator=='-'){
        return substract(num1,num2)
    }else if(operator=='×'){
        return multiply(num1,num2)
    }else if(operator=='÷'){
        return divide(num1,num2)
    }
}

const numberPad = document.getElementsByClassName('numberPad')[0]
const numberButton = numberPad.querySelectorAll('button')
let result = document.getElementById('result')
const operatorPad = document.getElementsByClassName('operator')[0]
const operatorButton = operatorPad.querySelectorAll('button')
const progress = document.getElementById('progress')
const equalToButton = document.getElementById('equalTo')
const clearButton = document.getElementById('clear')
const undoButton = document.getElementById('undo')

numberButton.forEach(button => {
    button.addEventListener('click',function(){
        let buttonText = button.textContent
        result.append(buttonText)
    })
});
let lastOperator=''
operatorButton.forEach(button=>{
    button.addEventListener('click',function(){
        let operatorDisplay = button.textContent
        if (progress.textContent){
            num2 = Number(result.textContent)
            result.append(operatorDisplay)
            progress.append(result.textContent)
            result.textContent=''
        }else{
            num1=Number(result.textContent)
            calResult=num1
            result.append(operatorDisplay)
            progress.textContent = result.textContent
            result.textContent=''
        }
        
    })
})

equalToButton.addEventListener('click',function(){
    progress.append(result.textContent,'=')
    progressContent=progress.textContent
    let currentNumber=''
    let currentEquation=[]
    for (let i of progressContent){
        if (!isNaN(Number(i))){
            currentNumber+=i
        }else if(isNaN(Number(i))){
            currentEquation.push(currentNumber,i)
            currentNumber=''}
        
    }
    currentEquation.pop()
    if(currentEquation.includes('=')){
        let equalToPosition = currentEquation.indexOf('=')
        currentEquation=currentEquation.slice(equalToPosition+1)
        currentEquation.push('=')
        progress.textContent=currentEquation.join('')
        currentEquation.pop()
        result.textContent=''
    }
    while(currentEquation.length>=3){
        if (currentEquation.includes('×')||currentEquation.includes('÷')){
            let operatorPosition = currentEquation.indexOf('×')
            if (operatorPosition==-1){
                operatorPosition = currentEquation.indexOf('÷')
            }
            num1 = Number(currentEquation[operatorPosition-1])
            num2 = Number(currentEquation[operatorPosition+1])
            operator=currentEquation[operatorPosition]
            let stepResult = operate(num1,num2,operator)
            if(operatorPosition-1>=0){
                currentEquation.splice(operatorPosition-1,3,stepResult)
            }else{
                break;
            }
        }else{
            for (let i =1; i<currentEquation.length; i+=2){
                num1 = Number(currentEquation[i-1])
                num2 = Number(currentEquation[i+1])
                operator = currentEquation[i]
                stepResult=operate(num1,num2,operator)
                if(i-1>=0){
                    currentEquation.splice(i-1,3,stepResult)
                    console.log('>'+currentEquation)
                }else{
                    break;
                }
            }
        }
    }
    if(Number.isInteger(currentEquation[0])){
        result.textContent=currentEquation[0]
    }else{
        result.textContent=currentEquation[0].toFixed(2)
    }
    
})

clearButton.addEventListener('click',function(){
    num1=0
    num2=0
    operator=''
    lastOperator=''
    calResult=''
    progress.textContent=''
    result.textContent=''
})

undoButton.addEventListener('click',function(){
    let resultLenth = result.textContent.length
    if (resultLenth>1){
        result.textContent = result.textContent.substring(0,resultLenth-1)
    }else if (resultLenth==1){
        result.textContent=''
    }
    
})