import {
  Schema, Document, model,
} from 'mongoose';

interface Task extends Document {
  sessionId: string;
  data: {
    request: object;
    response: object;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
  },
  data: {
    type: {
      request: Object,
      response: Object,
    },
    required: true,
  },
}, {
  timestamps: true,
});

const TaskModel = model<Task>('Task', TaskSchema);
export { TaskModel };
