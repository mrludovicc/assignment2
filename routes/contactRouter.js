const express = require('express')
const contactRouter = express.Router()



contactRouter.get('',  (req, res) => {
 res.render("contact.ejs",{title:"Contact page"})
})




module.exports =contactRouter; 