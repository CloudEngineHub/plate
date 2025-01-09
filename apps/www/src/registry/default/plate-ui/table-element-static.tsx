import React from 'react';

import type { SlateElementProps } from '@udecode/plate-common';
import type { TTableElement } from '@udecode/plate-table';

import { cn } from '@udecode/cn';
import { SlateElement } from '@udecode/plate-common';

export const TableElementStatic = ({
  children,
  className,
  ...props
}: SlateElementProps) => {
  const { colSizes } = props.element as TTableElement;

  return (
    <SlateElement
      className={cn(className, 'overflow-x-auto')}
      style={{ paddingLeft: props.element.marginLeft as any }}
      data-col-sizes={JSON.stringify(colSizes)}
      {...props}
    >
      <table
        className={cn(
          'my-4 ml-px mr-0 table h-px w-[calc(100%-6px)] table-fixed border-collapse'
        )}
        data-plate-prevent-deserialization
      >
        <colgroup style={{ width: '100%' }}>
          {colSizes?.map((width, index) => (
            <col
              key={index}
              style={{
                minWidth: '48px',
                width: width || undefined,
              }}
            />
          ))}
          <col
            style={{
              minWidth: '48px',
              width: '100%',
            }}
          />
        </colgroup>

        <tbody className="min-w-full">{children}</tbody>
      </table>
    </SlateElement>
  );
};
