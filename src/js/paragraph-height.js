import { Quill } from "@vueup/vue-quill";

const Parchment = Quill.import('parchment');

export const ParagraphHeightStyle = new Parchment.Attributor.Style('paragraphheight',
                                                                   'margin-bottom',
                                                                   {
                                                                     scope: Parchment.Scope.BLOCK,
                                                                   },
);