// Each theme should consist of seven colors:
// primary, secondary, tertiary, background, textHeader, textPrimary and textSecondary.

// COLOR'S NAME  | USED IN
// primary       | app's main theme, header, the upper part of all gradients, active icons, buttons
// secondary     | navbar, lower part of all gradients
// tertiary      | all inactive (non-text) elements
// background    | all widgets, including Setting, Tool etc.
// textPrimary   | 90% of the app's text
// textSecondary | hints and smaller texts
// textHeader    | headers and subheaders, buttons

// IMPORTANT: no red or green themes are allowed, since they would collide with already declared colors for add and remove buttons/icons (see: Colors.js).

export const GymMate = {
    primary: '#3533CD',
    secondary: '#000000',
    tertiary: '#696969',
    background: '#121212',
    textHeader: '#DDDDDD',
    textPrimary: '#DDDDDD',
    textSecondary: '#777777'
}

export const Sky = {
    primary: '#376DEC',
    secondary: '#CCCCCC',
    tertiary: '#696969',
    background: '#DDDDDD',
    textHeader: '#DDDDDD',
    textPrimary: '#121619',
    textSecondary: '#777777'
}