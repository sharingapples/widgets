import { getTheme } from '@sharingapples/theme';

export const theme = getTheme();
export const calendarTheme = theme.Calendar || theme;
export const textColor = calendarTheme.onBackground;
export const backgroundColor = calendarTheme.background;
export const primaryFontColor = calendarTheme.onPrimary;
export const primaryColor = calendarTheme.primary;
export const disabledFontColor = calendarTheme.disabled;
