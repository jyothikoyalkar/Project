import { Contacts } from "./Contacts";
import { SearchBar } from "./Search-Bar";

export function MainPage(){
    return(
        <div>
            <SearchBar/>
            <Contacts/>
        </div>
    )
}