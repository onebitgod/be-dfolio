import { sendResponse } from 'shared';
import CricketMatchSchema from 'shared/schemas/cricket/match.js';

export const createMatch = async (req, res) => {
  const match = await CricketMatchSchema.create({ ...req.body });

  sendResponse(res, 200, 'success', match);
};
