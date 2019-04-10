import { setTheme } from '@sharingapples/theme';
import material from '@sharingapples/theme/stock/material';

setTheme(Object.assign(material, { onDisabled: 'grey' }));

require('./showcase');
