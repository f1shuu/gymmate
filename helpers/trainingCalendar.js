export const startOfMonth = (date = new Date()) => new Date(
    date.getFullYear(),
    date.getMonth(),
    1
)

export const addMonths = (date, amount) => new Date(
    date.getFullYear(),
    date.getMonth() + amount,
    1
)

export const compareMonths = (first, second) => (first.getFullYear() * 12 + first.getMonth()) - (second.getFullYear() * 12 + second.getMonth());

export const toLocalDateKey = (value) => {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const getMonthCalendar = (month) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const mondayFirstOffset = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
    const cells = Array(42).fill(null);

    for (let day = 1; day <= daysInMonth; day += 1) {
        cells[mondayFirstOffset + day - 1] = new Date(year, monthIndex, day);
    }

    return cells;
}

export const getMonthTrainingData = (history, month) => {
    const records = history.filter(record => {
        const date = new Date(record.createdAt);
        return !Number.isNaN(date.getTime()) && date.getFullYear() === month.getFullYear() && date.getMonth() === month.getMonth();
    })

    return {
        count: records.length,
        markedDates: new Set(records.map(record => toLocalDateKey(record.createdAt)).filter(Boolean))
    }
}

export const getLocalizedMonthTitle = (month, language) => {
    const title = new Intl.DateTimeFormat(language === 'pl' ? 'pl-PL' : 'en-US', {
        month: 'long',
        year: 'numeric'
    }).format(month)

    return title.charAt(0).toUpperCase() + title.slice(1);
}