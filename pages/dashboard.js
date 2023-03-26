import NoteCard from "@/component/NoteCard"
import PageTitle from "@/component/PageTitle"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ncomp = (pr)=>{ 
    let [data,setData]=useState([])
    let router = useRouter()
    let [loding,setLoading]=useState(true)
    async function fetchData(){
    axios("/api/getnote").then(data=>{

        if(data.data.notes && data.data.notes.length > 0){

            setData(data.data.notes)
            setLoading(false)
        }else{
            setData([{noE:"No Notes"}])
            setLoading(false)
        }

    }).catch((e)=>{
        setData([{noE:"Error"}])
        setLoading(false)
    })
      
       //setData(data)
    }


    useEffect(()=>{
        fetchData()
    },[])
    
function updatenote(id){

  let userin=  data.find((e)=>{ return e._id==id })

  router.push({
    pathname:"/note",
    query:userin
  })

}




async function deletenote(id){
    await axios({url:"/api/deletenote",method:"DELETE",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{id}})
    fetchData()

}



if(!pr.isLoggedIn){
    return (
        <>
        <PageTitle title={"Dashboard"}/>
        <p className="mt-5 text-center">Please login or sign up to visit this page.</p>
        </>
    )
}


if(loding){

    return(
        <>
        <PageTitle title={"Dashboard"}/>
        <p className="mt-5 text-center">Loading...</p>
        </>
    )
}


if( data[0] && data[0]["noE"]){
    return (

        <div className="notelist">
            <PageTitle title={"Dashboard"}/>
        <button className="btn btn-primary mt-2" onClick={()=> { router.push("/note")}}>Add Note</button>
        <p className="mt-5">No notes found</p>
    
    </div>
    )
}

    return(
        <div className="notelist">
            <PageTitle title={"Dashboard"}/>
            <button className="btn btn-primary mt-2" onClick={()=> { router.push("/note")}}>Add Note</button>
            {data.map((e)=>{return(<NoteCard key={e._id} id={e._id} title= {e.title} desc= {e.desc} update={updatenote}  deleteinfo={deletenote} />)})}
        </div>
    )
}

export default ncomp

