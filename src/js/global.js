export function listFonts() {
  let {fonts} = document;
  const it    = fonts.entries();

  let arr  = [];
  let done = false;

  while (!done) {
    const font = it.next();
    if (!font.done) {
      arr.push(font.value[0].family);
    }
    else {
      done = font.done;
    }
  }

  const newSet = new Set(arr);
  // manually remove if it's here
  newSet.delete('bootstrap-icons');
  // converted to set then arr to filter repetitive values
  return [...newSet];
}
