const { Router } = require('express');
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



router.get("/", [checkLogin ] , (req,res) => {


    const errors = req.flash("errors");
    const mensajes = req.flash("mensajes");



    res.render("chat.ejs",{ errors, mensajes})
});

router.get("/register", (req,res) => {


    const errors = req.flash("errors");
    const mensajes = req.flash("mensajes");



    res.render("register.ejs",{ errors, mensajes})
});


router.get("/chat", [checkLogin] , (req,res) => {


    const errors = req.flash("errors");
    const mensajes = req.flash("mensajes");

    res.render("chat.ejs",{ errors, mensajes })
});


module.exports = router;
