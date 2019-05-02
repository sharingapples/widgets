import { setTheme } from '@sharingapples/theme';
import material from '@sharingapples/theme/stock/material';

setTheme(Object.assign(material, {
  disable: 'grey',
  primary: '#ffff00',
  onPrimary: 'black',
  surface: '#333',
  onSurface: '#fff',
  background: '#000',
  onBackground: '#fff',
}));

require('./showcase');
