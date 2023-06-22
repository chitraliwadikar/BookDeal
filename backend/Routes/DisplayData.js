const express = require('express')
const router = express.Router()

router.post('/bookData',(req,res)=>{
    try{
        res.send([global.book_items,global.book_category])
    }catch(error){
        console.error(error.message);
        res.send("Server Error");
    }
})

module.exports = router;