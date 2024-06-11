import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setFrontURL, setBackURL } from '@/lib/Redux/metadata';
import { corsAssetURL } from '@/lib/utils';

const SaveButton = ({ clearCanvas }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const artist = useSelector((state) => state.metadata.artist);
  const track = useSelector((state) => state.metadata.track);
  const artistPos = useSelector((state) => state.editor.cl.artistPosition);
  const artistFont = useSelector((state) => state.editor.cl.artistFont);
  const artistFontSize = useSelector((state) => state.editor.cl.artistFontSize);
  const artistColor = useSelector((state) => state.editor.cl.artistFontColor);
  const trackPos = useSelector((state) => state.editor.cl.trackPosition);
  const trackFont = useSelector((state) => state.editor.cl.trackFont);
  const trackFontSize = useSelector((state) => state.editor.cl.trackFontSize);
  const trackFontColor = useSelector((state) => state.editor.cl.trackFontColor);
  const fg = useSelector((state) => state.editor.global.fg);
  const bg = useSelector((state) => state.editor.global.bg);
  const bgTxt = useSelector((state) => state.editor.global.bgTexture);
  const cl = useSelector((state) => state.editor.global.cl);
  const clTxt = useSelector((state) => state.editor.global.clTexture);
  const record = useSelector((state) => state.editor.global.record);
  const front = useSelector((state) => state.editor.global.front);
  const back = useSelector((state) => state.editor.global.back);

  const writeTextToCanvas = (ctx, text, posX, posY, artist = true) => {
    if (artist) {
      ctx.font = `${artistFontSize}px ${artistFont.name}`;
      ctx.fillStyle = artistColor;
    } else {
      ctx.font = `${trackFontSize}px ${trackFont.name}`;
      ctx.fillStyle = trackFontColor;
    }
    ctx.fillText(text, posX, posY);
  };

  const drawFinalImages = () => {
    front.ctx.drawImage(cl.canvas, 0, 0);
    writeTextToCanvas(front.ctx, artist, artistPos[0], artistPos[1]);
    writeTextToCanvas(front.ctx, track, trackPos[0], trackPos[1], false);
    front.ctx.drawImage(clTxt.canvas, 0, 0);
    front.ctx.drawImage(record.canvas, 0, 0);
    front.ctx.drawImage(bg.canvas, 0, 0);

    front.ctx.globalCompositeOperation = 'source-atop';
    front.ctx.drawImage(fg.canvas, 0, 0);

    front.ctx.globalCompositeOperation = 'screen';
    front.ctx.drawImage(bgTxt.canvas, 0, 0);
    const frontImgURL = front.canvas.toDataURL('image/png');

    back.ctx.save();
    back.ctx.scale(-1, 1);
    back.ctx.drawImage(cl.canvas, 0, 0, cl.canvas.width * -1, cl.canvas.height);
    back.ctx.drawImage(
      clTxt.canvas,
      0,
      0,
      clTxt.canvas.width * -1,
      clTxt.canvas.height
    );
    back.ctx.drawImage(bg.canvas, 0, 0, bg.canvas.width * -1, bg.canvas.height);
    back.ctx.drawImage(
      bgTxt.canvas,
      0,
      0,
      bgTxt.canvas.width * -1,
      bgTxt.canvas.height
    );
    back.ctx.restore();
    const backImgURL = back.canvas.toDataURL('image/png');

    dispatch(setFrontURL(frontImgURL));
    dispatch(setBackURL(backImgURL));
  };

  const clearAndReset = () => {
    front.ctx.clearRect(0, 0, front.canvas.width, front.canvas.height);
    back.ctx.clearRect(0, 0, back.canvas.width, back.canvas.height);
    clearCanvas();
  };

  const saveAndDownload = () => {
    drawFinalImages();
    clearAndReset();
    router.push('/upload');
  };

  return (
    <img
      id="save"
      src={`${corsAssetURL}/bg_images/save_redux.png`}
      onClick={saveAndDownload}
    />
  );
};

export default SaveButton;
