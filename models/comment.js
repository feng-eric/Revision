const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchema = new Schema(
  {
    username: { type : String },
    document_name: { type : String },
    text: { type : String }
  },
  {
    // createdAt,updatedAt fields are automatically added into records
    timestamps: true
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

