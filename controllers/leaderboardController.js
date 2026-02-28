import Leaderboard from "../models/leaderboard.js";

export const getLeaderboard = async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 });
    res.json(leaderboard);
  } catch (err) {
    res.status(400).json({ msg: "Error fetching leaderboard", error: err });
  }
};

export const getTeamLeaderboard = async (req, res) => {
  try {
    const team = await Leaderboard.findOne({ teamId: req.params.id });
    if (!team) return res.status(404).json({ msg: "Team not found" });
    res.json(team);
  } catch (err) {
    res.status(400).json({ msg: "Error fetching team leaderboard", error: err });
  }
};

export const adjustScore = async (req, res) => {
  try {
    const { teamId, delta } = req.body;
    const team = await Leaderboard.findOne({ teamId });
    if (!team) return res.status(404).json({ msg: "Team not found" });

    team.totalScore += delta;
    await team.save();
    res.json(team);
  } catch (err) {
    res.status(400).json({ msg: "Error adjusting score", error: err });
  }
};
