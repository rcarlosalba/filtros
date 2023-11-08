import { generateClasses } from '@formkit/themes';
import style from './tailwind-theme';

const theme = {
  config: {
    classes: generateClasses(style),
  },
};

export default theme;
