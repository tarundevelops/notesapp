import axios from "axios"
import Link from "next/link"
import { useEffect } from "react"

export default function Navbar(props){

  useEffect(()=>{
     
    axios.get("/api/checkuser").then(data=>{
        if(data.data.login){

            props.setLoggedIn(true)
        }
    })

  },[])

    return (
        <nav>
            <div>
                <p className="mb-0">NotesApp</p>
            </div>
            <div>
                {props.isLoggedIn?(<button className="btn btn-primary" onClick={()=>{props.logoutuser()}}>Logout</button>):(<><Link className="btn btn-primary" style={{marginRight:"0.5rem",textDecoration:"none"}} href={"/login"}>Login</Link>
                <Link className="btn btn-primary" style={{textDecoration:"none"}} href={"/signup"}>SignUp</Link></>)}
            </div>
        </nav>
    )


}