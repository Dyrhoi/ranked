import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const recentTime = (date: Date) => {
	return dayjs(date).fromNow();
};
