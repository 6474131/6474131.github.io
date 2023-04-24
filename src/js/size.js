import { Quill } from "@vueup/vue-quill";

const Parchment = Quill.import('parchment');

export const SizeStyle = new Parchment.Attributor.Style('fontsize',
                                                        'font-size',
                                                        {
                                                          scope: Parchment.Scope.INLINE,
                                                        },
);

// frankly i don't know why i need to do this
SizeStyle.value = (node) => {
  return node.style['fontSize'];
};