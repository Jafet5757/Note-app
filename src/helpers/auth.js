//Esto es un midleware creado por nosotros para verificar que el usuario esta logueado y tiene acceso a los datos
const helpers = {};

/**
 * Esta funcion se encarga de verificar que el usuario este autenticadi
 * es creada por nosotros
 * podemos modificarla
 * se debe poner antes de cada ruta
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', 'Not authorized');
    res.redirect('/users/signin')
}

module.exports = helpers;