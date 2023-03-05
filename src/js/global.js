const QUOTE_CHARACTERS = `["“”„”«»]`;

export const reTag      = new RegExp(
  `\\[(.+?)]\\s{0,2}(${QUOTE_CHARACTERS}?.+?(?:${QUOTE_CHARACTERS}|\\n|$))`, "g");
export const reDialogue = new RegExp(`${QUOTE_CHARACTERS}.*?${QUOTE_CHARACTERS}`, "g");
export const reItalic   = /(?<!\\)\*(.+?)(?<!\\)\*/g;
export const reBold     = /\*\*(.+?)\*\*/g;
export const reImg      = /\{img(\d+)?}/g;
