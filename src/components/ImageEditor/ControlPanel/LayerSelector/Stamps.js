import React, { useContext } from 'react';
import { editorContext } from '@/lib/contexts/editorContext';
import { corsAssetURL } from '@/lib/utils';
import { ColorSelector, SizeSelector } from './Controls';

const Stamps = ({ chooseStamp }) => {
  const { editor, setStampColor, setStampFilter, setStampSize } =
    useContext(editorContext);
  const size = editor.stamps.size;
  const colorValue = editor.stamps.color;
  return (
    <div className="container controls-drawer">
      <div className="assets-container-wrapper">
        <div className="assets-container">
          <img
            id="bassface_stamp"
            className="stamp_invert  stamp_med"
            src={`${corsAssetURL}/STAMPS/bassface-stamp.png`}
            onClick={chooseStamp}
          />
          <img
            id="floppy-disk"
            className="stamp_invert stamp_med"
            src={`${corsAssetURL}/STAMPS/floppy-disk-stamp.png`}
            onClick={chooseStamp}
          />
          <img
            id="floppy-stamp"
            className="stamp_invert stamp_med"
            src={`${corsAssetURL}/STAMPS/floppy-stamp.png`}
            onClick={chooseStamp}
          />
          <img
            id="in-n-out-stamp"
            className="stamp_invert stamp_med"
            src={`${corsAssetURL}/STAMPS/in-n-out-stamp.png`}
            onClick={chooseStamp}
          />
          <img
            id="m27-stamp"
            className="stamp_invert stamp_med"
            src={`${corsAssetURL}/STAMPS/m27-stamps.png`}
            onClick={chooseStamp}
          />
          <img
            id="shake-stamp"
            className="stamp_invert stamp_med"
            src={`${corsAssetURL}/STAMPS/m27-shake-stamp.png`}
            onClick={chooseStamp}
          />
        </div>
      </div>
      <div className="controls-container">
        <ColorSelector
          action={setStampFilter}
          action2={setStampColor}
          value={colorValue}
        />
        <SizeSelector action={setStampSize} size={size} />
      </div>
    </div>
  );
};

export default Stamps;
