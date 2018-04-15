import { connect } from "react-redux";
import Lane from "./Lane";
import { compose } from "redux";
import { DropTarget } from "react-dnd";
import ItemTypes from "../Kanban/itemTypes";

// import * as laneActions from './LaneActions';

import {
  deleteLane,
  updateLane,
  editLane,
  deleteLaneRequest,
  updateLaneRequest,
  moveBetweenLanesRequest
} from "./LaneActions";
import { createNoteRequest } from "../Note/NoteActions";

const noteTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const { id: noteId, laneId: sourceLaneId } = sourceProps;

    targetProps.moveBetweenLanesRequest(
      noteId,
      sourceLaneId,
      targetProps.lane.id
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
});

const mapDispatchToProps = {
  editLane,
  updateLane: updateLaneRequest,
  deleteLane: deleteLaneRequest,
  addNote: createNoteRequest,
  moveBetweenLanesRequest
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, dragConnect => ({
    connectDropTarget: dragConnect.dropTarget()
  }))
)(Lane);
