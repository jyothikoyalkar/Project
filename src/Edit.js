import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate,useParams } from "react-router-dom"
import { useState,useEffect} from "react"
export function EditProfile(){
    const params = useParams();
    const navigate= useNavigate()
    const[profile,setProfile]= useState([{id:0,Name:'',Number:0}])
    const[newname,setNewname] =useState('')
    const[newnumber,setNewnumber]= useState('')

    useEffect(()=>{
        axios({
           method:'get',
            url:`http://127.0.0.1:8080/profile/${params.id}`
        }).then(response=>{
            setProfile(response.data);    
        })
    },[params.id])
    function name_change(e){
        setNewname(e.target.value)
    }
    function number_change(e){
        setNewnumber(e.target.value)
    }
    function updateChanges(e){
            e.preventDefault() 
            if(newname==''){
                var values = {
                    id: params.id,
                    Name: profile.map(pro=>
                        pro.Name
                    ),
                    Number: newnumber
                }
            }else if(newnumber==''){
                var values = {
                    id: params.id,
                    Name: newname,
                    Number: profile.map(pro=>
                        pro.Number
                    )
                }
            }else{
                var values = {
                    id: params.id,
                    Name: newname,
                    Number: newnumber
                }
            }
            console.log(values)
            axios({
                method: 'put',
                url:`http://127.0.0.1:8080/updateprofile`,
                data : values
            }).then(
                navigate('/profile/' + params.id)
            )
            alert('Updated')
    }
    
    return(
        <div>
            <Link to={'/profile/' + params.id}><div style={{margin:'25px'}} className="bi bi-arrow-left-square-fill h3"></div></Link>          
                {
                    profile.map(pro=>
                        <dl style={{marginTop:'50px',marginLeft:'30px'}}>
                            <dt>Name</dt>
                            <dd><input type="text" onChange={name_change} placeholder={pro.Name}></input></dd>
                            <dt>Number</dt>
                            <dd><input type="number" onChange={number_change} placeholder={pro.Number}></input></dd>
                            <dd><button type="submit" onClick={updateChanges} className="btn btn-primary">Update</button></dd>
                        </dl>
                        )        
                }    
        </div>
    )
}