let constructor=document.getElementById('constructor')
let result=document.getElementById('result')
let button=document.getElementById('btn')
button.addEventListener('click',createElement)
let select=document.getElementById('select')
let constructorElementsValue=[]
let constructorElements=[]
let resultsElements=[result]

let checkInpForText=[]

select.onchange=()=>{
    if (checkInpForText.length) {
        checkInpForText[0].remove()
        checkInpForText=[]
    }
    if (select.value=='h1' || select.value=='span') {
            let inputForText=document.createElement('input')
            inputForText.className='inputForText'
            select.after(inputForText)
            checkInpForText.push(inputForText)
        }
}

function createElement(){
    if (constructorElementsValue.includes(select.value)) {
        alert(`${select.value} element is already in constructor`)
    }else{
        let x=document.createElement(select.value)
        x.className=select.value
        if (select.value=='input') {
            x.placeholder='Input Tag'
        }
        if (select.value=='h1' || select.value=='span') {
            if (checkInpForText[0].value=='') {
                alert(`Enter Text For ${select.value}`)
                return
            }else{
                x.innerHTML=checkInpForText[0].value
            }
        }
        constructor.append(x)
        constructorElementsValue.push(select.value)
        constructorElements.push(x)
        for(let i=0;i<constructorElements.length;i++){
            if (constructorElements[i]) {
                constructorElements[i].onclick=()=>{
                    constructorElements.map(elm=>elm.style.borderColor=elm.tagName=='DIV' || elm.tagName=="INPUT"?'black':'white')
                    constructorElements[i].style.borderColor='orange'
                }
            }
            for(let j=0;j<resultsElements.length;j++){
                if (resultsElements[i]) {
                    resultsElements[i].onclick=(e)=>{
                        addElementInResult(e.target,e)
                    }
                }
                
            }
        }
    }
}



function addElementInResult(element,e) {
    let selectedElement=constructorElements.find(elm=>elm.style.borderColor=='orange')
    if (selectedElement) {
        if (selectedElement.tagName=='DIV' && element.tagName=="INPUT") {
            alert('DIV can not be appended to INPUT element')
           return
        }
    }
    e.stopPropagation()
    if (selectedElement) {
        element.append(selectedElement)
        constructorElements=constructorElements.filter(elm=>elm!=selectedElement)
        constructorElementsValue=constructorElementsValue.filter(elm=>elm!=selectedElement.className)
        if (selectedElement.tagName=='DIV' || selectedElement.tagName=='INPUT') {
            selectedElement.style.borderColor='black'
        }else{
            selectedElement.style.border='none'
        }
        if (element!=resultsElements[0] && selectedElement.tagName!='H1' && selectedElement.tagName!='SPAN') {
            selectedElement.className='res'
        }
        if (selectedElement.parentNode!=resultsElements[0] && selectedElement.parentNode.id!='main') {
            resultsElements.filter(elm=>elm!=selectedElement.parentNode).onclick=''   
        }
        resultsElements.push(selectedElement)
    }
}