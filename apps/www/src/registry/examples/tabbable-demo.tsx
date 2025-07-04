'use client';

import * as React from 'react';

import type { PlateElementProps } from 'platejs/react';

import { TabbablePlugin } from '@platejs/tabbable/react';
import {
  Plate,
  PlateElement,
  useFocused,
  usePlateEditor,
  useSelected,
} from 'platejs/react';

import { cn } from '@/lib/utils';
import { EditorKit } from '@/registry/components/editor/editor-kit';
import { tabbableValue } from '@/registry/examples/values/tabbable-value';
import { Editor, EditorContainer } from '@/registry/ui/editor';

export default function TabbableDemo() {
  const editor = usePlateEditor({
    plugins: [
      ...EditorKit,
      TabbablePlugin.configure({
        node: { component: TabbableElement, isElement: true, isVoid: true },
      }),
    ],
    value: tabbableValue,
  });

  return (
    <Plate editor={editor}>
      <EditorContainer variant="demo">
        <Editor />
      </EditorContainer>
    </Plate>
  );
}

export function TabbableElement({ children, ...props }: PlateElementProps) {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <PlateElement {...props}>
      <div
        className={cn(
          'mb-2 p-2',
          selected && focused
            ? 'border-2 border-blue-500'
            : 'border border-gray-200'
        )}
        contentEditable={false}
      >
        <p>This is a void element.</p>
        <button type="button">Button 1</button>{' '}
        <button type="button">Button 2</button>
      </div>
      {children}
    </PlateElement>
  );
}
