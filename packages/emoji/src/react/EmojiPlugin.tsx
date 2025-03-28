import { toPlatePlugin } from '@udecode/plate/react';

import { BaseEmojiInputPlugin, BaseEmojiPlugin } from '../lib';

export const EmojiInputPlugin = toPlatePlugin(BaseEmojiInputPlugin);

export const EmojiPlugin = toPlatePlugin(BaseEmojiPlugin, {
  plugins: [EmojiInputPlugin],
});
