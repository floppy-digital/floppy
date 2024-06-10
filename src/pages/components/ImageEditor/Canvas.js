import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { useSelector, useDispatch } from 'react-redux';
import {
  setArtistPosition,
  setTrackPosition,
} from '../../Redux/editor/centerLabel';
import { CANVAS_HEIGHT } from '../../lib/utils';

const Canvas = () => {
  const dispatch = useDispatch();
  const stamp = useSelector((state) => state.editor.global.stamp);
  const layer = useSelector((state) => state.editor.global.layer);
  const size = useSelector((state) => state.editor.global.size);
  const filter = useSelector((state) => state.editor.global.filter);
  const fg = useSelector((state) => state.editor.global.fg);
  const clTexture = useSelector((state) => state.editor.global.clTexture);
  const artistFont = useSelector((state) => state.editor.cl.artistFont);
  const artistSize = useSelector((state) => state.editor.cl.artistFontSize);
  const artistColor = useSelector((state) => state.editor.cl.artistFontColor);
  const trackFont = useSelector((state) => state.editor.cl.trackFont);
  const trackSize = useSelector((state) => state.editor.cl.trackFontSize);
  const trackColor = useSelector((state) => state.editor.cl.trackFontColor);
  const artist = useSelector((state) => state.metadata.artist);
  const track = useSelector((state) => state.metadata.track);
  const [coords, setCoords] = useState(null);

  const handleStop = (e) => {
    const targetRect = e.target.getBoundingClientRect();
    const canvasRect = fg.canvas.getBoundingClientRect();
    const _x = targetRect.left - canvasRect.left;
    const _y = targetRect.bottom - canvasRect.top - targetRect.height / 4;

    if (e.target.id === 'artiste') {
      dispatch(setArtistPosition([_x, _y]));
    } else {
      dispatch(setTrackPosition([_x, _y]));
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
