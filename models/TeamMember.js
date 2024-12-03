import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
});

const teamMemberModel =
  mongoose.models.TeamMember || mongoose.model("TeamMember", teamMemberSchema);

export default teamMemberModel;
