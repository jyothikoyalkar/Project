import axios from "axios";
import { useState} from "react"
import  './Search-Bar.css'
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Link} from 'react-router-dom'

export function SearchBar(){
    const[values,setValues]= useState([])
    const[userinput,setUserinput]= useState('')
        const handleChange = (event) =>{
            const searchWord = event.target.value
            setUserinput(searchWord)
            axios({
                method: 'get',
                url:'http://127.0.0.1:8080/details'
            }).then(response=>{
                const data = response.data
                const newFilter = data.filter((value) => {
                return value.Name.toLowerCase().includes(searchWord.toLowerCase());
                });
                    if (searchWord === "") {
                    setValues([]);
                    } else {
                        setValues(newFilter);
                    }
            })
        }
        const clearInput = () => {
            setValues([]);
            setUserinput("");
        };
        
    return(
        <div>
            <div id='searchBox'>
                <input  id='searchField' type="text" placeholder="Search..." value={userinput} onChange={handleChange}></input>
                <span className="searchIcon">
                    {values.length === 0 ? (
                        <SearchIcon />
                    ) : (
                        <CloseIcon id="clearBtn" onClick={clearInput} />
                    )}
                </span>
                <Link to='/new'><AddCircleIcon></AddCircleIcon></Link>
            </div>

            <div>
                {values.length != 0 && (
                    <div id='dataResult'>
                        {values.slice(0, 15).map((value, key) => {
                            return (
                                <p><Link  to={'/profile/' + value.id}>{value.Name}</Link></p>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
