import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

// Add a new Note
router.route('/notes').post(NoteController.addNote);

// Delete note
router.route('/notes/:noteId').delete(NoteController.deleteNote);

// Edit note
router.route('/notes/:noteId').put(NoteController.editNote);

export default router;