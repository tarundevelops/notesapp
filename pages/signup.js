import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import PageTitle from "@/component/PageTitle"

export default function(props){

    let [info,setInfo]=useState({name:"",email:"",password:""})
    let [error,seterror]=useState("")
    let router=useRouter()

    async function login(e){
e.preventDefault()


if(!info.password.trim() || !info.email.trim() || !info.name.trim()){
  seterror("Empty field(s) not allowed")
  return
}

 let res= await axios({url:"/api/signupuser",method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:info})

 if(res.data.sucess){
    seterror("")
     setInfo({name:"",email:"",password:""})
     props.setLoggedIn(true)
     router.push("/dashboard")
 }else{
seterror("Please provide valid data")
 }


    }

    if(props.isLoggedIn){
      return ( 
        <div className="text-center mt-5">
          <PageTitle title={"Signup"}/>
        <p>Your have already signed up.</p>
         <Link className="btn btn-primary" href={"/dashboard"}>Go to Dashboard</Link>
        </div>
    )
    }

    return (

        <div className="infoform">
          <PageTitle title={"Signup"}/>

  <form onSubmit={login}>
  <div class="form-floating mb-3">
  <input name="name" type="text" required class="form-control" id="floatingInput1" placeholder="Name" value={info.name} onChange={(e)=>{setInfo(p=>({...p,name:e.target.value}))}} />
  <label htmlFor="floatingInput1">Name</label>
</div>
  <div class="form-floating mb-3">
  <input name="email" type="email" required class="form-control" id="floatingInput" placeholder="name@example.com" value={info.email} onChange={(e)=>{setInfo(p=>({...p,email:e.target.value}))}} />
  <label htmlFor="floatingInput">Email address</label>
</div>
<div class="form-floating">
  <input name="password" type="password" required class="form-control" id="floatingPassword" placeholder="Password" value={info.password} onChange={(e)=>{setInfo(p=>({...p,password:e.target.value}))}} />
  <label htmlFor="floatingPassword">Password</label>
</div>
            <button className="btn btn-primary"  style={{width:"100%",marginTop:"1rem"}} type="submit">Sign Up</button>
    
        </form>
{error?(<p>{error}</p>):""}

        </div>

    )



}