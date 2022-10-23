const express = require('express')
const aboutRouter = express.Router()



aboutRouter.get('',  (req, res) => {
 res.render("about.ejs",{title:"Home page"})
})




module.exports =aboutRouter; 