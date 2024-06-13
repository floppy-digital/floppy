import React, { useContext } from 'react';
import { editorContext } from '@/lib/contexts/editorContext';
import { metadataContext } from '@/lib/contexts/metadataContext';
import { corsAssetURL } from '@/lib/utils';
import {
  ColorSelector,
  SizeSelector,
  TextInput,
  FontSelector,
} from './Controls';

const CenterLabel = ({ chooseStamp }) => {
  const { setArtist, setTrack } = useContext(metadataContext);
  const {
    editor,
    setCLStampSize,
    setCLStampFilter,
    setCLStampColor,
    setCenterLabelFilter,
    setArtistFont,
    setArtistFontColor,
    setArtistFontSize,
    setTrackFont,
    setTrackFontColor,
    setTrackFontSize,
    setCenterLabelColor,
  } = useContext(editorContext);
  const clColor = editor.cl.clColor;
  const stampColor = editor.cl.stampColor;
  const stampSize = editor.cl.stampSize;
  const artistFont = editor.cl.artistFont;
  const trackFont = editor.cl.trackFont;
  const artistColor = editor.cl.artistFontColor;
  const trackColor = editor.cl.trackFontColor;
  const artistFontSize = editor.cl.artistFontSize;
  const trackFontSize = editor.cl.trackFontSize;

  return (
    <div className="container controls-drawer">
      <div className="assets-container-wrapper">
        <div className="assets-container">
          {[...Array(13)].map((_, i) => {
            return (
              <img
                id={`cl_${i + 1}`}
                className="cl_stamp stamp_invert"
                src={`${corsAssetURL}/CENTER_LABEL_ASSETS/CL_${i + 1}.png`}
                onClick={chooseStamp}
                key={i}
              />
            );
          })}
        </div>
      </div>
      <div className="controls-container">
        <div>
          <div className="cl_color_selector">
            <ColorSelector
              action={setCLStampFilter}
              action2={setCLStampColor}
              value={stampColor}
            />
            <div id="cl-color-wrapper">
              <ColorSelector
                action={setCenterLabelFilter}
                action2={setCenterLabelColor}
                value={clColor}
                isCL={true}
              />
              <img
                id="cl-color-img"
                src={`${corsAssetURL}/bg_images/centerlabelcolor.png`}
              />
            </div>
          </div>
          <SizeSelector action={setCLStampSize} size={stampSize} />
        </div>
        <div className="track-info-input">
          <div className="">
            <TextInput
              action={setArtist}
              title={'Artist Name'}
              label={'artist-text'}
              fontSrc={artistFont}
            />
            <div className="font-and-size">
              <FontSelector action={setArtistFont} destination="artist" />
              <SizeSelector
                action={setArtistFontSize}
                size={artistFontSize}
                text={true}
              />
            </div>
          </div>
          <ColorSelector
            action={setArtistFontColor}
            value={artistColor}
            isFont={true}
          />
        </div>
        <div className="track-info-input">
          <div>
            <TextInput
              action={setTrack}
              title={'Track Name'}
              label={'track-text'}
              fontSrc={trackFont}
            />
            <div className="font-and-size">
              <FontSelector action={setTrackFont} destination="track" />
              <SizeSelector
                action={setTrackFontSize}
                size={trackFontSize}
                text={true}
              />
            </div>
          </div>
          <ColorSelector
            action={setTrackFontColor}
            value={trackColor}
            isFont={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CenterLabel;
