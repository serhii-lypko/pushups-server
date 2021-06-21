import mongoose from "mongoose";

export const resultCommitSchema = new mongoose.Schema(
  {
    id: String,
    kind: String,
    count: Number,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const ResultCommit = mongoose.model("result-commit", resultCommitSchema);
