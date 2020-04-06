const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const AutoIncrement = require("mongoose-sequence")(mongoose);

let documentSchema = new Schema(
  {
    document_id: { type: Number, default: 0 },
    document_name: { type: String },
    description: { type: String },
    fileLink: { type: String },
    s3_key: { type: String },
    user_id: { type: mongoose.Schema.Types.ObjectId },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    // createdAt,updatedAt fields are automatically added into records
    timestamps: true
  }
);

// documentSchema.plugin(AutoIncrement, { inc_field: "document_id" });

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;

/* The mongoose-sequence creates a commodity collection named 'counters' which keeps track of the auto-incremental number. So during development to reset the go_id back to 1, I just have to drop the counter collection by running db.counters.drop()  */
