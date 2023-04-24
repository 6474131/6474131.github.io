import { Quill } from "@vueup/vue-quill";

const Parchment = Quill.import('parchment');

const config = {
  scope: Parchment.Scope.BLOCK,
  whitelist: [
    'left',
    'center',
    'right',
    'justify',
  ],
};

export const AlignmentStyle = new Parchment.Attributor.Style('alignment',
                                                             'text-align',
                                                             config,
);
