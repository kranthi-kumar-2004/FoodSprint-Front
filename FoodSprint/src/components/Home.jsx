import "../css/Home.css";
import { useState,useEffect } from "react";
function Home(){
    const [restaurent,setRestaurent]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:8080/restaurent")
        .then(res=>res.json())
        .then(data=>setRestaurent(data))
        .catch(error=>console.log(error));

    },[]);
    return(
        <> 
        
        <div class="header">
            <p>Location</p>
            <p>Menu</p>
        </div>
        <div class=" resta">

        {restaurent.map((rest)=>(
        <div class="res1 key={rest.id}">
            <div class="in">
                
                    <img class="img" src= {rest.image} alt="" />
                
                <div class="in1">
                    <p>{rest.name}</p>
                    <p>{rest.rating}</p>
                </div>
                
            </div>
            <p class = "ur">least price starting from {rest.startingprice}</p>
        </div>
        ))}
        </div>
        </>
       
    );
}
export default Home;