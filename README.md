# React Native Widgets
Widgets Collection

## Installation
You can install the entire set with
> `yarn add @sharingapples/widgets`

```javascript
import { StatusBar, BottomNavigation } from '@sharingapples/widgets';
```

Or you can install specific widget as required
> `yarn add @sharingapples/status-bar`

> `yarn add @sharingapples/bottom-navigation`

```javascript
import StatusBar from '@sharingapples/status-bar';
import BottomNavigation from '@sharingapples/bottom-navigation';
```

The theme library is not included in the main collection and has to
be installed separately in the app. Also note that the `theme` library
should be used as **peerDependency** in any library it is used.

**IMPORTANT**

*When setting the theme, make sure you do it in the main entry point
`index.js` file, and also make sure you load the app after the theme
has been set with `require` and not `import`. The `import`s are hoisted
on to the top by babel and hence, the theme would not have been set.*

### Using the standard theme library
1. Setting the theme in application
```javascript
import { setTheme, getTheme } from '@sharingapples/theme';
const theme = getTheme();
// Set the theme as per your application
setTheme(Object.assign(theme, { primary: '#ff00ff' }));

// Finally require your main app. It is important that you
// setTheme before the app is required, and Use **require**,
// the **import** will be hoisted to the top by babel and
// all the libraries will get the Theme before it is set.
require('./app');
```

2. Using the colors provided by the theme
```javascript
import { getTheme } from '@sharingapples/theme';

const theme = getTheme();
const backgroundColor = theme.surface;
const textColor = theme.onSurface;
```

## StatusBar
Display a StatusBar with title, incorporating the native status bar.
Support iPhoneX notch.

### Usage
```jsx
import StatusBar from '@sharingapples/status-bar'
// import { StatusBar } from '@sharingapples/widgets'

const Profile = () => (
  <View>
    <StatusBar title="Profile" backgroundColor="red" light />
    <....>
  </View>
);
```

## BottomNavigation
Display a bottom navigation bar with specific screen types.

### Usage
```jsx
import BottomNavigation from '@sharingapples/bottom-navigation'
// import { BottomNavigation } from '@sharingapples/widgets';

const App = () => (
  <BottomNavigation home={Inbox}>
    <BottomNavigation.Item title="Inbox" icon={inbox} screen={Inbox} />
    <BottomNavigation.Item title="Profile" icon={profile} screen={Profile} />
  </BottomNavigation>
);
```

## Calendar
Display a calendar component with select and multiSelect features, [Details](packages/Calendar/README.md)

### Usage
```jsx
import React, { useState } from 'react';
import BottomNavigation from '@sharingapples/calendar';

function App() {
  const [value, setValue] = useState(new Date());
  return (
      <Calendar value={value} setValue={setValue} />
  )
}
```