### Example Usage
```jsx
import React from 'react';
import BottomNavigation from '@sharingapples/bottom-navigation';
// import { BottomNavigation } from '@sharingapples/widgets';
import { Screen1, Screen2, Screen3 } from './screens';

export default function App() {
  return (
    <BottomNavigation home={Screen2}>
      <BottomNavigation.Item title="Screen1" icon={Screen1.icon} screen={Screen1} />
      <BottomNavigation.Item title="Screen2" icon={Screen2.icon} screen={Screen2} />
      <BottomNavigation.Item title="Screen3" icon={Screen3.icon} screen={Screen3} />
    </BottomNavigation>
  );
}
```