import {
  type QueryNodeOptions,
  createPluginFactory,
} from '@udecode/plate-common/server';

import type { PartialSelectionOptions } from './internal';

import { BlockSelectable } from './components/BlockSelectable';
import {
  blockContextMenuActions,
  blockContextMenuSelectors,
} from './context-menu';
import { onKeyDownSelection } from './onKeyDownSelection';
import { useHooksBlockSelection } from './useHooksBlockSelection';
import { onCloseBlockSelection } from './utils';
import { withSelection } from './withSelection';

export const KEY_BLOCK_SELECTION = 'blockSelection';

export interface BlockSelectionPlugin {
  aboveClassNameMap?: Record<string, string>;
  areaOptions?: PartialSelectionOptions;
  enableContextMenu?: boolean;
  onKeyDownSelecting?: (e: KeyboardEvent) => void;
  query?: QueryNodeOptions;
}

export const createBlockSelectionPlugin =
  createPluginFactory<BlockSelectionPlugin>({
    handlers: {
      onChange: onCloseBlockSelection,
      onKeyDown: onKeyDownSelection,
      onMouseDown: (editor) => (e) => {
        if (e.button === 0 && blockContextMenuSelectors.isOpen(editor.id)) {
          e.preventDefault();
          blockContextMenuActions.hide();
        }
        if (e.button === 2) e.preventDefault();
      },
    },
    inject: {
      aboveComponent:
        () =>
        ({ children, element }) =>
          BlockSelectable({
            children,
            options: {
              element,
            },
          }),
    },
    key: KEY_BLOCK_SELECTION,
    options: {
      areaOptions: {
        behaviour: {
          startThreshold: 20,
        },
        features: {
          singleTap: {
            allow: false,
          },
        },
      },
      enableContextMenu: false,
      query: {
        maxLevel: 1,
      },
    },
    useHooks: useHooksBlockSelection,
    withOverrides: withSelection,
  });
