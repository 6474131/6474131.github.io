import { Quill } from "@vueup/vue-quill";
import { useImageStore } from "@/stores/cap-images";

let EmbedBlot = Quill.import('blots/block/embed');

const ATTRIBUTES = ['alt', 'height', 'width'];

export class CustomImage extends EmbedBlot {
  static blotName = 'customimage';
  static tagName  = 'IMG';

  static create(value) {
    const node = super.create(value);
    node.setAttribute('data-img', value);
    return node;
  }

  static value(domNode) {
    return domNode.getAttribute('data-img');
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

export function updateImageSrc() {
  const capImageStore = useImageStore();
  const images        = document.getElementsByTagName('img');
  for (const image of images) {
    const imgIndex = image.getAttribute('data-img');
    if (imgIndex && image.parentNode.classList.contains('ql-editor')) {
      image.setAttribute('src', capImageStore.getImage(imgIndex));

    }
  }
}