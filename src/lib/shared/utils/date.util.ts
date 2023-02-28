import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const recentTime = (date: Date) => {
	return dayjs(date).fromNow();
};

export const getCurrentSeason = () => {
	// 0 indexed - humanize it a bit.
	const currentMonth = dayjs().month() + 1;
	const seasons: Record<string, number[]> = {
		Winter: [12, 1, 2],
		Spring: [3, 4, 5],
		Summer: [6, 7, 8],
		Fall: [9, 10, 11],
	};
	const currentSeason =
		Object.keys(seasons).find((season) => seasons[season].includes(currentMonth)) || 'Unknown';
	return currentSeason;
};
