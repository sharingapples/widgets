# Calendar

## Dependencies

- @sharingapples/theme : standard theme packages , used in component for color definition.
  - primary: the app/ brand color , border color for selected dates
  - onPrimary: the font color with background primary color
  - disableSurface: disable color
  - background: default background color of app
  - onBackground: default font color of app

## Props
- value: a single date or an array of Dates
- setValue: a setter function for above mentioned value

## Usage

1) Include @sharingapples/theme  package in the project
2) Define custom theme
3) Provide the component with the props

## Example

- Light Theme (default)

  - Output (single select)

  ![Alt text](docs/light.png?raw=true "Single Select Light theme")

  - Output (multiple select)

  ![Alt text](docs/lightMultiple.png?raw=true "Multiple Select Light theme")

- Dark Theme (custom)

  - Define the custom theme in app entry level
    ```jsx

      import { setTheme } from '@sharingapples/theme';

      const darkTheme = {
        brand: '#b00020',
        primary: '#dfe38e',
        primaryVariant: '#efca8c',
        onPrimary: '#ffffff',

        secondary: '#03dac6',
        secondaryVariant: '#018786',
        onSecondary: '#000000',

        background: '#000000', /* default background to black */
        onBackground: '#ffffff', /* default fontColor to white */

        surface: '#000000', /* default background to black */
        onSurface: '#ffffff', /* default fontColor to white */

        error: '#b00020',
        onError: '#ffffff',
        disableSurface: '#808080',
      };

      setTheme(darkTheme);

      require('./App');

    ```

  - Output

    ![Alt text](docs/dark.png?raw=true "Single Select Dark theme")

  - Output (multiple select)

    ![Alt text](docs/darkMultiple.png?raw=true "Multiple Select Dark theme")