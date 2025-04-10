const express=require('express');
const app=express();
const PORT=3000;
app.use(express.json());
let books=[
    {id:1,name:"The White Tiger",author:"Aravind Adiga"},
    {id:2,name:"The Diary of a Young Girl",author:" Anne Frank"},
    {id:3,name:"Fahrenheit 451",author:"Ray Bradbury"},
    {id:4,name:"The Story of My Life",author:"Helen Keller"}
]
app.get("/",(req,res)=>{
    res.send("welcome to books library");
})
app.get("/books",(req,res)=>{
    res.status(201).json(books);
})
app.get("/books/:id",(req,res)=>{
    const book=books.find(b=>b.id===parseInt(req.params.id));
    if(!book){
        return res.status(404).json({message:"book not found"});
    }
    res.json(book)
})
app.get("/search",(req,res)=>{
    const {name,author}=req.query;
    let result=books;
    if(name){
        result=result.filter(b=>b.name.toLowerCase().includes(name.toLowerCase()));
    }
    if(author){
        result=result.filter(b=>b.author.toLowerCase().includes(author.toLowerCase()));
    }
    res.json(result);
})
app.get("/count",(req,res)=>{
    res.send(`total books in library:${books.length}`);
})
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({message:"internal server error"});
})
app.listen(PORT,()=>{
    console.log(`server listening on port:${PORT}`);
})