const express = require('express')
const projectRouter = express.Router()



projectRouter.get('',  (req, res) => {
 res.render("project.ejs",{title:"Project page"})
})




module.exports =projectRouter; 