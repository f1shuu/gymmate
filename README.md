# GymMate

A mobile fitness companion for creating custom workouts, tracking progress, and staying consistent with training routines.

## Features

- create custom exercises with multiple muscle groups and rep-based or time-based variants,
- build workout plans, arrange exercise order, and follow guided set-by-set sessions,
- save body measurements and track essential workout statistics,
- use the BMI calculator with visual guidance, expression calculator, and unit converters,
- use a haptic-enabled timer with an optional sound alarm and a stopwatch with lap tracking,
- personalize the language, units, theme, sound, and vibration settings.

## Installation

1. **Clone this repository**

   ```bash
   git clone git@github.com:f1shuu/gymmate.git
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the project**

   ```bash
   npx expo start
   ```

## Download

You can download the latest Android APK from the [Releases](https://github.com/f1shuu/gymmate/releases) page.

## Screenshots

<div align="center" style="display:flex;justify-content:center;gap:10px;flex-wrap:nowrap;">
    <img src="assets/images/readme/exercises-screen.jpg" alt="Exercises screen" width="250"/>
    <img src="assets/images/readme/home-screen.jpg" alt="Home screen" width="250"/>
    <img src="assets/images/readme/settings.jpg" alt="Settings screen" width="250"/>
</div>

## Tech Stack

- **React Native 0.81** and **React 19** for the mobile interface,
- **Expo SDK 54** for development, native APIs, and application builds,
- **React Navigation 7** for tab and stack navigation,
- **AsyncStorage** for persistent local settings and domain data,
- **Expo modules** for audio, fonts, haptics, localization, assets, and gradients,
- **React Native Gesture Handler** and **React Native SVG** for gestures and visual components.

## License

This project is licensed under the MIT License.
