import {
  Schema, Document, model,
} from 'mongoose';

interface Assignment extends Document {
  taskId: string;
  accountId: string;
  status: string; // FIXME: define enum.
  createdAt?: Date;
  updatedAt?: Date;
}

const AssignmentSchema = new Schema({
  taskId: {
    type: String,
    required: true,
  },
  accountId: {
    type: String,
    required: true,
  },
  status: {
    type: String, // FIXME: define enum.
    required: true,
  },
}, {
  timestamps: true,
});

const AssignmentModel = model<Assignment>('Assignment', AssignmentSchema);
export { AssignmentModel };
