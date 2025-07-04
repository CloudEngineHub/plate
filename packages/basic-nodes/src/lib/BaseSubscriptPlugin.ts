import { createSlatePlugin, KEYS } from 'platejs';

/** Enables support for subscript formatting. */
export const BaseSubscriptPlugin = createSlatePlugin({
  key: KEYS.sub,
  node: { isLeaf: true },
  parsers: {
    html: {
      deserializer: {
        rules: [
          { validNodeName: ['SUB'] },
          { validStyle: { verticalAlign: 'sub' } },
        ],
      },
    },
  },
  render: { as: 'sub' },
  rules: { selection: { affinity: 'directional' } },
}).extendTransforms(({ editor, type }) => ({
  toggle: () => {
    editor.tf.toggleMark(type, {
      remove: editor.getType(KEYS.sup),
    });
  },
}));
