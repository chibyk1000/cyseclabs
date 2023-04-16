import { Schema } from "mongoose";

const UnitSchema = new Schema({
  heading: {
    type: String,
    required: true,
    default: "Introduction",
  },
  description: {
    type: String,
    required: true,
    default: "Welcome to this section",
  },
  unitID: { 
    type: String,
    required: true,
    unique:true,
    
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "task",
    },
  ],
});

export default UnitSchema;
