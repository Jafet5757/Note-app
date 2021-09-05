const express = require('express');
const router = express.Router();
const Note = require('../models/Notes')
//debemos ponerlo en cada ruta para verificar el acceso
const {isAuthenticated} = require('../helpers/auth')

router.get('/notes', isAuthenticated, async function(req, res){
    //bsuca todos los registrpos y los ordena de forma descendente por fecha
    const notes = await Note.find().sort({date: 'desc'});;
    console.log(notes);
    res.render('notes/all-notes', {notes})
})

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-notes')
});

router.post('/notes/new-notes', isAuthenticated, async (req, res) => {
    const {title, description} = req.body;
    console.log(req.body);

    const newNote = new Note({title, description})
    await newNote.save();
    req.flash('success_msg', 'Note added successfully')
    res.redirect('/notes')
})

router.get('/notes/edit/:id', isAuthenticated, async (req, res)=> {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', {note})
})

router.put('/notes/edit-note/:id', isAuthenticated, async (req, res)=> {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Successfully updated')
    res.redirect('/notes')
})

router.delete('/notes/delete/:id', isAuthenticated, async (req, res)=> {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes')
})

module.exports = router;