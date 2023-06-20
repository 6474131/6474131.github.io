export class FirebaseImage {
  static imageConverter = {
    toFirestore(image) {
      return {
        path:        image.path,
        hash:        image.hash,
        sourceUid:   image.sourceUid,
        contentType: image.contentType,
        url:         image.url,
      };
    },
    fromFirestore(
      snapshot,
      options,
    ) {
      const data = snapshot.data(options);
      return new FirebaseImage(
        data.path, data.hash, data.sourceUid, data.contentType, data.url);
    },
  };
  /** @type string */
  path;
  /** @type string */
  hash;
  /** @type string */
  sourceUid;
  /** @type string */
  contentType;
  /** @type string */
  url;

  constructor(path, hash, sourceUid, contentType, url) {
    this.path        = path;
    this.hash        = hash;
    this.sourceUid   = sourceUid;
    this.contentType = contentType;
    this.url         = url;
  }
}
