import { connect } from 'react-redux';
import Notes from './Notes';
// import * as noteActions from '../Note/NoteActions';

import { deleteNote, createNote, createNotes, createNoteRequest, updateNote, deleteNoteRequest, editNote, updateNoteRequest, moveWithinLane } from "../Note/NoteActions";

const mapDispatchToProps = {
  editNote,
  updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
  addNote: createNoteRequest,
  moveWithinLane,
};


// const mapDispatchToProps = {
//   onValueClick: editNote,
//   onUpdate: updateNoteRequest,
//   onDelete: deleteNoteRequest,
//   addNote: createNoteRequest,
//   moveWithinLane,
// };

export default connect(
  null,
  mapDispatchToProps
)(Notes);