import { useEffect, useState } from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import './profile.css'
import axios from "axios";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ChatIcon from '@mui/icons-material/Chat';
import EmailIcon from '@mui/icons-material/Email';
export function Profile(){
    const[details,setDetails] = useState({id:0,Name:'',Number:0})
    const params = useParams()
    const navigate= useNavigate()
    useEffect(()=>{
        axios({
            method: 'get',
            url:`http://127.0.0.1:8080/profile/${params.id}`
        }).then(response=>{
            for(const val of response.data){
                setDetails(val)
            }
        })
    },[params.id])
    function Del(){
        axios({
            method:'delete',
            url:`http://127.0.0.1:8080/deleteprofile/${params.id}`
        })
        alert('Deleted')
        navigate('/main')
    }
    return(
        <div className="container-fluid" >
            <ul className="list-group">
                <Link to='/main'><span className="bi bi-arrow-left-square-fill h3"></span></Link>
                <Link id='editBox' to={'/updateprofile/' + params.id} className="btn btn-primary">Edit</Link>
                <li id='profilePic'><img src='/AccountCircleIcon.png' style={{height:'100px',width:'100px'}}></img></li>
                <li id='nameli'>{details.Name}</li>
                <li id='numberli'>{details.Number}</li>
                <li id='iconsli'><LocalPhoneIcon id='callSymbol'/><ChatIcon id='megSymbol'/><EmailIcon id='mailSymbol'/></li>
                <li className="list-group-item" style={{fontSize:'15px'}}><img src='/icon-whatsapp.png' style={{height:'30px',width:'30px',marginTop:'10px'}}></img>WhatsApp</li>
                <li className="list-group-item">Message +91{details.Number}</li>
                <li className="list-group-item">Voice call +91{details.Number}</li>
                <li className="list-group-item">Video call +91{details.Number}</li>
                <li className="list-group-item"><img src='/icon-telegram.png'style={{height:'40px',width:'40px'}}></img>Telegram</li>
                <li className="list-group-item">Message +91{details.Number}</li>
                <li className="list-group-item">Voice call +91{details.Number}</li>
                <li className="list-group-item">Video call +91{details.Number}</li>
                <li className="list-group-item">Add to BlackList</li>
                <li className="list-group-item" style={{color:'red'}}><span className="btn btn-danger" onClick={Del}>Delete Contact</span></li>
            </ul>
        </div>
    )
}