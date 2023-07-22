import { Quill } from "@vueup/vue-quill";

let EmbedBlot = Quill.import('blots/block/embed');

const ATTRIBUTES = ['alt', 'height', 'width'];

class ImageData {
  url;
  hash;
}

export class CustomImage extends EmbedBlot {
  static blotName = 'customimage';
  static tagName  = 'IMG';

  /**
   *
   * @param {ImageData} value
   * @returns {value}
   */
  static create(value) {
    const node = super.create(value.url);
    node.setAttribute('src', value.url);
    node.setAttribute('hash', value.hash);
    node.setAttribute('class', 'capImg');
    return node;
  }

  /**
   *
   * @param domNode
   * @returns {ImageData}
   */
  static value(domNode) {
    return {
      url:  domNode.getAttribute('src'),
      hash: domNode.getAttribute('hash'),
    };
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