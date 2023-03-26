export default function NoteCard(props){


  let {id,title,desc,update,deleteinfo} = props


    return (
<>
<div className="card" style={{width: "100%",margin:"1rem"}}>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text" style={{whiteSpace:"break-spaces",textAlign:"justify"}}>{desc}</p>
    <button className="btn btn-outline-primary me-2" onClick={()=>update(id)} >Edit</button>
    <button className="btn btn-outline-secondary" onClick={()=>deleteinfo(id)}>Remove</button>
  </div>
</div>

</>

    )
}