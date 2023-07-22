import { openDB } from "idb";

export class FirebaseImage {
  /** @type string */
  hash;
  /** @type string */
  contentType;
  /**
   * This is the BlobUrl of the image. It should be initialized with loadBlob
   * @type string | null */
  url;

  /**
   *
   * @param {File} file
   * @returns {Promise<FirebaseImage>}
   */
  static async initializer(file) {
    const firebaseImage       = new FirebaseImage();
    firebaseImage.contentType = file.type;

    const fileArrayBuffer = await file.arrayBuffer();
    const hashArrayBuffer = await crypto.subtle.digest(
      'SHA-256', fileArrayBuffer);
    firebaseImage.hash    = FirebaseImage.bufferToHex(hashArrayBuffer);

    const imageDb     = new ImageDB();
    firebaseImage.url = await imageDb.storeImage(firebaseImage.hash, file);
    return firebaseImage;
  }

  static bufferToHex(buffer) {
    let s = '', h = '0123456789abcdef';
    (new Uint8Array(buffer)).forEach((v) => {
      s += h[v >> 4] + h[v & 15];
    });
    return s;
  }

  async generateBlobUrl() {
    const imageDb = new ImageDB();
    this.url      = await imageDb.getImage(this.hash);
    if (this.url == null) {
      console.log("Loaded url was null!");
    }
  }

  async delete() {
    const imageDb = new ImageDB();
    await imageDb.deleteImage(this.hash);
  }

}

class ImageDB {
  constructor() {
    if (ImageDB.instance) {
      return ImageDB.instance;
    }

    ImageDB.instance = this;

    this.dbName    = 'imageDatabase';
    this.storeName = 'images';
  }

  async openDB() {
    if (this.db) {
      return this.db;
    }

    this.db = await openDB(this.dbName, 1, {
      upgrade(db) {
        db.createObjectStore(this.storeName);
      },
    });

    return this.db;
  }

  /**
   *
   * @param {string} hash
   * @param {string | Blob} input
   * @returns {Promise<string>}
   * @throws {Error} Throws an error if input is not a url or a blob
   */
  async storeImage(hash, input) {
    const db = await this.openDB();
    let blob;
    if (typeof input === 'string') {
      const response = await fetch(input);
      blob           = await response.blob();
    }
    else {
      if (input instanceof Blob) {
        blob = input;
      }
      else {
        throw new Error('Invalid input: input should be a URL or a Blob');
      }
    }
    const tx    = db.transaction(this.storeName, 'readwrite');
    const store = tx.objectStore(this.storeName);
    store.put(blob, hash);
    await tx.done;
    return URL.createObjectURL(blob);
  }

  async getImage(hash) {
    const db    = await this.openDB();
    const tx    = db.transaction(this.storeName, 'readonly');
    const store = tx.objectStore(this.storeName);
    const blob  = await store.get(hash);
    await tx.done;
    return blob ? URL.createObjectURL(blob) : null;
  }

  async deleteImage(hash) {
    const db    = await this.openDB();
    const tx    = db.transaction(this.storeName, 'readwrite');
    const store = tx.objectStore(this.storeName);
    await store.delete(hash);
    await tx.done;
  }
}