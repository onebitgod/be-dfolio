import { sendResponse } from 'shared';
import CricketTeamSchema from 'shared/schemas/cricket/team.js';

export const createTeam = async (req, res) => {
  const team = await CricketTeamSchema.create({ ...req.body });

  sendResponse(res, 200, 'success', team);
};
