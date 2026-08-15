export const achievements = [
    {
        id: 'first_exercise',
        nameKey: 'achievementFirstExerciseName',
        descriptionKey: 'achievementFirstExerciseDescription',
        icon: 'fitness-center',
        isUnlocked: ({ exercisesCount }) => exercisesCount >= 1
    },
    {
        id: 'exercise_collection',
        nameKey: 'achievementExerciseCollectionName',
        descriptionKey: 'achievementExerciseCollectionDescription',
        icon: 'library-add',
        isUnlocked: ({ exercisesCount }) => exercisesCount >= 5
    },
    {
        id: 'first_measurement',
        nameKey: 'achievementFirstMeasurementName',
        descriptionKey: 'achievementFirstMeasurementDescription',
        icon: 'straighten',
        isUnlocked: ({ measurementsCount }) => measurementsCount >= 1
    },
    {
        id: 'first_workout',
        nameKey: 'achievementFirstWorkoutName',
        descriptionKey: 'achievementFirstWorkoutDescription',
        icon: 'emoji-events',
        isUnlocked: ({ trainingsTotal }) => trainingsTotal >= 1
    },
    {
        id: 'five_workouts',
        nameKey: 'achievementFiveWorkoutsName',
        descriptionKey: 'achievementFiveWorkoutsDescription',
        icon: 'military-tech',
        isUnlocked: ({ trainingsTotal }) => trainingsTotal >= 5
    },
    {
        id: 'ten_workouts',
        nameKey: 'achievementTenWorkoutsName',
        descriptionKey: 'achievementTenWorkoutsDescription',
        icon: 'workspace-premium',
        isUnlocked: ({ trainingsTotal }) => trainingsTotal >= 10
    },
    {
        id: 'lifted_tonne',
        nameKey: 'achievementLiftedTonneName',
        descriptionKey: 'achievementLiftedTonneDescription',
        icon: 'monitor-weight',
        isUnlocked: ({ liftedKgsTotal }) => liftedKgsTotal >= 1000
    },
    {
        id: 'weekly_streak',
        nameKey: 'achievementWeeklyStreakName',
        descriptionKey: 'achievementWeeklyStreakDescription',
        icon: 'local-fire-department',
        isUnlocked: ({ streakWeeksCount }) => streakWeeksCount >= 1
    }
]