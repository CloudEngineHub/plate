import type { Operation, SlateEditor } from 'platejs';
import type * as Y from 'yjs';

import { type YjsEditor, withYjs } from '@slate-yjs/core';

export type WithYjsOptions = {
  /**
   * Whether to automatically connect to providers.
   *
   * @default false
   */
  autoConnect?: boolean;
  /** Origin used when applying local slate operations to yjs. */
  localOrigin?: unknown;
  /** Origin used when storing positions. */
  positionStorageOrigin?: unknown;
};

export type YjsEditorProps = {
  storeLocalChange: (op: Operation) => void;
} & Pick<
  YjsEditor,
  | 'applyRemoteEvents'
  | 'connect'
  | 'disconnect'
  | 'flushLocalChanges'
  | 'isLocalOrigin'
  | 'localOrigin'
  | 'positionStorageOrigin'
  | 'sharedRoot'
>;

export const withTYjs = (
  editor: SlateEditor,
  sharedRoot: Y.XmlText,
  options?: WithYjsOptions
) =>
  withYjs(editor as any, sharedRoot, options) as SlateEditor & YjsEditorProps;
