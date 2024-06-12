import React, { useContext } from 'react';
import { editorContext } from '@/lib/contexts/editorContext';
import { corsAssetURL } from '@/lib/utils';
import { SizeSelector } from './Controls';

const Stickers = ({ chooseStamp }) => {
  const { editor, setStickerSize } = useContext(editorContext);
  const size = editor.stickerSize;
  return (
    <div className="container controls-drawer">
      <div className="assets-container-wrapper">
        <div className="assets-container">
          {[...Array(15)].map((_, i) => {
            return (
              <img
                id={`sticker_${i + 1}`}
                className="sticker"
                src={`${corsAssetURL}/STICKERS/STICKER_${i + 1}.png`}
                onClick={chooseStamp}
                key={i}
              />
            );
          })}
          {[...Array(5)].map((_, i) => {
            return (
              <img
                id={`price_sticker_${i + 2}`}
                className="sticker"
                src={`${corsAssetURL}/STICKERS/FW_Sticker_0${i + 2}.png`}
                onClick={chooseStamp}
                key={i}
              />
            );
          })}
        </div>
      </div>
      <div className="controls-container">
        <SizeSelector action={setStickerSize} size={size} />
      </div>
    </div>
  );
};

export default Stickers;
