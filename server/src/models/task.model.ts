import { Schema, Document, model } from 'mongoose';

interface Task extends Document {
  author: string;
  content: string;
  createdBy: string;
  updatedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const TaskModel = model<Task>('Task', TaskSchema);
export { TaskModel };
