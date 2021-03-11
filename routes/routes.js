const { Router } = require('express');
const { Mensaje, User } = require('../db');
const router = Router();

// aca configuramos las rutas.
function checkLogin(req, res, next) {
    
    if (req.session.user == null){
        req.flash('errors', "Tienes que estar logeado para entrar a esta parte del sistema.");
        return res.redirect('/login');
    }

    res.locals.user = req.session.user;
    next();
}



/* router.get("/", [checkLogin ] , (req,res) => {


    const errors = req.flash("errors");
    const mensajes = req.flash("mensajes");



    res.render("chat.ejs",{ errors, mensajes})

}); */

router.get("/register", (req,res) => {


    const errors = req.flash("errors");
    const mensajes = req.flash("mensajes");



    res.render("register.ejs",{ errors, mensajes})
});


router.get("/", [checkLogin] , async (req,res) => {
    let chats = await Mensaje.findAll({include: User, order:[['createdAt', 'ASC']] });
    console.log(chats);

    const errors = req.flash("errors");
    const mensajes = req.flash("mensajes");

    res.render("chat.ejs",{ errors, mensajes, chats });
});


router.post("/mensajes", [ checkLogin ] , async (req, res) => {
    console.log(req.body);
    
    const mensaje = await Mensaje.create({
        mensaje: req.body.mensaje,
        time: req.body.hora,
        UserId: req.body.UserId
    });
    console.log(mensaje);
 

    res.send("OK");

});

module.exports = router;
