import { connect } from 'react-redux';
import Lane from './Lane';

import * as laneActions from './LaneActions';
import { createNote } from '../Note/NoteActions';

// import { deleteLane, updateLane, editLane } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
});

const mapDispatchToProps = {
  ...laneActions,
  updateLane: laneActions.updateLaneRequest,
  deleteLane: laneActions.deleteLaneRequest,
  addNote: createNoteRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);