import React, { useContext, useState } from 'react';
import { editorContext } from '@/lib/contexts/editorContext';
import {
  Color,
  Solver,
  CANVAS_HEIGHT,
  getFontName,
  corsAssetURL,
} from '@/lib/utils';

const ColorSelector = ({
  action,
  action2 = null,
  value,
  isFont = false,
  isCL = false,
  isTemplate = false,
}) => {
  const { editor, setOverlayFilter } = useContext(editorContext);
  const bg = editor.bgNode;
  const template = editor.templateImage;
  const overlay = editor.overlay;
  const cl = editor.clNode;
  const dimensions = isFont ? '50px' : '100px';

  const drawBg = (filter) => {
    bg.ctx.clearRect(0, 0, bg.canvas.width, bg.canvas.height);
    bg.ctx.filter = filter;
    bg.ctx.drawImage(template, 0, 0, CANVAS_HEIGHT, CANVAS_HEIGHT);
  };

  const drawCenterLabel = (filter) => {
    cl.ctx.clearRect(0, 0, cl.canvas.width, cl.canvas.height);
    const image = new Image(CANVAS_HEIGHT, CANVAS_HEIGHT);
    image.src = `${corsAssetURL}/RECORD_CENTERLABEL/Centerlabel.png`;
    cl.ctx.filter = filter;
    image.onload = () => {
      cl.ctx.drawImage(image, 0, 0, CANVAS_HEIGHT, CANVAS_HEIGHT);
    };
  };

  const setTextColor = (e) => {
    action(e.target.value);
  };

  const setColorFilter = (e) => {
    const val = e.target.value;
    const r = parseInt(val.substring(1, 3), 16);
    const g = parseInt(val.substring(3, 5), 16);
    const b = parseInt(val.substring(5, 7), 16);

    const _color = new Color(r, g, b);
    const solver = new Solver(_color);
    const result = solver.solve();

    const filterCSS = result.filter;
    overlay.style.filter = filterCSS;
    setOverlayFilter(filterCSS);
    action(filterCSS);
    action2(e.target.value);
    if (isTemplate && template) {
      drawBg(filterCSS);
    } else if (isCL) {
      drawCenterLabel(filterCSS);
    }
  };

  const handleChange = (e) => {
    if (isFont) {
      setTextColor(e);
    } else {
      setColorFilter(e);
    }
  };

  return (
    <input
      className={`color-selector ${isCL ? 'cl-color' : ''}`}
      type="color"
      style={{ width: dimensions, height: dimensions }}
      value={value}
      onChange={handleChange}
    ></input>
  );
};

const SizeSelector = ({ action, size, text = false }) => {
  const { setOverlaySize } = useContext(editorContext);
  const setStampSize = (e) => {
    setOverlaySize(e.target.value);
    action(e.target.value);
  };
  const min = text ? '8' : '0.25';
  const max = text ? '40' : '0.5';

  return (
    <div className="input-wrapper">
      <input
        className="size-input"
        type="range"
        name="size"
        min={min}
        max={max}
        value={size}
        step=".01"
        onChange={setStampSize}
      />
      <label className="size-label" htmlFor="size">
        Size
      </label>
    </div>
  );
};

const TextInput = ({ action, label, fontSrc }) => {
  const { setStamp } = useContext(editorContext);

  const hideOverlay = () => {
    setStamp(null);
  };

  const write = (e) => {
    action(e.target.value);
  };
  return (
    <div className={`text-input ${fontSrc.class}`} id={label}>
      <input onChange={write} onClick={hideOverlay}></input>
    </div>
  );
};

const FontSelector = ({ action, destination }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  const selectFont = (e) => {
    action({
      class: e.target.className.split(' ')[0],
      name: getFontName(e.target.id),
    });

    setShow(false);
  };

  return (
    <div className="fonts--wrapper">
      <div id={`${destination}`} onClick={toggleShow}>
        {/* Font */}
      </div>
      {show && (
        <ul className="fonts">
          {[...Array(33)].map((_, i) => {
            return (
              <li
                id={`${destination}-font-${i}`}
                className={`ff-${i} fs-100`}
                key={i}
                onClick={selectFont}
              >
                Sample
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export { ColorSelector, SizeSelector, TextInput, FontSelector };
