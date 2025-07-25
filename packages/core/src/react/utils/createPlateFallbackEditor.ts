import type { LegacyEditorMethods } from '@platejs/slate';

import {
  type CreatePlateEditorOptions,
  createPlateEditor,
} from '../editor/withPlate';

export const createPlateFallbackEditor = (
  options: CreatePlateEditorOptions = {}
) => {
  const editor = createPlateEditor(options);

  editor.meta.isFallback = true;

  (editor as typeof editor & LegacyEditorMethods).apply = () => {
    throw new Error(
      'Cannot apply operations on the fallback editor. The fallback editor is used when a hook that depends on the Plate store was unable to locate a valid store. If you are using PlateController, use `useEditorMounted(id?: string)` or `!editor.meta.isFallback` to ensure that a valid Plate store is available before attempting to call operations on the editor.'
    );
  };

  return editor;
};
