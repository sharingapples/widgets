# React Native Widgets

## StatusBar
Display a StatusBar with title, incorporating the native status bar.
Support iPhoneX notch.

### Usage
```jsx
import { StatusBar } from '@bhoos/widgets'

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
import { BottomNavigation } from '@bhoos/widgets';

const App = () => (
  <BottomNavigation defaultScreen={Inbox} tintColor="white">
    <BottomNavigation.Item title="Inbox" icon={inbox} screen={Inbox} />
    <BottomNavigation.Item title="Profile" icon={profile} screen={Profile} />
  </BottomNavigation>
);
```