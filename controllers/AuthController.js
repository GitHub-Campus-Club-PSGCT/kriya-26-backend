import Team from "../models/Team.js";

export const loginTeam = async (req, res) => {
  try {

    const { kriyaId, email } = req.body;

    if (!kriyaId || !email) {
      return res.status(400).json({
        success: false,
        message: "Kriya ID and Email are required"
      });
    }

    // Find Team
    const team = await Team.findOne({ kriyaID: kriyaId });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Invalid Kriya ID"
      });
    }

    // Email Check
    if (team.regMail !== email) {
      return res.status(401).json({
        success: false,
        message: "Email does not match registered email"
      });
    }

    // Assign random set if not already assigned
    if (!team.setNo || team.setNo === "") {

      const randomSet = Math.floor(Math.random() * 6) + 1;

      team.setNo = randomSet;

      await team.save();

      console.log(`Set ${randomSet} assigned to ${team.kriyaID}`);

    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      team: {
        teamName: team.teamName,
        kriyaID: team.kriyaID,
        shipConfig: team.shipConfig,
        currentIsland: team.currentIsland,
        setNo: team.setNo
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};