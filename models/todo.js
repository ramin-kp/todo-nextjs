const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Todo || mongoose.model("Todo", schema);

export default model;
