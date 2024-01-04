const express = require("express");
const app = express();

app.disable('x-powered-by');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(require('./Routes/index'));

app.get("/",(req,res)=>{
    res.send('<h1>Página principal de APIS</h1>')
});

app.use((req,res)=>{
    res.send('<h1>Error 404</h1>');
});

app.listen(PORT,()=>{
    console.log(`Server listening ob port http://localhost:${PORT}`)
});