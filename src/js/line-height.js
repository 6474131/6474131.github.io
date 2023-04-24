import { Quill } from "@vueup/vue-quill";

const Parchment = Quill.import('parchment');

export const LineHeightStyle = new Parchment.Attributor.Style('lineheight',
                                                              'line-height',
                                                              {
                                                                scope: Parchment.Scope.BLOCK,
                                                              },
);