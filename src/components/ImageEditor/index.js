import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setOverlay,
  setBg,
  setFg,
  setCl,
  setFront,
  setBack,
  setRecord,
} from '../../Redux/editor/global';
import Canvas from './Canvas';
import ControlPanel from './ControlPanel';
import { corsAssetURL, CANVAS_HEIGHT } from '../../lib/utils';

const ImageEditor = () => {
  const dispatch = useDispatch();
  const stamp = useSelector((state) => state.editor.global.stamp);
  const overlay = useSelector((state) => state.editor.global.overlay);
  const size = useSelector((state) => state.editor.global.size);
  const filter = useSelector((state) => state.editor.global.filter);
  const fg = useSelector((state) => state.editor.global.fg);
  const layer = useSelector((state) => state.editor.global.layer);

  const drawInitialBg = (ctx1, ctx2, ctx3) => {
    const clTextureImg = new Image(CANVAS_HEIGHT, CANVAS_HEIGHT);
    clTextureImg.src = `${corsAssetURL}/RECORD_CENTERLABEL/Centerlabel_Texture.png`;
    clTextureImg.setAttribute('crossorigin', 'anonymous');
    clTextureImg.onload = () => {
      ctx1.filter = 'none';
      ctx1.drawImage(
        clTextureImg,
        0,
        0,
        clTextureImg.width,
        clTextureImg.height
      );
    };

    const centerImg = new Image(CANVAS_HEIGHT, CANVAS_HEIGHT);
    centerImg.src = `${corsAssetURL}/RECORD_CENTERLABEL/Centerlabel.png`;
    centerImg.setAttribute('crossorigin', 'anonymous');
    centerImg.onload = () => {
      ctx2.filter = 'none';
      ctx2.drawImage(centerImg, 0, 0, centerImg.width, centerImg.height);
    };

    const recordImg = new Image(CANVAS_HEIGHT, CANVAS_HEIGHT);
    recordImg.src = `${corsAssetURL}/RECORD_CENTERLABEL/record.png`;
    recordImg.setAttribute('crossorigin', 'anonymous');
    recordImg.onload = () => {
      ctx3.filter = 'none';
      ctx3.drawImage(recordImg, 0, 0, recordImg.width, recordImg.height);
    };
  };

  const moveOverlay = (e) => {
    if (!stamp) {
      return;
    }
    if (layer == 'stickers') {
      overlay.style.filter = 'none';
    } else {
      if (overlay.style.filter !== filter) overlay.style.filter = filter;
    }
    const rect = fg.canvas.getBoundingClientRect();
    const x = e.pageX - (stamp.naturalWidth * size) / 2;
    const y = e.pageY - (stamp.naturalHeight * size) / 2;
    overlay.style.top = `${y}px`;
    overlay.style.left = `${x}px`;

    if (
      e.pageX > rect.right ||
      e.pageX < rect.left ||
      e.pageY < rect.top ||
      e.pageY > rect.bottom
    ) {
      overlay.style.opacity = 0;
    } else {
      if (overlay.style.opacity == 0) {
        overlay.style.opacity = 0.7;
      }
    }
  };

  useEffect(() => {
    const prepareCanvas = () => {
      const _bg = document.getElementById('canvas-bg');
      const _bgCtx = _bg.getContext('2d');
      const _bgTxt = document.getElementById('bg-texture');
      const _bgTxtCtx = _bgTxt.getContext('2d');
      const _fg = document.getElementById('canvas-fg');
      const _fgCtx = _fg.getContext('2d');
      const _record = document.getElementById('record');
      const _recordCtx = _record.getContext('2d');
      const _cl = document.getElementById('centerlabel');
      const _clCtx = _cl.getContext('2d');
      const _clTxt = document.getElementById('centerlabel-texture');
      const _clTxtCtx = _clTxt.getContext('2d');
      const _overlay = document.getElementById('stamp-ol');
      const _front = document.getElementById('canvas-final-front');
      const _frontCtx = _front.getContext('2d');
      const _back = document.getElementById('canvas-final-back');
      const _backCtx = _back.getContext('2d');

      dispatch(setFront({ canvas: _front, ctx: _frontCtx }));
      dispatch(setBack({ canvas: _back, ctx: _backCtx }));
      dispatch(setOverlay(_overlay));
      dispatch(setFg({ canvas: _fg, ctx: _fgCtx }));
      dispatch(setRecord({ canvas: _record, ctx: _recordCtx }));
      dispatch(
        setBg({ canvas: _bg, ctx: _bgCtx }, { canvas: _bgTxt, ctx: _bgTxtCtx })
      );
      dispatch(
        setCl({ canvas: _cl, ctx: _clCtx }, { canvas: _clTxt, ctx: _clTxtCtx })
      );
      drawInitialBg(_clTxtCtx, _clCtx, _recordCtx);
    };

    prepareCanvas();
  }, []);

  return (
    <div className="editor-wrapper ff-3" id="dub" onMouseMove={moveOverlay}>
      <ControlPanel drawInitialBg={drawInitialBg} />
      <Canvas />
      <img
        id="stamp-ol"
        className="overlay"
        src={stamp ? stamp.src : ''}
        height={stamp ? `${stamp.naturalHeight * size}px` : ''}
      ></img>
    </div>
  );
};

export default ImageEditor;
