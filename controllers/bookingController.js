import BookedSlot from "../models/BookedSlot.js";
import mongoose from "mongoose";

// ดึงข้อมูลการจองทั้งหมด
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookedSlot.find().populate("teamMember");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ดึงข้อมูลการจองตาม ID
export const getBookingById = async (req, res) => {
  const { meeting_id } = req.params; // Extract the meeting_id from the URL

  try {
    // หาข้อมูลการจองตาม meeting_id
    const booking = await BookedSlot.findById(meeting_id).populate("teamMember");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.json(booking); // ส่งข้อมูลการจอง
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// เพิ่มการจองใหม่
export const createBooking = async (req, res) => {
  const { teamMember, startTime, duration } = req.body;

  try {
    // ตรวจสอบว่า teamMember เป็น ObjectId ที่ถูกต้อง
    if (!mongoose.Types.ObjectId.isValid(teamMember)) {
      return res.status(400).json({ message: "Invalid teamMember ID" });
    }

    // แปลง startTime เป็น Date
    const start = new Date(startTime);
    if (isNaN(start)) {
      return res.status(400).json({ message: "Invalid startTime format" });
    }
    const end = new Date(start.getTime() + duration * 60000);

    // ตรวจสอบเวลาที่ทับซ้อน
    const overlappingSlot = await BookedSlot.findOne({
      teamMember: new mongoose.Types.ObjectId(teamMember), // ใช้ new ในการสร้าง ObjectId
      $or: [
        { startTime: { $lt: end, $gte: start } },
        { startTime: { $lte: start }, endTime: { $gte: start } },
      ],
    });

    if (overlappingSlot) {
      return res
        .status(400)
        .json({ message: "Time slot overlaps with an existing booking." });
    }

    const newBooking = new BookedSlot({
      teamMember: new mongoose.Types.ObjectId(teamMember), // ใช้ new ในการสร้าง ObjectId
      startTime: start,
      duration,
      endTime: end,
    });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// อัพเดตการจอง
export const updateBooking = async (req, res) => {
  const { meeting_id } = req.params;
  const { startTime, duration } = req.body;

  try {
    const booking = await BookedSlot.findById(meeting_id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // แปลง startTime เป็น Date
    const start = new Date(startTime);
    if (isNaN(start)) {
      return res.status(400).json({ message: "Invalid startTime format" });
    }
    const end = new Date(start.getTime() + duration * 60000);

    // ตรวจสอบเวลาที่ทับซ้อน
    const overlappingSlot = await BookedSlot.findOne({
      teamMember: booking.teamMember,
      _id: { $ne: meeting_id },
      $or: [
        { startTime: { $lt: end, $gte: start } },
        { startTime: { $lte: start }, endTime: { $gte: start } },
      ],
    });

    if (overlappingSlot) {
      return res
        .status(400)
        .json({ message: "Time slot overlaps with an existing booking." });
    }

    // อัพเดตการจอง
    booking.startTime = start;
    booking.duration = duration;
    booking.endTime = end;
    await booking.save();

    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ลบการจอง
export const deleteBooking = async (req, res) => {
  const { meeting_id } = req.params;

  try {
    const booking = await BookedSlot.findById(meeting_id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    await booking.remove();
    res.json({ message: "Booking deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
