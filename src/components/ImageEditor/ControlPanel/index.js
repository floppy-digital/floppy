import React, { useContext } from 'react';
import { editorContext } from '@/lib/contexts/editorContext';
import { setArtist, setTrack } from '@/lib/Redux/metadata';
import SaveButton from './SaveButton';
import LayerSelector from '@/components/ImageEditor/ControlPanel/LayerSelector';
import { corsAssetURL } from '@/lib/utils';

const ControlPanel = ({ drawInitialBg }) => {
  const { editor } = useContext(editorContext);
  const fg = editor.fgNode;
  const bg = editor.bgNode;
  const bgTxt = editor.bgTextureNode;
  const record = editor.recordNode;
  const cl = editor.clNode;
  const clTxt = editor.clTextureNode;

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
    // dispatch(setArtist(''));
    // dispatch(setTrack(''));
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
