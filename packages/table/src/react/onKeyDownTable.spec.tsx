/** @jsx jsxt */

import type { SlateEditor } from 'platejs';

import { jsxt } from '@platejs/test-utils';

import { createPlateTestEditor } from '../../../core/src/react/__tests__/createPlateTestEditor';
import { getTestTablePlugins } from '../lib/withNormalizeTable.spec';

jsxt;

/**
 * TODO: test e2e? https://github.com/udecode/editor-protocol/issues/71
 * https://github.com/udecode/editor-protocol/issues/26
 * https://github.com/udecode/editor-protocol/issues/27
 * https://github.com/udecode/editor-protocol/issues/28
 * https://github.com/udecode/editor-protocol/issues/29
 */

describe('onKeyDownTable', () => {
  // https://github.com/udecode/editor-protocol/issues/26
  // describe('when arrow up from a cell', () => {
  //   it('should move selection to cell above', async () => {
  //     const input = ((
  //       <editor>
  //         <htable>
  //           <htr>
  //             <htd>11</htd>
  //             <htd>12</htd>
  //           </htr>
  //           <htr>
  //             <htd>
  //               21
  //               <cursor />
  //             </htd>
  //             <htd>22</htd>
  //           </htr>
  //         </htable>
  //       </editor>
  //     ) as any) as SlateEditor;
  //
  //     const output = ((
  //       <editor>
  //         <htable>
  //           <htr>
  //             <htd>
  //               <cursor />
  //               11
  //             </htd>
  //             <htd>12</htd>
  //           </htr>
  //           <htr>
  //             <htd>21</htd>
  //             <htd>22</htd>
  //           </htr>
  //         </htable>
  //       </editor>
  //     ) as any) as SlateEditor;
  //
  //     const [editor, { triggerKeyboardEvent }] = await createPlateTestEditor({
  //       value: input.children,
  //    selection: input.selection,
  //       plugins: [TablePlugin],
  //     });
  //
  //     await triggerKeyboardEvent('ArrowUp');
  //
  //     expect(editor.selection).toEqual(output.selection);
  //   });
  // });
  // describe('when arrow up from a cell second child block', () => {
  //   it('should move selection to cell first child block', async () => {
  //     const input = ((
  //       <editor>
  //         <htable>
  //           <htr>
  //             <htd>11</htd>
  //             <htd>12</htd>
  //           </htr>
  //           <htr>
  //             <htd>
  //               <hp>21a</hp>
  //               <hp>
  //                 21b
  //                 <cursor />
  //               </hp>
  //             </htd>
  //             <htd>22</htd>
  //           </htr>
  //         </htable>
  //       </editor>
  //     ) as any) as SlateEditor;
  //
  //     const output = ((
  //       <editor>
  //         <htable>
  //           <htr>
  //             <htd>11</htd>
  //             <htd>12</htd>
  //           </htr>
  //           <htr>
  //             <htd>
  //               <hp>
  //                 21a
  //                 <cursor />
  //               </hp>
  //               <hp>21b</hp>
  //             </htd>
  //             <htd>22</htd>
  //           </htr>
  //         </htable>
  //       </editor>
  //     ) as any) as SlateEditor;
  //
  //     const [editor, { triggerKeyboardEvent }] = await createPlateTestEditor({
  //       value: input.children,
  //    selection: input.selection,
  //       plugins: [TablePlugin],
  //     });
  //
  //     await triggerKeyboardEvent('ArrowUp');
  //
  //     expect(editor.selection).toEqual(output.selection);
  //   });
  // });
  // https://github.com/udecode/editor-protocol/issues/27
  // describe('when arrow down from a cell', () => {
  //   it('should move selection to cell below', async () => {
  //     const input = ((
  //       <editor>
  //         <htable>
  //           <htr>
  //             <htd>
  //               11
  //               <cursor />
  //             </htd>
  //             <htd>12</htd>
  //           </htr>
  //           <htr>
  //             <htd>21</htd>
  //             <htd>22</htd>
  //           </htr>
  //         </htable>
  //       </editor>
  //     ) as any) as SlateEditor;
  //
  //     const output = ((
  //       <editor>
  //         <htable>
  //           <htr>
  //             <htd>11</htd>
  //             <htd>12</htd>
  //           </htr>
  //           <htr>
  //             <htd>
  //               <cursor />
  //               21
  //             </htd>
  //             <htd>22</htd>
  //           </htr>
  //         </htable>
  //       </editor>
  //     ) as any) as SlateEditor;
  //
  //     const [editor, { triggerKeyboardEvent }] = await createPlateTestEditor({
  //       value: input.children,
  //    selection: input.selection,
  //       plugins: [TablePlugin],
  //     });
  //
  //     await triggerKeyboardEvent('ArrowDown');
  //
  //     expect(editor.selection).toEqual(output.selection);
  //   });
  // });
  // https://github.com/udecode/editor-protocol/issues/28
  // describe('when arrow up from a cell in first row', () => {
  //   it('should move selection before table', async () => {
  //     const input = ((
  //       <editor>
  //         <hp>test</hp>
  //         <htable>
  //           <htr>
  //             <htd>11</htd>
  //             <htd>
  //               12
  //               <cursor />
  //             </htd>
  //           </htr>
  //           <htr>
  //             <htd>21</htd>
  //             <htd>22</htd>
  //           </htr>
  //         </htable>
  //       </editor>
  //     ) as any) as SlateEditor;
  //
  //     const output = ((
  //       <editor>
  //         <hp>
  //           test
  //           <cursor />
  //         </hp>
  //         <htable>
  //           <htr>
  //             <htd>11</htd>
  //             <htd>12</htd>
  //           </htr>
  //           <htr>
  //             <htd>21</htd>
  //             <htd>22</htd>
  //           </htr>
  //         </htable>
  //       </editor>
  //     ) as any) as SlateEditor;
  //
  //     const [editor, { triggerKeyboardEvent }] = await createPlateTestEditor({
  //       value: input.children,
  //    selection: input.selection,
  //       plugins: [TablePlugin],
  //     });
  //
  //     await triggerKeyboardEvent('ArrowUp');
  //
  //     expect(editor.selection).toEqual(output.selection);
  //   });
  // });
  // https://github.com/udecode/editor-protocol/issues/29
  // describe('when arrow down from a cell in last row', () => {
  //   it('should move selection after table', async () => {
  //     const input = ((
  //       <editor>
  //         <htable>
  //           <htr>
  //             <htd>11</htd>
  //             <htd>12</htd>
  //           </htr>
  //           <htr>
  //             <htd>
  //               21
  //               <cursor />
  //             </htd>
  //             <htd>22</htd>
  //           </htr>
  //         </htable>
  //         <hp>test</hp>
  //       </editor>
  //     ) as any) as SlateEditor;
  //
  //     const output = ((
  //       <editor>
  //         <htable>
  //           <htr>
  //             <htd>11</htd>
  //             <htd>12</htd>
  //           </htr>
  //           <htr>
  //             <htd>21</htd>
  //             <htd>22</htd>
  //           </htr>
  //         </htable>
  //         <hp>
  //           <cursor />
  //           test
  //         </hp>
  //       </editor>
  //     ) as any) as SlateEditor;
  //
  //     const [editor, { triggerKeyboardEvent }] = await createPlateTestEditor({
  //       value: input.children,
  //    selection: input.selection,
  //       plugins: [TablePlugin],
  //     });
  //
  //     await triggerKeyboardEvent('ArrowDown');
  //
  //     expect(editor.selection).toEqual(output.selection);
  //   });
  // });

  // https://github.com/udecode/editor-protocol/issues/30
  describe('when shift+down in a cell', () => {
    it.skip('should add cell below to selection', async () => {
      const input = (
        <editor>
          <htable>
            <htr>
              <htd>
                <anchor />
                11
              </htd>
              <htd>12</htd>
            </htr>
            <htr>
              <htd>
                {' '}
                <focus />
                21
              </htd>
              <htd>22</htd>
            </htr>
            <htr>
              <htd>31</htd>
              <htd>32</htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const output = (
        <editor>
          <htable>
            <htr>
              <htd>
                <anchor />
                11
              </htd>
              <htd>12</htd>
            </htr>
            <htr>
              <htd>21</htd>
              <htd>22</htd>
            </htr>
            <htr>
              <htd>
                <focus />
                31
              </htd>
              <htd>32</htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const [editor, { triggerKeyboardEvent }] = await createPlateTestEditor({
        plugins: getTestTablePlugins(),
        selection: input.selection,
        value: input.children,
      });

      await triggerKeyboardEvent('shift+ArrowDown');

      expect(editor.selection).toEqual(output.selection);
    });
  });

  // https://github.com/udecode/editor-protocol/issues/31
  describe('when shift+up in a cell', () => {
    it.skip('should add cell above to selection', async () => {
      const input = (
        <editor>
          <htable>
            <htr>
              <htd>11</htd>
              <htd>12</htd>
            </htr>
            <htr>
              <htd>
                {' '}
                <focus />
                21
              </htd>
              <htd>22</htd>
            </htr>
            <htr>
              <htd>
                <anchor />
                31
              </htd>
              <htd>32</htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const output = (
        <editor>
          <htable>
            <htr>
              <htd>
                <anchor />
                11
              </htd>
              <htd>12</htd>
            </htr>
            <htr>
              <htd>21</htd>
              <htd>22</htd>
            </htr>
            <htr>
              <htd>
                <focus />
                31
              </htd>
              <htd>32</htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const [editor, { triggerKeyboardEvent }] = await createPlateTestEditor({
        plugins: getTestTablePlugins(),
        selection: input.selection,
        value: input.children,
      });

      await triggerKeyboardEvent('shift+ArrowUp');

      expect(editor.selection).toEqual(output.selection);
    });
  });

  // https://github.com/udecode/editor-protocol/issues/15
  describe('when shift+right in a cell', () => {
    it.skip('should add cell right to selection', async () => {
      const input = (
        <editor>
          <htable>
            <htr>
              <htd>
                <anchor />
                11
              </htd>
              <htd>
                12
                <focus />
              </htd>
              <htd>13</htd>
            </htr>
            <htr>
              <htd>21</htd>
              <htd>22</htd>
              <htd>23</htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const output = (
        <editor>
          <htable>
            <htr>
              <htd>
                <anchor />
                11
              </htd>
              <htd>12</htd>
              <htd>
                <focus />
                13
              </htd>
            </htr>
            <htr>
              <htd>21</htd>
              <htd>22</htd>
              <htd>23</htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const [editor, { triggerKeyboardEvent }] = await createPlateTestEditor({
        plugins: getTestTablePlugins(),
        selection: input.selection,
        value: input.children,
      });

      await triggerKeyboardEvent('shift+ArrowRight');

      expect(editor.selection).toEqual(output.selection);
    });
  });

  // https://github.com/udecode/editor-protocol/issues/17
  describe('when shift+left in a cell', () => {
    it.skip('should add cell left to selection', async () => {
      const input = (
        <editor>
          <htable>
            <htr>
              <htd>11</htd>
              <htd>
                12
                <anchor />
              </htd>
              <htd>
                13
                <focus />
              </htd>
            </htr>
            <htr>
              <htd>21</htd>
              <htd>22</htd>
              <htd>23</htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const output = (
        <editor>
          <htable>
            <htr>
              <htd>
                <anchor />
                11
              </htd>
              <htd>12</htd>
              <htd>
                <focus />
                13
              </htd>
            </htr>
            <htr>
              <htd>21</htd>
              <htd>22</htd>
              <htd>23</htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const [editor, { triggerKeyboardEvent }] = await createPlateTestEditor({
        plugins: getTestTablePlugins(),
        selection: input.selection,
        value: input.children,
      });

      await triggerKeyboardEvent('shift+ArrowLeft');

      expect(editor.selection).toEqual(output.selection);
    });
  });
});
