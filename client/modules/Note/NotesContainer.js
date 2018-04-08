import { connect } from 'react-redux';
import Notes from './Notes';
// import * as noteActions from '../Note/NoteActions';

// import { deleteNote, createNote, createNotes, createNoteRequest, updateNote, deleteNoteRequest, editNote, updateNoteRequest } from "../Note/NoteActions";

// const mapDispatchToProps = {
//   editNote,
//   updateNote: updateNoteRequest,
//   deleteNote: deleteNoteRequest,
//   addNote: createNoteRequest
// };

import { deleteNoteRequest, editNote, updateNoteRequest, moveWithinLane } from '../Note/NoteActions';

const mapDispatchToProps = {
  onValueClick: editNote,
  onUpdate: updateNoteRequest,
  onDelete: deleteNoteRequest,
  moveWithinLane,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);