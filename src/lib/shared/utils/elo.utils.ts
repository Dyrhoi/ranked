import type { Outcome } from '$lib/server/services/game.service';

const getRatingDelta = (rating: number, opponentRatings: number[], outcome: Outcome) => {
	const averageOpponentRating = opponentRatings.reduce((a, b) => a + b, 0) / opponentRatings.length;
	const expectedScore = 1 / (1 + 10 ** ((averageOpponentRating - rating) / 400));
	const kFactor = 32;
	return kFactor * (outcome - expectedScore);
};

export const getNewRating = (rating: number, opponentRatings: number[], outcome: Outcome) => {
	return Math.round(rating + getRatingDelta(rating, opponentRatings, outcome));
};
