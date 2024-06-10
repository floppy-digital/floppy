import React from 'react';
import { useSelector } from 'react-redux';
import { corsAssetURL } from '../../../../lib/utils';
import { ColorSelector, SizeSelector } from './Controls';
import { setColor, setFilter, setSize } from '../../../../Redux/editor/stamps';

const Stamps = ({ chooseStamp }) => {
  const size = useSelector((state) => state.editor.stamps.size);
  const colorValue = useSelector((state) => state.editor.stamps.color);
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
          action={setFilter}
          action2={setColor}
          value={colorValue}
        />
        <SizeSelector action={setSize} size={size} />
      </div>
    </div>
  );
};

export default Stamps;
