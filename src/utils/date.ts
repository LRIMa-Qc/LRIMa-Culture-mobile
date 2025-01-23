import { t } from 'i18next';

export const transformDate = (date: Date): string => {
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();

	const diffSeconds = Math.floor(diffMs / 1000);
	const diffMinutes = Math.floor(diffMs / (1000 * 60));
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffDays >= 1) {
		if (diffDays < 7) {
			return t('iot.project.summary.time.day', {
				time: diffDays,
				plural: diffDays > 1 ? 's' : '',
			});
		} else if (diffDays < 30) {
			const weeks = Math.floor(diffDays / 7);
			return t('iot.project.summary.time.week', {
				time: weeks,
				plural: weeks > 1 ? 's' : '',
			});
		} else if (diffDays < 365) {
			const months = Math.floor(diffDays / 30);
			return t('iot.project.summary.time.month', {
				time: months,
				plural: months > 1 ? 's' : '',
			});
		} else {
			const years = Math.floor(diffDays / 365);
			return t('iot.project.summary.time.year', {
				time: years,
				plural: years > 1 ? 's' : '',
			});
		}
	} else if (diffHours >= 1) {
		return t('iot.project.summary.time.hour', {
			time: diffHours,
			plural: diffHours > 1 ? 's' : '',
		});
	} else if (diffMinutes >= 1) {
		return t('iot.project.summary.time.minute', {
			time: diffMinutes,
			plural: diffMinutes > 1 ? 's' : '',
		});
	} else {
		return t('iot.project.summary.time.second', {
			time: diffSeconds,
			plural: diffSeconds > 1 ? 's' : '',
		});
	}
};