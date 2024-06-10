import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MainCanvas from './RecordViewer';
import { moralisGateway, corsAssetURL } from '../../lib/utils';
import { fetchDubplates } from '../../lib/db';

function AudioPlayer({
  dubplate,
  timelineRef,
  previous,
  next,
  opacity,
  setOpacity,
}) {
  const audioRef = useRef();
  const [src, setSrc] = useState(
    `${corsAssetURL}/crates_ui_assets/cratesplaybutton_sizedforpopup.png`
  );

  const toggleOpacity = () => {
    if (opacity === 0) {
      setOpacity(100);
    } else {
      setOpacity(0);
    }
  };

  const play = (e) => {
    if (
      audioRef.current.paused ||
      audioRef.current.currentTime == 0 ||
      audioRef.current.currentTime == audioRef.current.duration
    ) {
      audioRef.current.play();
      audioRef.current.onended = () => {
        setSrc(
          `${corsAssetURL}/crates_ui_assets/cratesplaybutton_sizedforpopup.png`
        );
      };
      setSrc(`${corsAssetURL}/listener_3d_assets/Pause_button.png`);
    } else {
      audioRef.current.pause();
      setSrc(
        `${corsAssetURL}/crates_ui_assets/cratesplaybutton_sizedforpopup.png`
      );
    }
  };

  const scrub = (e) => {
    audioRef.current.currentTime =
      (e.target.value * audioRef.current.duration) / 100;
  };

  useEffect(() => {
    const update = () => {
      const percentage = (
        (100 * audioRef.current.currentTime) /
        audioRef.current.duration
      ).toFixed(1);
      const percentagePosition = isNaN(percentage) ? 0 : percentage;
      timelineRef.current.style.backgroundSize = `${percentagePosition}% 100%`;
      timelineRef.current.value = percentagePosition;
    };

    if (audioRef.current) {
      audioRef.current.ontimeupdate = update;
    }
  });

  return (
    <div className="controls-wrapper ">
      <div className="controls-inner-wrapper">
        <div className="button-wrapper">
          <img
            src={`${corsAssetURL}/listener_3d_assets/previous_track_button.png`}
            onClick={previous}
          />
          <img src={src} onClick={play} />
          <img
            src={`${corsAssetURL}/listener_3d_assets/next_track_button.png`}
            onClick={next}
          />
        </div>
        <div className="player-3d-middle-row">
          <div className={`player-3d-timeline-wrapper`}>
            <input
              type="range"
              className={`timeline-3d`}
              max={100}
              step={0.1}
              defaultValue={0}
              onChange={scrub}
              ref={timelineRef}
            ></input>
            <img
              className={`player-3d-timeline-bg`}
              src={`${corsAssetURL}/listener_3d_assets/playlist_track_scoller_background.png`}
            ></img>
            <img
              className={`player-3d-timeline-bg-upper`}
              src={`${corsAssetURL}/listener_3d_assets/track_scroll_black.png`}
            ></img>
          </div>
          <img
            className="playlist-button-default"
            src={`${corsAssetURL}/listener_3d_assets/playlist_button_default.png`}
            onClick={toggleOpacity}
          ></img>
        </div>
        <div className="track-info">
          <div>
            <p>{dubplate.artist}</p>
            <p>-</p>
            <p>{dubplate.track}</p>
          </div>
          <div>
            <p>{dubplate.price ? dubplate.price : 0.1} ETH</p>
            <img
              src={`${corsAssetURL}/listener_3d_assets/buy_button_default.png`}
            />
          </div>
        </div>
      </div>
      <audio
        id="player"
        ref={audioRef}
        src={`${moralisGateway}/${dubplate.audio}`}
      ></audio>
    </div>
  );
}

function Playlist({ dubplates, current, opacity, setIndex }) {
  return (
    <div className="playlist-outer-wrapper " style={{ opacity: opacity }}>
      <div className="playlist-wrapper ">
        {dubplates.map((dubplate, i) => {
          return (
            <div
              className={`playlist-item${current === i ? '-selected' : ''}`}
              onClick={() => setIndex(i)}
              key={i}
            >
              <p>
                {dubplate.artist} ------ {dubplate.track}
              </p>
              <div>
                <p>{dubplate.length ? dubplate.length : '4:20'}</p>
                <img
                  src={`${corsAssetURL}/listener_3d_assets/buy_button_default.png`}
                />
                <p>{dubplate.price ? dubplate.price : 0.1} ETH</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Player3D() {
  const [dubplates, setDubplates] = useState([]);
  const [index, setIndex] = useState(0);
  const [frontURL, setFrontURL] = useState(null);
  const [backURL, setBackURL] = useState(null);
  const [opacity, setOpacity] = useState(0);
  const timelineRef = useRef();

  useEffect(() => {
    async function _fetchDubplates() {
      const _dubplates = await fetchDubplates();
      setDubplates(_dubplates);
    }
    _fetchDubplates();
  }, []);

  useEffect(() => {
    const fetchImage = async (url, callback) => {
      const { data } = await axios.post('/api/ipfs/fetch', { url });
      callback(`data:image/jpeg;base64, ${data}`);
    };

    if (dubplates[index]) {
      fetchImage(dubplates[index].front, setFrontURL);
      fetchImage(dubplates[index].back, setBackURL);
    }
  }, [dubplates[index]]);

  const next = () => {
    const nextIndex = (index + 1) % dubplates.length;
    setIndex(nextIndex);
  };

  const previous = () => {
    const prevIndex = index - 1;
    if (prevIndex < 0) {
      setIndex(dubplates.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <div id="crates" className="">
      {dubplates[index] && (
        <div className="crates-content-wrapper">
          <div className="canvas-wrapper">
            {backURL && frontURL && (
              <MainCanvas front={frontURL} back={backURL} />
            )}
          </div>
          <div className="crates-playlist-wrapper">
            <Playlist
              dubplates={dubplates}
              current={index}
              opacity={opacity}
              setIndex={setIndex}
            />
            <AudioPlayer
              dubplate={dubplates[index]}
              timelineRef={timelineRef}
              next={next}
              previous={previous}
              opacity={opacity}
              setOpacity={setOpacity}
            />
          </div>
        </div>
      )}
    </div>
  );
}
