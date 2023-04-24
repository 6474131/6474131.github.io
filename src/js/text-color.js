import { Quill } from "@vueup/vue-quill";

const Parchment = Quill.import('parchment');

export const TextColorStyle = new Parchment.Attributor.Style('textcolor',
                                                             'color',
                                                             {
                                                               scope: Parchment.Scope.INLINE,
                                                             },
);

// so that it correctly retrieves as RGB
TextColorStyle.value = (node) => {
  return node.getAttribute('color');
};
TextColorStyle.add   = function (node, value) {
  node.setAttribute('style', `color: ${value}`);
  // if you don't do this it retrieves the hex value as RGB... not really sure
  // why
  node.setAttribute('color', value);
  return node;
};