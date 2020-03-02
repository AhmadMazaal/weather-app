const express= require("express");
const path= require("path");
const hbs= require("hbs");
const forecast=require("./utils/forecast");
const geocode=require("./utils/geocode");

const app= express();

// Define paths for express config
const publicDirectory= path.join(__dirname,'../public');
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

// Setup static directory to serve  
app.use(express.static(publicDirectory));

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Ahmad Mazaal"
    })

});
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Weather App",
        name:"Ahmad Mazaal"
    })
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        helpText:"This is some helpful text.",
        name:"Ahmad Mazaal."
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error:"You must provide an address!"
        })
    }
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({error})
            }
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
                })
            })
        })
    })
app.get('/product',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error:"You must provide a search term!"
        })
    }

    console.log(req.query.search);
    res.send({
        product:[] 
    })
})
app.get('/help/*',(req,res)=>{
    res.render('otherErrors',{
        title:"Page not found!",
        helpText:"Help article not found",
        name:"Ahmad Mazaal" 
    })
})
 
app.get('*',(req,res)=>{
    res.render('404page',{
        title:"404!",
        errorMessage:"Page not found.",
        name:"Ahmad Mazaal"
    })
});

// app.get('/weather',(req,res)=>{
//     res.send([{features:{Long:21,Lat:22},center:{name:"ahmad",age:24}}]);
// });

app.listen(3000,()=>{
    console.log("server is up on port 3000")
    
});