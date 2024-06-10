import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTemplate } from '../../../../Redux/editor/global';
import { setFilter, setColor } from '../../../../Redux/editor/template';
import { corsAssetURL, CANVAS_HEIGHT } from '../../../../lib/utils';
import { ColorSelector } from './Controls';

const Templates = () => {
  const dispatch = useDispatch();
  const bg = useSelector((state) => state.editor.global.bg);
  const bgT = useSelector((state) => state.editor.global.bgTexture);
  const colorValue = useSelector((state) => state.editor.template.color);
  const filter = useSelector((state) => state.editor.template.filter);

  const drawBg = (e) => {
    const baseString = e.target.src.split('_')[0];

    bg.ctx.clearRect(0, 0, bg.canvas.width, bg.canvas.height);
    bgT.ctx.clearRect(0, 0, bg.canvas.width, bg.canvas.height);

    bg.ctx.filter = filter;
    if (e.target.id !== 'cover-9') {
      const bgImg = new Image(CANVAS_HEIGHT, CANVAS_HEIGHT);
      bgImg.src = `${baseString}_Cover.png`;
      bgImg.onload = () => {
        bg.ctx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height);
      };
    }

    const textureImg = new Image(CANVAS_HEIGHT, CANVAS_HEIGHT);
    textureImg.src = `${baseString}_Cover_Texture.png`;

    textureImg.onload = () => {
      bgT.ctx.drawImage(textureImg, 0, 0, textureImg.width, textureImg.height);
    };

    dispatch(setTemplate(e.target));
  };

  return (
    <div className="container controls-drawer">
      <div className="assets-container-wrapper">
        <div className="assets-container">
          {[...Array(15)].map((_, i) => {
            return (
              <img
                key={i}
                id={`cover-${i + 1}`}
                className={'template'}
                src={`${corsAssetURL}/TEMPLATES/cover-${i + 1}/${String(
                  i + 1
                ).padStart(2, 0)}_Cover_Thumb.png`}
                onClick={drawBg}
              />
            );
          })}
        </div>
      </div>
      <div className="controls-container">
        <ColorSelector
          action={setFilter}
          action2={setColor}
          value={colorValue}
          isTemplate={true}
        />
      </div>
    </div>
  );
};

export default Templates;
