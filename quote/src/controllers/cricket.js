import { CricketQuoteConditionSchema, QuoteSchema, sendResponse } from 'shared';
import { QuoteGame } from 'shared/schemas/quote/quote.js';

export const createQuote = async (req, res) => {
  const { minimumPoints, commission, condition, tournament, match, team } =
    req.body;

  const cricketCondition = new CricketQuoteConditionSchema({
    tournament,
    match,
    team,
    account: req.account._id,
    type: condition.type,
    over: condition.over,
    ball: condition.ball,
    run: condition.run,
    boundary: condition.boundary,
  });

  const quoteText = 'yet to create a function'; //TO-DO:

  const quote = new QuoteSchema({
    account: req.account._id,
    quoteText,
    minimumPoints,
    commission,
    game: QuoteGame.CRICKET,
    conditionRefId: cricketCondition._id,
  });

  cricketCondition.quote = quote._id;

  // transaction

  await Promise.all([await cricketCondition.save(), await quote.save()]);

  return sendResponse(res, 201, 'Qoute Created');
};

const controller = { createQuote };

export default controller;
