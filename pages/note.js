import PageTitle from "@/component/PageTitle"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
export default function Note(props){
    let router= useRouter()
    let data = router.query

    if(!props.isLoggedIn){
        return( 
            <>
              <PageTitle title={"Note"}/>

            <p className="mt-5 text-center" >Please login or signup to visit this page.</p>
            </>
        )
    }

    if(data._id){
                let [updateinfo,setuinfo]=useState({title:data.title,desc:data.desc,id:data._id})
            

async function updatesend(e){
    e.preventDefault()

    await axios({url:"/api/updatenote",method:"PUT",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:updateinfo})

    setuinfo({id:"",title:"",desc:""})


    router.push("/dashboard")
    

}



    return (
        <form onSubmit={updatesend} className="mx-5 mt-5">
              <PageTitle title={"Note"}/>

            <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
  <input type="text" className="form-control" required id="exampleFormControlInput1" name="title" value={updateinfo.title} onChange={(e)=>{setuinfo(p=>({...p,title:e.target.value}))}}/>
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
  <textarea className="form-control" required id="exampleFormControlTextarea1" rows="10" name="desc" value={updateinfo.desc} onChange={(e)=>{setuinfo(p=>({...p,desc:e.target.value}))}} ></textarea>
</div>

        <button className="btn btn-primary" type="submit">Update Note</button>
        <button className="btn btn-secondary ms-2" type="button" onClick={()=>{ setuinfo({id:"",title:"",desc:""});  router.push("/dashboard")}} >Cancel</button>
    </form>   
        
        )
    }else{
        let [info,setNoteInfo]=useState({title:"",desc:""})

        async function setinfo(e){

            e.preventDefault()
    
            
            await axios({url:"/api/postnote",method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:info})
            
            
            setNoteInfo({title:"",desc:""})
            
            router.push("/dashboard")
            
    
        }
    
        return (

            <form onSubmit={setinfo} className="mx-5 mt-5">
                  <PageTitle title={"Note"}/>

                            <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
  <input type="text" className="form-control" required id="exampleFormControlInput1" name="title" value={info.title} onChange={(e)=>{setNoteInfo(p=>({...p,title:e.target.value}))}}/>
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
  <textarea className="form-control" required id="exampleFormControlTextarea1" rows="10" name="desc" value={info.desc} onChange={(e)=>{setNoteInfo(p=>({...p,desc:e.target.value}))}} ></textarea>
</div>

        <button className="btn btn-primary" type="submit">Add Note</button>
        <button className="btn btn-secondary ms-2" type="button" onClick={()=>{ setNoteInfo({id:"",title:"",desc:""});  router.push("/dashboard")}} >Cancel</button>

        </form>


        )
    }

}