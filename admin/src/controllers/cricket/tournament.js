import { sendResponse } from 'shared';
import CricketTournamentSchema from 'shared/schemas/cricket/tournament.js';

export const createTournament = async (req, res) => {
  const tournament = await CricketTournamentSchema.create({ ...req.body });

  sendResponse(res, 200, 'success', tournament);
};
