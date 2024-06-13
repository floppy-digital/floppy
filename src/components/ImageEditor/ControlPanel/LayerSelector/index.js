import React, { useContext } from 'react';
import { editorContext } from '@/lib/contexts/editorContext';
import Templates from './Templates';
import Stamps from './Stamps';
import Stickers from './Stickers';
import CenterLabel from './CenterLabel';
import { corsAssetURL } from '@/lib/utils';

const LayerTitle = ({ title, size, filter }) => {
  const { editor, setLayer, setStamp, setStampSize, setStampFilter } =
    useContext(editorContext);
  const layer = editor.layer;
  const state = layer == title ? 'clicked' : 'default';

  const chooseLayer = (e) => {
    setLayer(e.target.id);
    setStamp(null);
    setStampSize(size);
    setStampFilter(filter);
  };
  return (
    <img
      id={title}
      src={`${corsAssetURL}/bg_images/Categories/${title}_${state}.png`}
      onClick={chooseLayer}
    />
  );
};

const LayerSelector = () => {
  const { editor, setStamp } = useContext(editorContext);
  const stamp = editor.stamp;
  const layer = editor.layer;
  const templateFilter = editor.template.filter;
  const clStampFilter = editor.cl.stampFilter;
  const clStampSize = editor.cl.stampSize;
  const stampSize = editor.stamps.size;
  const stampFilter = editor.stamps.filter;
  const stickerSize = editor.stickerSize;

  const chooseStamp = (e) => {
    if (stamp) {
      stamp.classList.remove('selected');
    }
    setStamp(e.target);
    e.target.classList.add('selected');
  };

  return (
    <div className="container layer-selector">
      <LayerTitle title="template" size={0.5} filter={templateFilter} />
      {layer == 'template' && <Templates chooseStamp={chooseStamp} />}
      <LayerTitle
        title="center-label"
        size={clStampSize}
        filter={clStampFilter}
      />
      {layer == 'center-label' && <CenterLabel chooseStamp={chooseStamp} />}
      <LayerTitle title="stamps" size={stampSize} filter={stampFilter} />
      {layer == 'stamps' && <Stamps chooseStamp={chooseStamp} />}
      <LayerTitle title="stickers" size={stickerSize} filter={null} />
      {layer == 'stickers' && <Stickers chooseStamp={chooseStamp} />}
    </div>
  );
};

export default LayerSelector;
