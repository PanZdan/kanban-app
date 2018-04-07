import { connect } from 'react-redux';
import Lane from './Lane';

// import * as laneActions from './LaneActions';

import { deleteLane, updateLane, editLane, deleteLaneRequest, updateLaneRequest } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
});

const mapDispatchToProps = {
  editLane,
  updateLane: updateLaneRequest,
  deleteLane: deleteLaneRequest,
  addNote: createNoteRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);