import { sendResponse } from 'shared';
import AccountSchema from 'shared/schemas/account.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendResponse(res, 401, 'Authentication Required');
  }

  const token = authHeader.split(' ')[1];

  try {
    // const decoded = verifyAccessToken(token);
    const accountId = token;
    const account = await AccountSchema.findOne({ _id: accountId });

    if (!account) {
      return sendResponse(res, 401, 'Unauthorized');
    }
    req.account = account;
    next();
  } catch (err) {
    return sendResponse(res, 401, 'Invalid Access Token');
  }
};
