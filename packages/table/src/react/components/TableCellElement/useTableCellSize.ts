import React from 'react';

import type { NodeEntry, TTableCellElement, TTableRowElement } from 'platejs';

import { KEYS } from 'platejs';
import { useEditorPlugin, useElement, useElementSelector } from 'platejs/react';

import { useCellIndices } from '../../hooks/useCellIndices';
import { TablePlugin } from '../../TablePlugin';
import { useTableColSizes } from '../TableElement';

export function useTableCellSize({
  element: el,
}: {
  element?: TTableCellElement;
} = {}) {
  const { api } = useEditorPlugin(TablePlugin);

  const element = useElement() ?? el;
  const colSizes = useTableColSizes();
  const cellIndices = useCellIndices();
  const rowSize = useElementSelector(
    ([node]: NodeEntry<TTableRowElement>) => node.size,
    [],
    {
      key: KEYS.tr,
    }
  );

  return React.useMemo(
    () => api.table.getCellSize({ cellIndices, colSizes, element, rowSize }),
    [api.table, cellIndices, colSizes, element, rowSize]
  );
}
