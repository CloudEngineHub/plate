/** @jsx jsxt */

import { createSlateEditor } from 'platejs';
import { jsxt } from '@platejs/test-utils';
import { AutoformatKit } from 'www/src/registry/components/editor/plugins/autoformat-kit';

jsxt;

const input = (
  <fragment>
    <hul>
      <hli>
        <hp>
          #
          <cursor />
          hello
        </hp>
      </hli>
    </hul>
  </fragment>
) as any;

const output = (
  <fragment>
    <hh1>hello</hh1>
  </fragment>
) as any;

it('should autoformat', () => {
  const editor = createSlateEditor({
    plugins: AutoformatKit,
    value: input,
  });

  editor.tf.insertText(' ');

  expect(input.children).toEqual(output.children);
});
