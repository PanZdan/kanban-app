import mongoose from 'mongoose';
import Note from '../models/note';

const Schema = mongoose.Schema;

const laneSchema = new Schema({
  name: { type: 'String', required: true },
  notes: [{ type: Schema.ObjectId, ref: 'Note', required: true }],
  id: { type: 'String', required: true, unique: true },
});
mongoose.plugin(schema => { schema.options.usePushEach = true });


function populateNotes(next) {
  this.populate('notes');
  next();
}

function deleteLane(next) {
  const notesInlane = this.notes;
  notesInlane.forEach(note => {
    Note.findByIdAndRemove(note._id).exec()
  });
}

laneSchema.pre('find', populateNotes);
laneSchema.pre('findOne', populateNotes);
laneSchema.post('exec', deleteLane);

export default mongoose.model('Lane', laneSchema);