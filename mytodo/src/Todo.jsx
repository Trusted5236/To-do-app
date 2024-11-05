import { useEffect, useState } from "react"
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function ToDo(){
    const [todo, setTodo] = useState("")
    const [todoArray, setTodoArray] = useState([])
    const [regulate, setRegulate] = useState(true)
    const [check, setCheckItem] = useState([])
    const [editIndicator, setEditIndicator] = useState(null)
    
    useEffect(()=>{
        const storedItems = localStorage.getItem("MyTodos")
        if(storedItems){
            setTodoArray(JSON.parse(storedItems))
        }
        setRegulate(false)
    }, [])

    useEffect(()=>{
        if(!regulate){
            localStorage.setItem("MyTodos", JSON.stringify(todoArray))
        }
    }, [todoArray])
    
    const submitTodo = (e)=>{
        e.preventDefault()
        if(editIndicator !== null){
            const allTodos = [...todoArray]
            allTodos[editIndicator] = todo
            setTodoArray(allTodos)
            setEditIndicator(null)
        }else{
            setTodoArray([...todoArray, todo])
        }
        setTodo("")
    }

    const setCheck = (index)=>{
        if(check.includes(index)){
            setCheckItem(check.filter(item => item !== index))
        }else{
            setCheckItem([...check, index])
        }
    }

    const deleteItem = (index) =>{
        setTodoArray(todoArray.filter((item, indexId) => indexId  !== index))
        console.log(index)
    }

    const editItem = (index)=>{
        setTodo(todoArray[index])
        setEditIndicator(index)
    }

    console.log(todoArray)


    return(
        <div className="content">
            <div className="container">
            <form onSubmit={submitTodo}>
                <label htmlFor="todo">Please Enter Todo😊</label>
                <input type="text" 
                    name="todo"
                    value={todo || ""}
                    onInput={(e)=>setTodo(e.target.value)}
                />

                <button type="submit">ADD TODO</button>
            </form>
            {todoArray.length > 0 ? todoArray.map((item, index)=>(
                <div key={index} className="flex" id={index}>
                    <div className="div1">
                    <div>
                    {check.includes(index) ? <FaCheckCircle onClick={(e)=>setCheck(index)} className="check" id={index}/> : <FaRegCircle className="uncheck" onClick={(e)=>setCheck(index)} id={index}/>}
                    </div>
                    <h4>{item}</h4>
                    </div>
                    
                    <div className="div2">
                    <CiEdit onClick={(e)=>editItem(index)}/>
                    <MdDelete onClick={(e)=>deleteItem(index)}/>
                    </div>
                </div>
            )) : <p>No todos</p>}
            </div>
        </div>
    )
}

export default ToDo