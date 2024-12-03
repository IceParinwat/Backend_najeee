import TeamMember from "../models/TeamMember.js";

// ดึงข้อมูลทีมเมมเบอร์ทั้งหมด
export const getTeamMembersByManager = async (req, res) => {
  try {
    const managerId = req.params.manager_id;
    const teamMembers = await TeamMember.find({ manager: managerId });

    res.json(
      teamMembers.map((member) => ({
        id: member._id,
        name: member.name,
        position: member.position,
      }))
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
