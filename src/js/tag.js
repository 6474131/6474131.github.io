import { Quill } from "@vueup/vue-quill";

let Inline = Quill.import('blots/inline');

export class TagBlot extends Inline {
  static blotName = 'characterTag';
  static tagName  = 'SPAN';

  static create(value) {
    let node = super.create();
    node.classList.add(value);
    node.setAttribute('data-character', value);
    return node;
  }

  static formats(domNode) {
    return domNode.getAttribute('data-character');
  }

}
