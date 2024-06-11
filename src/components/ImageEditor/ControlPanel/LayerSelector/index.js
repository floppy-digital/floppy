import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLayer,
  setStamp,
  setSize,
  setFilter,
} from '@/lib/Redux/editor/global';
import Templates from './Templates';
import Stamps from './Stamps';
import Stickers from './Stickers';
import CenterLabel from './CenterLabel';
import { corsAssetURL } from '@/lib/utils';

const LayerTitle = ({ title, size, filter }) => {
  const dispatch = useDispatch();
  const layer = useSelector((state) => state.editor.global.layer);
  const state = layer == title ? 'clicked' : 'default';

  const chooseLayer = (e) => {
    dispatch(setLayer(e.target.id));
    dispatch(setStamp(null));
    dispatch(setSize(size));
    dispatch(setFilter(filter));
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
  const dispatch = useDispatch();
  const stamp = useSelector((state) => state.editor.global.stamp);
  const layer = useSelector((state) => state.editor.global.layer);
  const templateFilter = useSelector((state) => state.editor.template.filter);
  const clStampFilter = useSelector((state) => state.editor.cl.stampFilter);
  const clStampSize = useSelector((state) => state.editor.cl.stampSize);
  const stampSize = useSelector((state) => state.editor.stamps.size);
  const stampFilter = useSelector((state) => state.editor.stamps.filter);
  const stickerSize = useSelector((state) => state.editor.stickers.size);

  const chooseStamp = (e) => {
    if (stamp) {
      stamp.classList.remove('selected');
    }
    dispatch(setStamp(e.target));
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
