import type { Outcome } from '$lib/server/services/game.service';

const getRatingDelta = (rating: number, opponentRating: number[], outcome: Outcome) => {
	const expectedScore = opponentRating.reduce(
		(acc, r) => acc + 1 / (1 + 10 ** ((r - rating) / 400)),
		0
	);
	const kFactor = 32;
	return kFactor * (outcome - expectedScore);
};

export const getNewRating = (rating: number, opponentRating: number[], outcome: Outcome) => {
	return Math.round(rating + getRatingDelta(rating, opponentRating, outcome));
};
