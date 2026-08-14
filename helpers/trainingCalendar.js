const COMPLETED_TRAINING_CATEGORY = 'training_completed';

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

export const compareMonths = (first, second) => (first.getFullYear() * 12 + first.getMonth()) - (second.getFullYear() * 12 + second.getMonth())

export const toLocalDateKey = (value) => {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const getWeekStart = (value) => {
    const date = value instanceof Date ? new Date(value) : new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
    return date;
}

export const getWeekKey = (value) => {
    const weekStart = getWeekStart(value);
    return weekStart ? toLocalDateKey(weekStart) : null;
}

export const getCompletedTrainingRecords = (history) => history.filter(record => (
    record?.category === COMPLETED_TRAINING_CATEGORY
    && !Number.isNaN(new Date(record.createdAt).getTime())
))

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

export const getMonthWeekKeys = (month) => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const firstMonday = getWeekStart(firstDay);

    return Array.from({ length: 6 }, (_, index) => {
        const week = new Date(firstMonday);
        week.setDate(week.getDate() + index * 7);
        return toLocalDateKey(week);
    })
}

export const getMonthTrainingData = (history, month) => {
    const records = getCompletedTrainingRecords(history).filter(record => {
        const date = new Date(record.createdAt);
        return date.getFullYear() === month.getFullYear() && date.getMonth() === month.getMonth();
    })

    return {
        count: records.length,
        markedDates: new Set(records.map(record => toLocalDateKey(record.createdAt)).filter(Boolean))
    }
}

export const getTrainingTotals = (history) => {
    const records = getCompletedTrainingRecords(history);
    return {
        trainingsTotal: records.length,
        liftedKgsTotal: Math.round(records.reduce((total, record) => (
            total + (Number(record.data?.liftedKgs) || 0)
        ), 0))
    }
}

export const getStreakWeekKeys = (history) => {
    const workoutsByWeek = getCompletedTrainingRecords(history).reduce((weeks, record) => {
        const weekKey = getWeekKey(record.createdAt);
        if (weekKey) weeks.set(weekKey, (weeks.get(weekKey) || 0) + 1);
        return weeks;
    }, new Map())

    return new Set(
        [...workoutsByWeek.entries()]
            .filter(([, workoutCount]) => workoutCount >= 3)
            .map(([weekKey]) => weekKey)
    )
}

export const getCurrentWeeklyStreak = (history, today = new Date()) => {
    const streakWeeks = getStreakWeekKeys(history);
    let cursor = getWeekStart(today);
    if (!cursor) return 0;

    if (!streakWeeks.has(toLocalDateKey(cursor))) cursor.setDate(cursor.getDate() - 7);

    let streak = 0;
    while (streakWeeks.has(toLocalDateKey(cursor))) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 7);
    }
    return streak;
}

export const getLocalizedMonthTitle = (month, language) => {
    const title = new Intl.DateTimeFormat(language === 'pl' ? 'pl-PL' : 'en-US', {
        month: 'long',
        year: 'numeric'
    }).format(month);

    return title.charAt(0).toUpperCase() + title.slice(1);
}