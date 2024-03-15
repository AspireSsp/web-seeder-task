const Notes = require("../models/notesModel");

exports.addNote = async(req, res)=>{
    try {
        const note = await Notes.create({userId: req.user._id, ...req.body});
        res.status(200).json(
            {
                note,
                message: 'note added successfully...!',
                success : true,
            }
        )
    } catch (error) {
        res.status(500).json(
            { 
                error: 'Internal Server Error', 
                message: error.message
            }
        );
    }
}
exports.deleteNote = async(req, res)=>{
    try {
        const note = await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json(
            {
                deleteCount: 1,
                message: 'note deleted successfully...!',
                success : true,
            }
        )
    } catch (error) {
        res.status(500).json(
            { 
                error: 'Internal Server Error', 
                message: error.message
            }
        );
    }
}
exports.updateNote = async(req, res)=>{
    try {
        const id = req.params.id;
        const note = await Notes.findByIdAndUpdate(id, req.body);
        res.status(200).json(
            {
                note,
                message: 'note updated successfully...!',
                success : true,
            }
        )
    } catch (error) {
        res.status(500).json(
            { 
                error: 'Internal Server Error', 
                message: error.message
            }
        );
    }
}
exports.getAllNotes = async(req, res)=>{
    try {
        const notes = await Notes.find({userId: req.user._id});
        res.status(200).json(
            {
                notes,
                message: 'note retrived successfully...!',
                success : true,
            }
        )
    } catch (error) {
        res.status(500).json(
            { 
                error: 'Internal Server Error', 
                message: error.message
            }
        );
    }
}