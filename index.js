const form = document.getElementById(`form`)
const toDoInput =  document.getElementById(`to-do-list`)
const overall = document.getElementById('overall')


let arrayOfObj = []
let editingSignal = -1

form.addEventListener(`submit`, (event)=>{
    event.preventDefault()
    toDoInput.focus()
    let input = toDoInput.value
    if(input.length < 1){
       alert (`Please insert a task`)
    }else if(input.length === 1){
        alert (`Please your task should be more than one character`)
    }else if(editingSignal >= 0){
        arrayOfObj = arrayOfObj.map((item, index)=>{
            if(editingSignal === index){
                return{
                    inputValue : input,
                    completed : item.completed
                }
            }else{
                return {
                    inputValue : item.inputValue,
                    completed: item.completed
                }
            }
        })

        localStorage.setItem(`To Do Items`, JSON.stringify(arrayOfObj))  
        editingSignal = -1
    }else{
        let inputObj = {
            inputValue : input,
            completed: false

        }
        arrayOfObj.push(inputObj)
        localStorage.setItem(`To Do Items`, JSON.stringify(arrayOfObj))
        
    }
   
    getObj()
    console.log(arrayOfObj)
    form.reset()
})

window.addEventListener(`load`, ()=>{
    getObj()
})


function getObj(){
    if(localStorage.getItem(`To Do Items`) !== null){
        arrayOfObj = JSON.parse(localStorage.getItem(`To Do Items`))
    }
    displayItems()
}


function displayItems(){
    overall.innerHTML = ''
    arrayOfObj.forEach((items, index)=>{
    let task = items.inputValue
    let check = items.completed 
    

    const firstDiv = document.createElement("div")
    firstDiv.setAttribute("class", "sub-cont")
    firstDiv.setAttribute("id", `${index}`)

    const secondDiv = document.createElement("div")
    secondDiv.setAttribute("class", "second-section")

    const thirdDiv = document.createElement("div")
    thirdDiv.setAttribute("class", "rightside")

    const fourthDiv = document.createElement("div")
    fourthDiv.setAttribute("class", "leftside")

    const circleIcon = document.createElement("i")
    circleIcon.setAttribute("class", "fa-regular fa-circle" )
    circleIcon.setAttribute("data-action", "check")

    const checkIcon = document.createElement("i")
    checkIcon.setAttribute("class", "fa-solid fa-circle-check")
    checkIcon.setAttribute("data-action", "check")


    const todoTask = document.createElement("p")
    todoTask.textContent = task
    todoTask.setAttribute("data-action", "check")

    const editIcon = document.createElement("i")
    editIcon.setAttribute("class", "fa fa-pencil")
    editIcon.setAttribute("data-action", "edit")

    const trashIcon = document.createElement("i")
    trashIcon.setAttribute("class", "fa fa-trash")
    trashIcon.setAttribute("data-action", "delete")

    if(!check){
        thirdDiv.append(circleIcon, todoTask)
        fourthDiv.append(editIcon, trashIcon)
        secondDiv.append(thirdDiv, fourthDiv)
        firstDiv.append(secondDiv)
        overall.append(firstDiv)
    }else{
        thirdDiv.append(checkIcon, todoTask)
        fourthDiv.append(editIcon, trashIcon)
        secondDiv.append(thirdDiv, fourthDiv)
        firstDiv.append(secondDiv)
        overall.append(firstDiv)
        todoTask.style.textDecoration = "line-through"
    }
 

    
})   
}

overall.addEventListener("click", targetToDoItem)
function targetToDoItem(event){
    let userTarget = event.target
   let greatgrandParentElement =  userTarget.parentElement.parentElement.parentElement


   if(!greatgrandParentElement.classList.contains("sub-cont")) return
   console.log(greatgrandParentElement)

  let subContId =  Number(greatgrandParentElement.id)
   let clickaction = userTarget.dataset.action

   console.log(subContId)
   console.log(clickaction)

   if(clickaction === "check"){
    checkanItem(subContId)
   }

   if(clickaction === "delete"){
    deleteItem(subContId)
   }

   if(clickaction === "edit"){
    editItem(subContId)
   }
}

function checkanItem(ID){
    arrayOfObj = arrayOfObj.map((item, index)=>{
        if(index === ID){
          return{
            inputValue : item.inputValue,
            completed : !item.completed
          }
        }else{
            return{
                inputValue : item.inputValue,
                completed : item.completed 
            }
        }
    })
    localStorage.setItem(`To Do Items`, JSON.stringify(arrayOfObj))
    getObj()
    displayItems()
    
}

function deleteItem(ID){
    arrayOfObj = arrayOfObj.filter((item, index)=>{
    return index !== ID
    })
    localStorage.setItem(`To Do Items`, JSON.stringify(arrayOfObj))
    getObj()
    displayItems()
}

function editItem(ID){
    arrayOfObj.forEach((item,index)=>{
        if(ID === index){
         toDoInput.value = item.inputValue
         editingSignal = ID
        }
    })
}
