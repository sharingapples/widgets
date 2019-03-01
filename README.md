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

## BottomPopup
A popup window for displaying content at the bottom of the screen.

### Props
* **visible**: Control popup display
* **title**: Title text or title component
* **titleBack**: Title bar background color
* **titleColor**: Title bar text color
* **height**: Height of popup in pixels
* **onClose**: Close button press event

### Usage
```jsx
import { BottomPopup } from '@bhoos/widgets';

const App = () => (
  <View>
    <BottomPopup
      visible={visible}
      height={200}
      onClose={() => this.setState({ visible: false })}
      title="Popup Title" titleBack="black"
      titleColor="white"
    >
      {content}
    </BottomPopup>
  </View>
)
```