import axios from "axios"
import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
export function Create(){
    const[newid,setNewid] = useState('')
    const[newname,setNewname] =useState('')
    const[newnumber,setNewnumber]= useState('')
    const navigate = useNavigate()
    function id_Change(e){
        setNewid(e.target.value)
    }
    function name_change(e){
        setNewname(e.target.value)
    }
    function number_change(e){
        setNewnumber(e.target.value)
    }
    function addingData(e){
        e.preventDefault()
        var values = {
            id: newid,
            Name: newname,
            Number: newnumber
        }
        console.log(values)
        axios({
            method: 'post',
            url:'http://127.0.0.1:8080/addprofile',
            data: values
        }).then(()=>{
            alert('Profile Added')
            navigate('/main')
        })
    }
    return(
        <div>
            <Link to='/main'><div style={{margin:'25px'}} className="bi bi-arrow-left-square-fill h3"></div></Link>
            <h4 style={{marginLeft:'25px'}}>New Contact Details</h4>
            <dl style={{marginTop:'40px',marginLeft:'30px'}}>
                <dt>ID </dt>
                <dd><input type="number" onChange={id_Change}></input></dd>
                <dt>Name </dt>
                <dd><input type="text" onChange={name_change}></input></dd>
                <dt>Number </dt>
                <dd><input type="number" onChange={number_change}></input></dd>
                <dd><button type="submit" className="btn btn-primary" onClick={addingData}>Save</button></dd>
            </dl>
        </div>
    )
}