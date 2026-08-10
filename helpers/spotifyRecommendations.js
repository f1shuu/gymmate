const SPOTIFY_URL_PATTERN = /^https:\/\/open\.spotify\.com\/(playlist|show|episode)\/[A-Za-z0-9]+(?:[/?#].*)?$/;

export const getAvailableSpotifyItems = (items) => items.filter(item => (
    item.enabled !== false
    && typeof item.url === 'string'
    && SPOTIFY_URL_PATTERN.test(item.url.trim())
))

export const getSpotifyItemTitle = (item, language) => {
    if (!item) return '';
    if (typeof item.title === 'string') return item.title;
    return item.title?.[language] || item.title?.en || item.title?.pl || '';
}

export const getSpotifyItemAuthor = (item) => (
    typeof item?.author === 'string' ? item.author.trim() : ''
)

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const WEEK_IN_MS = 7 * DAY_IN_MS;

const getLocalDayIndex = (date) => Math.floor(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
) / DAY_IN_MS)

const getLocalWeekIndex = (date) => {
    const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
    return Math.floor(Date.UTC(
        monday.getFullYear(),
        monday.getMonth(),
        monday.getDate()
    ) / WEEK_IN_MS)
}

export const selectDailyItem = (items, date = new Date()) => {
    if (items.length === 0) return null;
    return items[Math.abs(getLocalDayIndex(date)) % items.length];
}

export const selectWeeklyItem = (items, date = new Date()) => {
    if (items.length === 0) return null;
    return items[Math.abs(getLocalWeekIndex(date)) % items.length];
}