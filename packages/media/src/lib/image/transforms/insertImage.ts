import type { InsertNodesOptions, SlateEditor, TImageElement } from 'platejs';

import { KEYS } from 'platejs';

export const insertImage = (
  editor: SlateEditor,
  url: ArrayBuffer | string,
  options: InsertNodesOptions = {}
) => {
  const text = { text: '' };
  const image: TImageElement = {
    children: [text],
    type: editor.getType(KEYS.img),
    url: url as any,
  };
  editor.tf.insertNodes<TImageElement>(image, {
    nextBlock: true,
    ...(options as any),
  });
};
