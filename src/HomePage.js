import './Homepage.css'
import { Profile } from "./Profile"
import { EditProfile } from "./Edit";
import { Routes,Route} from "react-router-dom"
import { Create } from "./Create";
import { MainPage } from './Mainpage';
export function HomePage(){
    return(
        <div id='mainBody'>
            <div id='screen'>  
                <Routes>
                    <Route path='' element={<MainPage/>}></Route>
                    <Route path='/profile/:id' element={<Profile/>}></Route>
                    <Route path='/updateprofile/:id' element={<EditProfile/>}></Route>
                    <Route path='/main' element={<MainPage/>}></Route>
                    <Route path='/new' element={<Create/>}></Route>
                </Routes>
            </div>
        </div>
    )
}