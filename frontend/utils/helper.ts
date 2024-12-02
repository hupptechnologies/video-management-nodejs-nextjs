export const getThumbnailUrl = (videoUrl: string) => {
	const urlParts = videoUrl.split('.mp4');

	const thumbnailUrl = `${urlParts[0]}.jpg`;

	return thumbnailUrl;
};

class AppLocalStorage {
	getItem (key: string) {
		if(typeof window !== 'undefined') {
			return localStorage.getItem(key);
		}
		return null;
	}
}

export const appLocalStorage = new AppLocalStorage();

export const timeAgo = (dateString: string): string => {
	const date = new Date(dateString);
	const now = new Date();
	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (seconds < 60) {
		return 'a few seconds ago';
	} else if (seconds < 3600) {
		const minutes = Math.floor(seconds / 60);
		return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
	} else if (seconds < 86400) {
		const hours = Math.floor(seconds / 3600);
		return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
	}else if (seconds < 2592000) {
		const days = Math.floor(seconds / 86400);
		return `${days} ${days === 1 ? 'day' : 'days'} ago`;
	} else if (seconds < 31536000) {
		const months = Math.floor(seconds / 2592000);
		return `${months} ${months === 1 ? 'month' : 'months'} ago`;
	} else {
		const years = Math.floor(seconds / 31536000);
		return `${years} ${years === 1 ? 'year' : 'years'} ago`;
	}
};

