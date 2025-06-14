import { type SlateEditor, sanitizeUrl } from 'platejs';

import { BaseLinkPlugin } from '../BaseLinkPlugin';

export const validateUrl = (editor: SlateEditor, url: string): boolean => {
  const { allowedSchemes, dangerouslySkipSanitization, isUrl } =
    editor.getOptions(BaseLinkPlugin);

  // Allow internal links starting with / or #
  if (url.startsWith('/') || url.startsWith('#')) {
    return true;
  }

  if (isUrl && !isUrl(url)) return false;
  if (
    !dangerouslySkipSanitization &&
    !sanitizeUrl(url, {
      allowedSchemes,
      permitInvalid: true,
    })
  )
    return false;

  return true;
};
