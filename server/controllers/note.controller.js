import Note from "../models/note";
import Lane from "../models/lane";
import uuid from "uuid";

export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}

export function deleteNote(req, res) {
  Note.findOne({ id: req.params.noteId }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    note.remove(err => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      Lane.findOne({ notes: note._id }).exec((err, lane) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        lane.notes.pull(note);
        lane.save(err => {
          if (err) {
            res.status(500).send(err);
            return;
          }
          res.status(200).end();
        });
      });
    });
  });
}

export function editNote(req, res) {
  Note.findOneAndUpdate(
    { id: req.params.noteId },
    { $set: { task: req.body.note.task } }
  ).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ note });
  });
}

export function moveBetweenLanes(req, res) {
  Lane.findOne({ id: req.body.sourceLaneId }).exec((err, sourceLane) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    Lane.findOne({ id: req.body.targetLaneId }).exec((err, targetLane) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      const note = sourceLane.notes.find(note => note.id === req.params.noteId);
      const sourceIndex = sourceLane.notes.indexOf(note);
      sourceLane.notes.splice(sourceIndex, 1);
      sourceLane.save(err => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        targetLane.notes.push(note);
        targetLane.save(err => {
          if (err) {
            res.status(500).send(err);
            return;
          }
          res.status(200).end();
        });
      });
    });
  });
}
