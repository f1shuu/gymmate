export const translateToPolish = (input) => {
    const translations = [
        { en: 'muscleGroup', pl: 'Grupa mięśni' },
        { en: 'type', pl: 'Typ' },
        { en: 'setsAmount', pl: 'Ilość serii' },
        { en: 'repsAmount', pl: 'Ilość powtórzeń' },
        { en: 'restTime', pl: 'Czas odpoczynku' },
        { en: 'weight', pl: 'Obciążenie' },
        { en: 'time', pl: 'Czas' }
    ]

    const match = translations.find(item => item.en === input);

    return match ? match.pl : input;
}