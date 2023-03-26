import PageTitle from "@/component/PageTitle"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
export default function(props){

    let [info,setInfo]=useState({email:"",password:""})
    let [error,seterror]=useState("")
    let router=useRouter()

    async function login(e){
e.preventDefault()
let res
try {
    
     res= await axios({url:"/api/loginuser",method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:info})
} catch (error) {
    seterror("Please provide valid information")
    return
}

 if(res.data.sucess){
    seterror("")
     setInfo({email:"",password:""})
     props.setLoggedIn(true)
     router.push("/dashboard")
 }else{
seterror("Please provide valid data")
 }


    }


    if(props.isLoggedIn){
        return ( 
            <div className="text-center mt-5">
                  <PageTitle title={"Login"}/>

            <p>Your are already logged in.</p>
             <Link className="btn btn-primary" href={"/dashboard"}>Go to Dashboard</Link>
            </div>
        )
    }

    return (

        <div className="infoform">
              <PageTitle title={"Login"}/>

  <form onSubmit={login}>
  <div class="form-floating mb-3">
  <input name="email" type="email" required class="form-control" id="floatingInput" placeholder="name@example.com" value={info.email} onChange={(e)=>{setInfo(p=>({...p,email:e.target.value}))}} />
  <label htmlFor="floatingInput">Email address</label>
</div>
<div class="form-floating">
  <input name="password" type="password" required class="form-control" id="floatingPassword" placeholder="Password" value={info.password} onChange={(e)=>{setInfo(p=>({...p,password:e.target.value}))}} />
  <label htmlFor="floatingPassword">Password</label>
</div>
            <button className="btn btn-primary"  style={{width:"100%",marginTop:"1rem"}} type="submit">Login</button>
        </form>
{error?(<p>{error}</p>):""}

        </div>

    )



}