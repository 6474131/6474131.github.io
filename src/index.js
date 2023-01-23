import html2canvas from "html2canvas";
import { BodyTag, CharacterTag } from "./cap-tags";
import './index.css';
import './jquery-injectCSS';

require("@eastdesire/jscolor");
require("webpack-jquery-ui");
require("webpack-jquery-ui/css");

const DEBUG      = true;
const reTag      = /\[(.+?)]\s{0,2}("?.+?(?:"|\n|$))/g;
const reItalic   = /(?<!\\)\*(.+?)(?<!\\)\*/g;
const reBold     = /\*\*(.+?)\*\*/g;
const reUniQuote = /[\u201C\u201D]/g;

function convertText(text) {
  text = text.replace(reUniQuote, '"');
  text = text.replace(reTag, '<span class="$1">$2</span>');
  text = text.replace(reBold, '<b>$1</b>');
  text = text.replace(reItalic, '<i>$1</i>');
  text = text.replaceAll('\n', '<br>');
  return text;
}

function saveAs(uri, filename) {

  let link = document.createElement('a');

  if (typeof link.download === 'string') {

    link.href     = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);

  } else {

    window.open(uri);

  }
}

function downloadCap() {
  const $image       = $("#image");
  const $textHolder  = $("#text_holder");
  const $imageHolder = $("#image_holder");

  const naturalWidth = $image[0].naturalWidth;
  // really only works on column caps
  $textHolder.css('width', naturalWidth + "px");
  $imageHolder.css('width', naturalWidth + "px");
  console.log("NATURAL WIDTH: " + $image[0].naturalWidth);

  html2canvas(
    document.getElementById("text_holder"),
    {
      backgroundColor: $('body').css('background-color'),
      allowTaint: false,
      scrollX: 0,
      scrollY: -window.scrollY,
      windowWidth: $image[0].naturalWidth,
      width: $image[0].naturalWidth,
    })
    .then(function (canvas) {
      saveAs(canvas.toDataURL(), 'cap.png');
    });
  // $image.css('width', previousSize);
  $textHolder.css('width', '');
  $imageHolder.css('width', '');

}

/** @type {Object<string, CharacterTag>} */
let characterTags = {};

/**
 * For putting new character tags into the dict. Also updates the refill list
 * with new options.
 * @param {string} name The name to use for the dictionary.
 * @param {CharacterTag} tag The character tag to use.
 */
function addToCharacterTags(name, tag) {
  characterTags[name] = tag;
  let $refill         = $("#current-characters");
  $refill.empty();
  for (tag in characterTags) {
    $refill.append($('<option></option>').val(tag).html(tag));
  }
  $refill.val(name);
}

// async function getFonts() {
//   const {state} = await navigator.permissions.query({name: 'local-fonts'});
//   console.log(await queryLocalFonts());
// }

$(document).ready(() => {
  $("#raw-text").on('input', () => {
    let text     = $('#raw-text').val();
    let new_text = convertText(text);
    $('#new-text').html(new_text);
  });

  $("#open-text-options-modal").on('click', () => {
    $(".popup-overlay, .popup-content").toggleClass('active');
  });
  $("#close-text-options-modal").on('click', () => {
    $(".popup-overlay, .popup-content").removeClass('active');
  });

  $(".popup-overlay").draggable();

  $("#save-character").on('click', () => {
    let formJson = JSON.stringify($('#character-form')
                                    .serializeArray());
    let tag      = new CharacterTag(formJson);
    addToCharacterTags(tag['character-name'], tag);
  });
  if (!DEBUG) {
    window.onbeforeunload = function () {
      return true;
    };
  }
  $("#current-characters").change((el) => {
    // gets the name of the character selected from the dropdown, then finds
    // the dictionary entry with that character, and has it refill the form
    // based on that dictionary entry
    characterTags[$(el.target).val()].refillForm($("#character-form"));
  });

  $("#image-upload").on('change', () => {
    let $demoImage = $("#image");
    let file       = document.querySelector('input[type=file]').files[0];
    let reader     = new FileReader();
    reader.onload  = (event) => {
      $demoImage[0].src = reader.result;
    };
    // I think sometimes it's not a blob if you click on the button and don't
    // supply a file...? not entirely sure why this happens sometimes
    if (file instanceof Blob) {

      reader.readAsDataURL(file);
    }
  });
  $('#save-body').on('click', () => {
    let formJson = JSON.stringify($('#body-form').serializeArray());
    let tag      = new BodyTag(formJson);
    //might need to use global variable
  });
  $("#download-cap").on('click', () => {
    downloadCap();
  });

});