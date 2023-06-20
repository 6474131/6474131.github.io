import { decompressFrames, parseGIF } from "gifuct-js";
import { CanvasCapture } from "canvas-capture";
import { useImageStore } from "@/stores/cap-images";

export function getGifSettings(element, parent) {
  const innerBox = element.getBoundingClientRect();
  const outerBox = parent.getBoundingClientRect();
  const top      = innerBox.top - outerBox.top;
  const left     = innerBox.left - outerBox.left;

  return {
    top:    top,
    left:   left,
    width:  element.width,
    height: element.height,
  };
}

export async function recordGif(canvas, gifSettings, progressCallback) {
  const capImageStore = useImageStore();
  const response      = await fetch(capImageStore.getImage(0).url);
  const buffer        = await response.arrayBuffer();
  const gifData       = new Uint8Array(buffer);
  const gif           = parseGIF(gifData);
  const frames        = decompressFrames(gif, true);
  const ctx           = canvas.getContext("2d");
  CanvasCapture.init(canvas);
  CanvasCapture.beginGIFRecord({
                                 onExportProgress: progressCallback,
                                 fps:              1000 / frames[0].delay,
                               });

  const frameCanvases = frames.map((frame) => {
    const frameCanvas  = document.createElement("canvas");
    frameCanvas.width  = gif.lsd.width;
    frameCanvas.height = gif.lsd.height;
    const frameCtx     = frameCanvas.getContext("2d");
    frameCtx.putImageData(
      new ImageData(
        frame.patch,
        frame.dims.width,
        frame.dims.height,
      ),
      frame.dims.left,
      frame.dims.top,
    );
    return frameCanvas;
  });

  let frameIndex = 0;

  function drawFrame() {
    if (frameIndex >= frames.length) {
      CanvasCapture.stopRecord();
      return;
    }
    ctx.resetTransform();
    ctx.drawImage(
      frameCanvases[frameIndex],
      gifSettings.left,
      gifSettings.top,
      gifSettings.width,
      gifSettings.height,
    );
    frameIndex++;
    CanvasCapture.recordFrame();
    requestAnimationFrame(drawFrame);
  }

  drawFrame();
}
