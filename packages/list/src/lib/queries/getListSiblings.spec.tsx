/** @jsx jsxt */

import { jsxt } from '@platejs/test-utils';
import {
  type Descendant,
  type SlateEditor,
  type TElement,
  createEditor,
} from 'platejs';

import { getListSiblings } from './getListSiblings';

jsxt;

describe('getListSiblings', () => {
  describe('listStyleType is not defined', () => {
    it('should be empty', async () => {
      const input = (
        <fragment>
          <hp indent={1} listStyleType="disc">
            1
          </hp>
          <hp indent={1}>
            1<cursor />
          </hp>
          <hp indent={1} listStyleType="disc">
            1
          </hp>
        </fragment>
      ) as any as Descendant[];

      const editor = createEditor(
        (<editor>{input}</editor>) as any as SlateEditor
      );

      const entry = editor.api.block<TElement>();

      const siblings = getListSiblings(editor, entry!);

      expect(siblings).toEqual([]);
    });
  });

  describe('listStyleType is defined', () => {
    it('should get nodes', async () => {
      const input = (
        <fragment>
          <hp indent={2} listStyleType="disc">
            21
          </hp>
          <hp indent={1} listStyleType="disc">
            11
          </hp>
          <hp indent={2} listStyleType="disc">
            21
          </hp>
          <hp indent={2} listStyleType="disc">
            22
            <cursor />
          </hp>
          <hp indent={3} listStyleType="decimal">
            31
          </hp>
          <hp indent={2} listStyleType="disc">
            23
          </hp>
          <hp indent={2} listStyleType="decimal">
            21
          </hp>
          <hp indent={1} listStyleType="disc">
            12
          </hp>
          <hp indent={2} listStyleType="decimal">
            21
          </hp>
        </fragment>
      ) as any as Descendant[];

      const output = (
        <fragment>
          <hp indent={2} listStyleType="disc">
            21
          </hp>
          <hp indent={2} listStyleType="disc">
            22
            <cursor />
          </hp>
          <hp indent={2} listStyleType="disc">
            23
          </hp>
        </fragment>
      ) as any as Descendant[];

      const editor = createEditor(
        (<editor>{input}</editor>) as any as SlateEditor
      );

      const entry = editor.api.block<TElement>();

      const siblings = getListSiblings(editor, entry!);

      expect(siblings).toEqual([
        [output[0], [2]],
        [output[1], [3]],
        [output[2], [5]],
      ]);
    });
  });
});
