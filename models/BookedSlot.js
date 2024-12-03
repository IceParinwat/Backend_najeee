import mongoose from "mongoose";

const bookedSlotSchema = new mongoose.Schema({
  teamMember: { type: mongoose.Schema.Types.ObjectId, ref: "TeamMember", required: true },
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  endTime: { type: Date, required: true },
});


const bookedSlotModel =
  mongoose.models.BookedSlot || mongoose.model("BookedSlot", bookedSlotSchema);

export default bookedSlotModel;
