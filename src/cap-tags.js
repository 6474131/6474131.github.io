export class BodyTag {
  /**
   * Creates a body tag by using a json_string.
   * @param json_string Serialized json from a form/other source.
   */
  constructor(json_string) {
    let jsonArray = JSON.parse(json_string);
    this.addArrayElementsToFields(jsonArray);
    for (let fieldsKey of Object.keys(this)) {
      fieldsKey = fieldsKey.trim();
      if (fieldsKey.startsWith("css") && this[fieldsKey] !== "") {
        let keyName = fieldsKey.slice(4);
        $.injectCSS({
                      ["#new-text"]: {
                        [keyName]: this[fieldsKey],
                      },
                    }, {merge: true});
      }

    }
  }

  /**
   * Adds the elements of the given array to this object as fields.
   * @param array The array to add elements from.
   */
  addArrayElementsToFields(array) {
    for (const element of array) {
      this[element.name] = element.value;
    }
  }
}

export class CharacterTag {
  /**
   * Creates a character tag by using a json_string.
   * @param json_string Serialized json from a form/other source.
   */
  constructor(json_string) {
    let jsonArray = JSON.parse(json_string);
    this.addArrayElementsToFields(jsonArray);
    for (let fieldsKey of Object.keys(this)) {
      fieldsKey = fieldsKey.trim();
      if (fieldsKey.startsWith("css") && this[fieldsKey] !== "") {
        let characterName = this['character-name'];
        if (characterName === "") {
          break;
        }
        let keyName = fieldsKey.slice(4);
        $.injectCSS({
                      ["." + characterName]: {
                        [keyName]: this[fieldsKey],
                      },
                    }, {merge: true});
      }

    }
  }

  /**
   * Adds the elements of the given array to this object as fields.
   * @param array The array to add elements from.
   */
  addArrayElementsToFields(array) {
    for (const element of array) {
      this[element.name] = element.value;
    }
  }

  /**
   * Refills a given form with the fields in the object.
   * @param form The form to refill.
   */
  refillForm(form) {
    for (const fieldsKey of Object.keys(this)) {
      let $thing = form.find(`input[name=${fieldsKey}]`);
      $thing.val(this[fieldsKey]);

    }
    // this really shouldn't be necessary, but otherwise it doesn't update
    let $colorPicker = $("#css-character-color");
    $colorPicker[0].jscolor.fromString($colorPicker.val());

  }
}
