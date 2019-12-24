import { DeserializeHtml } from 'slate-plugins';
import { MARK_CODE } from './types';

export const deserializeInlineCode = (): DeserializeHtml => ({
  leaf: {
    CODE: () => ({ [MARK_CODE]: true }),
    KBD: () => ({ [MARK_CODE]: true }),
  },
});
