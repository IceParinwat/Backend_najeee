import express from "express";
import { getTeamMembersByManager } from "../controllers/teamMemberController.js";
const router = express.Router();

// เส้นทาง: GET /api/team-members/:manager_id
router.get("/:manager_id", getTeamMembersByManager);

export default router;
