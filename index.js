import { setTheme } from '@sharingapples/theme';
import material from '@sharingapples/theme/stock/material';

setTheme(Object.assign(material, { primary: '#ffff00', onPrimary: 'black' }));

require('./showcase');
