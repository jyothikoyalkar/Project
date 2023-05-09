import {useEffect, useState} from 'react'
import axios from 'axios'
import './contacts.css'
import { Link} from 'react-router-dom'
export function Contacts(){
    const[list,setList] = useState([{id:0,Name:'',Number:0}])

    useEffect(()=>{
        axios({
            method: 'get',
            url:'http://127.0.0.1:8080/details'
        }).then(response=>{
            setList(response.data)
        })
    },[])
    return(
        <div id="listBox">
            {
                list.map(item=>
                    <div key={item.id}>
                        <Link id='names' to={'/profile/' + item.id}><div id='list'>{item.Name}</div></Link>
                    </div>
                )
            }
        </div>
    )
}