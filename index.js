// require your server and launch it here
const server= require('./api/server');

//const port = 5000
server.listen(3000, ()=>{
  console.log('server running on port 3000')
})
