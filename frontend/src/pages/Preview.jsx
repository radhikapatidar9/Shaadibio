import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

function Preview(){

const { id } = useParams()
const [html,setHtml] = useState("")

useEffect(()=>{
fetchPreview()
},[])

const fetchPreview = async()=>{

try{

const token = localStorage.getItem("token")

const res = await axios.get(
`http://localhost:5000/api/v1/biodata/preview/${id}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

setHtml(res.data.html)

}catch(err){
console.log(err)
}

}

return(

<div className="bg-gray-100 min-h-screen flex justify-center items-start sm:p-2 p-3 overflow-x-hidden">

<div
className="bg-white shadow-lg p-2 w-full max-w-200 min-h-275"
dangerouslySetInnerHTML={{__html:html}}
/>

</div>

)

}

export default Preview