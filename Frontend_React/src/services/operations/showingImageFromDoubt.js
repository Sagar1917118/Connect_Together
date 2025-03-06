import toast from "react-hot-toast";

export async function gettingDoubtImage(id,setDoubtDetails){
       try{
        const response=await fetch(`http://localhost:4000/api/v1/doubt/getUserDoubt`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id})
        });
        const result=await response.json();
    
        if(result.success){
            setDoubtDetails(result.data);
            toast.success("Doubt fetched")
        }
        else if(!result.success){
            toast.error("Can not fetch doubt details")
        }

       }catch(error){
            console.log("Error in fetching doubt: ",error);
       }
}