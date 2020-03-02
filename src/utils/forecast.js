const request= require("request");
const getForecast= (long,lat,callback)=>{
    const url = "https://api.darksky.net/forecast/d5d996f8ad47fdd324ff7e2d56357180/"+lat+","+long;
    request({url:url,json:true},(error,{body})=>{
            if(error){
                    callback("Please check your internet connection!",undefined);
            }
            else if(body.error){
                    callback("Please provide a valid location!",undefined);
            }
            else{
                    callback(undefined,`It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} % chance of rain.`)
            }
    })
    
}

module.exports=getForecast;