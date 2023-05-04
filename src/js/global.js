export const QUOTE_CHARACTERS = `["“”„”«»]`;

export const reTag      = new RegExp(
  `\\[(.+?)]\\s{0,2}(${QUOTE_CHARACTERS}?.+?(?:${QUOTE_CHARACTERS}|\\n|$))`,
  "g",
);
export const reDialogue = new RegExp(
  `${QUOTE_CHARACTERS}.*?${QUOTE_CHARACTERS}`,
  "g",
);
export const reItalic   = /(?<!\\)\*(.+?)(?<!\\)\*/g;
export const reBold     = /\*\*(.+?)\*\*/g;
export const reImg      = /\{img(\d+)?}/g;

/**
 * Validates the return of quill.getFormat, as in if it's multiple values or if
 * it's invalid return null, otherwise return the sole format.
 *
 * @param {list|string} format The format to check.
 */
export function validateFormat(format) {
  if (Array.isArray(format)) {
    return null;
  }
  else {
    if (format == null) {
      return null;
    }
    else {
      return format;
    }
  }

}

/**
 *
 * @param {array} array
 * @param {array | any} comparison
 */
export function count(array, comparison) {

}