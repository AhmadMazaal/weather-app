console.log("Client-side Javascript");


// fetch("http://puzzle.mead.io/puzzle").then((res)=>{
//     res.json().then((data)=> console.log(data));
// })

// fetch("http://localhost:3000/weather?address=Beirut").then((response)=> 
//     response.json().then((data)=>{ 
//       if(data.error)
//         console.log(data.error);
//       else
//         console.log(data.location)
//         console.log(data.forecast)
// }))

const weatherForm =document.querySelector("form")
const searchResult= document.querySelector("input")

const loading= document.querySelector("#loadingMsg")
const forecast= document.querySelector("#forecastMsg")


weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const location= searchResult.value;

    loading.textContent='Loading...'
    forecast.textContent=''


    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=> 
    response.json().then((data)=>{ 
      if(data.error)
        console.log(data.error)
      else{
        loading.textContent=data.location
        forecast.textContent=data.forecast
      }
        
        
}))
    
})