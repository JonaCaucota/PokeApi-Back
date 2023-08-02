
const { Router } = require('express');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
const {check} = require("express-validator");
const {esRoleValido, existeEmail, existeUsuarioPorId} = require("../helpers/db-validators");
const {validarCampos, validarJWT, esAdminRole, tieneRol} = require('../middlewares')

const router = Router();

router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
] ,usuariosPut );

router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').isLength({min: 6}),
        //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom(existeEmail),
        check('rol').custom(esRoleValido),
        validarCampos],
    usuariosPost );

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    tieneRol('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete );

router.patch('/',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos],
    usuariosPatch );





module.exports = router;