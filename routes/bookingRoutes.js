import express from "express";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

// เส้นทาง: GET /api/book
router.get("/", getAllBookings);

// เส้นทาง: POST /api/book
router.post("/", createBooking);
// เส้นทาง: GET /api/book/:id
router.get("/bookings/:meeting_id", getBookingById);
// เส้นทาง: PUT /api/book/:meeting_id
router.put("/:meeting_id", updateBooking);

// เส้นทาง: DELETE /api/book/:meeting_id
router.delete("/:meeting_id", deleteBooking);

export default router;
