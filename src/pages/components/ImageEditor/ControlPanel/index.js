import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setArtist, setTrack } from '../../../Redux/metadata';
import SaveButton from './SaveButton';
import LayerSelector from './LayerSelector';
import { corsAssetURL } from '../../../lib/utils';

const ControlPanel = ({ drawInitialBg }) => {
  const dispatch = useDispatch();
  const fg = useSelector((state) => state.editor.global.fg);
  const bg = useSelector((state) => state.editor.global.bg);
  const bgTxt = useSelector((state) => state.editor.global.bgTexture);
  const record = useSelector((state) => state.editor.global.record);
  const cl = useSelector((state) => state.editor.global.cl);
  const clTxt = useSelector((state) => state.editor.global.clTexture);

  const clearCanvas = () => {
    fg.ctx.clearRect(0, 0, fg.canvas.width, fg.canvas.height);
    bg.ctx.clearRect(0, 0, bg.canvas.width, bg.canvas.height);
    bgTxt.ctx.clearRect(0, 0, bgTxt.canvas.width, bgTxt.canvas.height);
    record.ctx.clearRect(0, 0, record.canvas.width, record.canvas.height);
    cl.ctx.clearRect(0, 0, cl.canvas.width, cl.canvas.height);
    clTxt.ctx.clearRect(0, 0, clTxt.canvas.width, clTxt.canvas.height);
    drawInitialBg(clTxt.ctx, cl.ctx, record.ctx);
  };

  const reset = () => {
    clearCanvas();
    dispatch(setArtist(''));
    dispatch(setTrack(''));
  };

  return (
    <div className="control-panel">
      <LayerSelector />
      <div className="permanent">
        <img
          id="clear"
          src={`${corsAssetURL}/bg_images/reset_redux.png`}
          onClick={reset}
        />
        <SaveButton clearCanvas={clearCanvas} />
      </div>
    </div>
  );
};

export default ControlPanel;
