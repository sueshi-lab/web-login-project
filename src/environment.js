let HOST = "http://localhost:3001"

//check the environment...
if(process.env.REACT_APP_ENV==="production"){
    HOST = "https://api.evenpark.site"
}

export {HOST};