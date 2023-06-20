import { Quill } from "@vueup/vue-quill";

let EmbedBlot = Quill.import('blots/block/embed');

const ATTRIBUTES = ['alt', 'height', 'width'];

export class CustomImage extends EmbedBlot {
  static blotName = 'customimage';
  static tagName  = 'IMG';

  static create(value) {
    const node = super.create(value);
    node.setAttribute('src', value);
    node.setAttribute('class', 'capImg');
    return node;
  }

  static value(domNode) {
    return domNode.getAttribute('src');
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      }
      else {
        this.domNode.removeAttribute(name);
      }
    }
    else {
      super.format(name, value);
    }
  }
}