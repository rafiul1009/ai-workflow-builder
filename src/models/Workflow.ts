import mongoose from 'mongoose';

const workflowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  nodes: {
    type: [{
      id: String,
      type: String,
      position: {
        x: Number,
        y: Number,
      },
      data: {
        label: String,
        config: mongoose.Schema.Types.Mixed,
      },
    }],
    required: true,
  },
  edges: {
    type: [{
      id: String,
      source: String,
      target: String,
      sourceHandle: String,
      targetHandle: String,
    }],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

workflowSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Workflow = mongoose.models.Workflow || mongoose.model('Workflow', workflowSchema);