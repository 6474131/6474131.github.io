import {Timestamp} from 'firebase/firestore'
export class Story {
  static storyConverter = {
    toFirestore(story) {
      return {
        text:  JSON.stringify(story.text),
        hash: story.hash,
        uploadTime: story.uploadTime
      };
    },
    fromFirestore(
      snapshot,
      options,
    ) {
      const data = snapshot.data(options);
      return new Story(data.text, data.hash, data.uploadTime);
    },
  };
  /** @type {Object} **/
  text;
  /** @type {string} **/
  hash;
  /** @type {Timestamp} **/
  uploadTime;

  /**
   *
   * @param {string} text
   * @param {string} hash
   * @param {Timestamp} uploadTime
   */
  constructor(text, hash, uploadTime) {
    this.text = JSON.parse(text);
    this.hash = hash;
    this.uploadTime = uploadTime;
  }
}
