import { connect } from 'react-redux';
import Notes from './Notes';
// import * as noteActions from '../Note/NoteActions';

import { deleteNote, createNote, createNotes, createNoteRequest, updateNote } from "../Note/NoteActions";

const mapDispatchToProps = {
  deleteNote,
  addNote: createNoteRequest,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);