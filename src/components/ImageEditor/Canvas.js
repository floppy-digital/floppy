import React, { useState, useContext } from 'react';
import { editorContext } from '@/lib/contexts/editorContext';
import Draggable from 'react-draggable';

import { CANVAS_HEIGHT } from '@/lib/utils';

const Canvas = () => {
  const { editor, setArtistPosition, setTrackPosition } =
    useContext(editorContext);
  const stamp = editor.stamp;
  const layer = editor.layer;
  const size = editor.overlaySize;
  const filter = editor.overlayFilter;
  const fg = editor.fgNode;
  const clTexture = editor.clTextureNode;
  const artistFont = editor.cl.artistFont;
  const artistSize = editor.cl.artistFontSize;
  const artistColor = editor.cl.artistFontColor;
  const trackFont = editor.cl.trackFont;
  const trackSize = editor.cl.trackFontSize;
  const trackColor = editor.cl.trackFontColor;
  const artist = 'artist';
  const track = 'track';
  // const artist = metadata.artist;
  // const track = metadata.track;
  const [coords, setCoords] = useState(null);

  const handleStop = (e) => {
    const targetRect = e.target.getBoundingClientRect();
    const canvasRect = fg.canvas.getBoundingClientRect();
    const _x = targetRect.left - canvasRect.left;
    const _y = targetRect.bottom - canvasRect.top - targetRect.height / 4;

    if (e.target.id === 'artiste') {
      setArtistPosition([_x, _y]);
    } else {
      setTrackPosition([_x, _y]);
    }
  };

  const handleMouseMove = (e) => {
    if (fg.canvas) {
      const rect = fg.canvas.getBoundingClientRect();
      const x = e.pageX - rect.left;
      const y = e.pageY - rect.top;
      setCoords([x, y]);
    }
  };

  const draw = () => {
    if (!stamp) return;
    const [x, y] = coords;
    const offsetX = x - (stamp.naturalWidth * size) / 2;
    const offsetY = y - (stamp.naturalHeight * size) / 2;
    switch (layer) {
      case 'center-label':
        drawFg(offsetX, offsetY, true, clTexture.ctx);
        break;
      case 'stickers':
        drawFg(offsetX, offsetY, false, fg.ctx);
        break;
      case 'stamps':
        drawFg(offsetX, offsetY, true, fg.ctx);
        break;
      default:
        return;
    }
  };

  const drawFg = (x, y, applyFilter, ctx) => {
    if (applyFilter) {
      ctx.filter = filter;
    } else {
      ctx.filter = 'none';
    }
    ctx.drawImage(
      stamp,
      x,
      y,
      size * stamp.naturalWidth,
      size * stamp.naturalHeight
    );
  };

  return (
    <div className="editor-canvas-wrapper">
      <canvas
        id="canvas-final-back" // final "mixdown" image, used for 3d display
        className="canvas"
        height={`${CANVAS_HEIGHT}px`}
        width={`${CANVAS_HEIGHT}px`}
      ></canvas>
      <canvas
        id="canvas-final-front" // final "mixdown cover"
        className="canvas"
        height={`${CANVAS_HEIGHT}px`}
        width={`${CANVAS_HEIGHT}px`}
      ></canvas>
      <canvas
        id="centerlabel" // draw the centerlabel
        className="canvas"
        height={`${CANVAS_HEIGHT}px`}
        width={`${CANVAS_HEIGHT}px`}
      ></canvas>
      <canvas
        id="centerlabel-texture" // centerlabel texture layer
        className="canvas"
        height={`${CANVAS_HEIGHT}px`}
        width={`${CANVAS_HEIGHT}px`}
        onMouseMove={handleMouseMove}
        onClick={draw}
      ></canvas>
      <canvas
        id="record" // record, no centerlabel
        className="canvas"
        height={`${CANVAS_HEIGHT}px`}
        width={`${CANVAS_HEIGHT}px`}
      ></canvas>
      <canvas
        id="canvas-bg" // record cover template
        className="canvas"
        height={`${CANVAS_HEIGHT}px`}
        width={`${CANVAS_HEIGHT}px`}
      ></canvas>
      <canvas
        id="canvas-fg" // stamps and stickers
        className="canvas"
        height={`${CANVAS_HEIGHT}px`}
        width={`${CANVAS_HEIGHT}px`}
      ></canvas>
      <canvas
        id="bg-texture" // texture of the chosen template
        className="canvas"
        height={`${CANVAS_HEIGHT}px`}
        width={`${CANVAS_HEIGHT}px`}
      ></canvas>
      <Draggable onStop={handleStop}>
        <div
          id="artiste" // artist overlay
          className={`overlay ${artistFont.class}`}
          style={{ color: artistColor, fontSize: `${artistSize}px` }}
        >
          {artist}
        </div>
      </Draggable>
      <Draggable onStop={handleStop}>
        <div
          id="track-ol"
          className={`overlay ${trackFont.class}`} // track name overlay
          style={{ color: trackColor, fontSize: `${trackSize}px` }}
        >
          {track}
        </div>
      </Draggable>
    </div>
  );
};

export default Canvas;
