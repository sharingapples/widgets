import { setTheme } from '@sharingapples/theme';
import material from '@sharingapples/theme/stock/material';

setTheme(Object.assign(material, {
  disable: 'grey',
  primary: '#3C800A',
  onPrimary: 'white',
  surface: '#fff',
  onSurface: '#000',
  background: '#fff',
  onBackground: '#000',
}));

require('./showcase');
