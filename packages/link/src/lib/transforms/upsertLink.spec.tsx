/** @jsx jsxt */

import { jsxt } from '@platejs/test-utils';
import { createEditor, createSlateEditor } from 'platejs';

import { type BaseLinkConfig, BaseLinkPlugin } from '../BaseLinkPlugin';
import { upsertLink } from './upsertLink';

jsxt;

const url = 'http://google.com';
const urlOutput = 'http://output.com';

const createTestEditor = (editor: any, options?: BaseLinkConfig['options']) =>
  createSlateEditor({
    editor,
    plugins: [BaseLinkPlugin.configure({ options })],
  });

describe('upsertLink', () => {
  describe('when selection is collapsed', () => {
    // https://github.com/udecode/editor-protocol/issues/46
    describe('when not in link, url only', () => {
      const input = createEditor(
        (
          <editor>
            <hp>
              insert link
              <cursor />.
            </hp>
          </editor>
        ) as any
      );

      const output = (
        <editor>
          <hp>
            insert link<ha url={url}>{url}</ha>.
          </hp>
        </editor>
      ) as any;

      it('should insert link', () => {
        const editor = createTestEditor(input);
        upsertLink(editor, { url });

        expect(editor.children).toEqual(output.children);
      });
    });

    // https://github.com/udecode/editor-protocol/issues/47
    describe('when not in link, url+text', () => {
      const input = createEditor(
        (
          <editor>
            <hp>
              insert link
              <cursor />.
            </hp>
          </editor>
        ) as any
      );

      const output = (
        <editor>
          <hp>
            insert link<ha url={url}>another</ha>.
          </hp>
        </editor>
      ) as any;

      it('should insert link with text', () => {
        const editor = createTestEditor(input);
        upsertLink(editor, { text: 'another', url });

        expect(editor.children).toEqual(output.children);
      });
    });

    // https://github.com/udecode/editor-protocol/issues/35
    describe('when in a link, insert url', () => {
      const input = createEditor(
        (
          <editor>
            <hp>
              .
              <ha url={url}>
                insert <cursor /> link
              </ha>
              .
            </hp>
          </editor>
        ) as any
      );

      const output = (
        <editor>
          <hp>
            .<ha url={url}>insert {url} link</ha>.
          </hp>
        </editor>
      ) as any;

      it('should insert text', () => {
        const editor = createTestEditor(input);
        upsertLink(editor, { insertTextInLink: true, url });

        expect(editor.children).toEqual(output.children);
      });
    });

    describe('when in a link, edit same url, same text', () => {
      const input = createEditor(
        (
          <editor>
            <hp>
              .
              <ha url={url}>
                insert <cursor />
                link
              </ha>
              .
            </hp>
          </editor>
        ) as any
      );

      const output = (
        <editor>
          <hp>
            .<ha url={url}>insert link</ha>.
          </hp>
        </editor>
      ) as any;

      it('should do nothing', () => {
        const editor = createTestEditor(input);
        upsertLink(editor, { text: 'insert link', url });

        expect(editor.children).toEqual(output.children);
      });
    });

    // https://github.com/udecode/editor-protocol/issues/59
    describe('when in a link, edit url', () => {
      const input = createEditor(
        (
          <editor>
            <hp>
              .
              <ha url={url}>
                insert <cursor />
                link
              </ha>
              .
            </hp>
          </editor>
        ) as any
      );

      const output = (
        <editor>
          <hp>
            .<ha url={urlOutput}>insert link</ha>.
          </hp>
        </editor>
      ) as any;

      it('should update link url', () => {
        const editor = createTestEditor(input);
        upsertLink(editor, { url: urlOutput });

        expect(editor.children).toEqual(output.children);
      });
    });

    // https://github.com/udecode/editor-protocol/issues/58
    describe('when in a link, edit text + same url', () => {
      const input = createEditor(
        (
          <editor>
            <hp>
              .
              <ha url={url}>
                <htext bold>
                  insert <cursor /> link
                </htext>
              </ha>
              .
            </hp>
          </editor>
        ) as any
      );

      const output = (
        <editor>
          <hp>
            .
            <ha url={url}>
              <htext bold>edit link</htext>
            </ha>
            .
          </hp>
        </editor>
      ) as any;

      it('should insert text', () => {
        const editor = createTestEditor(input);
        upsertLink(editor, { text: 'edit link', url });

        expect(editor.children).toEqual(output.children);
      });
    });

    describe('when in a link, insertTextInLink + same url', () => {
      const input = createEditor(
        (
          <editor>
            <hp>
              .
              <ha url={url}>
                insert <cursor /> link
              </ha>
              .
            </hp>
          </editor>
        ) as any
      );

      const output = (
        <editor>
          <hp>
            .<ha url={url}>insert {url} link</ha>.
          </hp>
        </editor>
      ) as any;

      it('should insert text', () => {
        const editor = createTestEditor(input);
        upsertLink(editor, { insertTextInLink: true, url });

        expect(editor.children).toEqual(output.children);
      });
    });

    // https://github.com/udecode/editor-protocol/issues/60
    describe('when in a link, set empty text', () => {
      const input = createEditor(
        (
          <editor>
            <hp>
              .
              <ha url={url}>
                insert <cursor /> link
              </ha>
              .
            </hp>
          </editor>
        ) as any
      );

      const output = (
        <editor>
          <hp>
            .<ha url={url}>{url}</ha>.
          </hp>
        </editor>
      ) as any;

      it('should set text to url', () => {
        const editor = createTestEditor(input);
        upsertLink(editor, { text: '', url });

        expect(editor.children).toEqual(output.children);
      });
    });
  });

  describe('when selection is expanded', () => {
    // https://github.com/udecode/editor-protocol/issues/50
    describe('when not in link, insert url + same text', () => {
      const input = createEditor(
        (
          <editor>
            <hp>
              .<anchor />
              insert link
              <focus />.
            </hp>
          </editor>
        ) as any
      );

      const output = (
        <editor>
          <hp>
            .<ha url={url}>insert link</ha>.
          </hp>
        </editor>
      ) as any;

      it('should insert link', () => {
        const editor = createTestEditor(input);
        upsertLink(editor, { text: 'insert link', url });

        expect(editor.children).toEqual(output.children);
      });
    });

    // https://github.com/udecode/editor-protocol/issues/50
    describe('when not in link, insert url+text', () => {
      const input = createEditor(
        (
          <editor>
            <hp>
              .<anchor />
              insert <htext>bold</htext> link
              <focus />.
            </hp>
          </editor>
        ) as any
      );

      const output = (
        <editor>
          <hp>
            .<ha url={url}>another</ha>.
          </hp>
        </editor>
      ) as any;

      it('should insert link', () => {
        const editor = createTestEditor(input);
        upsertLink(editor, { text: 'another', url });

        expect(editor.children).toEqual(output.children);
      });
    });

    // done
    describe('when in a link', () => {
      const input = createEditor(
        (
          <editor>
            <hp>
              .
              <ha url={url}>
                insert <anchor />
                link
                <focus />
              </ha>
              .
            </hp>
          </editor>
        ) as any
      );

      const output = (
        <editor>
          <hp>
            .<ha url={url}>insert link</ha>.
          </hp>
        </editor>
      ) as any;

      it('should insert text', () => {
        const editor = createTestEditor(input);
        upsertLink(editor, { url });

        expect(editor.children).toEqual(output.children);
      });
    });

    // done
    describe('when containing a link', () => {
      const input = createEditor(
        (
          <editor>
            <hp>
              insert link <anchor />
              <ha url={url}>here</ha>
              <focus />.
            </hp>
          </editor>
        ) as any
      );

      const output = (
        <editor>
          <hp>
            insert link <ha url={urlOutput}>here</ha>.
          </hp>
        </editor>
      ) as any;

      it('should delete and insert link', () => {
        const editor = createTestEditor(input);
        upsertLink(editor, { url: urlOutput });

        expect(editor.children).toEqual(output.children);
      });
    });

    // https://github.com/udecode/editor-protocol/issues/70
    describe('when inserting a link in a marked text', () => {
      const input = createEditor(
        (
          <editor>
            <hp>
              insert{' '}
              <htext bold>
                link <cursor /> here
              </htext>
              .
            </hp>
          </editor>
        ) as any
      );

      const output = (
        <editor>
          <hp>
            insert <htext bold>link </htext>
            <ha url={urlOutput}>
              <htext bold>{urlOutput}</htext>
            </ha>
            <htext bold> here</htext>.
          </hp>
        </editor>
      ) as any;

      it('the new link should keep the marks', () => {
        const editor = createTestEditor(input);
        upsertLink(editor, { url: urlOutput });

        expect(editor.children).toEqual(output.children);
      });
    });
  });

  describe('when skipValidation is false and url is invalid', () => {
    const input = createEditor(
      (
        <editor>
          <hp>
            insert link
            <cursor />.
          </hp>
        </editor>
      ) as any
    );

    const output = (
      <editor>
        <hp>insert link.</hp>
      </editor>
    ) as any;

    it('should do nothing', () => {
      const editor = createTestEditor(input);
      upsertLink(editor, {
        skipValidation: false,
        url: 'invalid',
      });

      expect(editor.children).toEqual(output.children);
    });
  });

  describe('when skipValidation is true and url is invalid', () => {
    const input = createEditor(
      (
        <editor>
          <hp>
            insert link
            <cursor />.
          </hp>
        </editor>
      ) as any
    );

    const output = (
      <editor>
        <hp>
          insert link<ha url="invalid">invalid</ha>.
        </hp>
      </editor>
    ) as any;

    it('should insert', () => {
      const editor = createTestEditor(input);
      upsertLink(editor, {
        skipValidation: true,
        url: 'invalid',
      });

      expect(editor.children).toEqual(output.children);
    });
  });
});
