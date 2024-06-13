/* previously in components/Upload.js */

import React, { useState, useEffect, useContext } from 'react';
import { metadataContext } from '@/lib/contexts/metadataContext';
import { userContext } from '@/lib/contexts/userContext';
import { useRouter } from 'next/router';
import { corsAssetURL, moralisGateway } from '@/lib/utils';
import { saveAssetsToIPFS, saveMetadataToIPFS } from '@/lib/ipfs';
import { uploadDubplate } from '@/lib/db';

export default function Upload() {
  const { metadata } = useContext(metadataContext);
  const { isAuthenticated } = useContext(userContext);
  const frontURL = metadata.frontURL;
  const backURL = metadata.backURL;
  const audioURL = metadata.audioURL;
  const artist = metadata.artist;
  const track = metadata.track;
  const [artistName, setArtistName] = useState('');
  const [trackName, setTrackName] = useState('');
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState('uploading...');
  const [showMessage, setShowMessage] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();

  const updatePrice = (e) => {
    setPrice(e.target.value);
  };

  const blobToBase64 = (url) => {
    return new Promise(async (resolve, _) => {
      const res = await fetch(url);
      const blob = await res.blob();

      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        resolve(reader.result);
      };
    });
  };

  const saveToDatabase = async () => {
    const frontImage = {
      path: `${encodeURIComponent(trackName)}_front.png`,
      content: frontURL,
    };

    const backImage = {
      path: `${encodeURIComponent(trackName)}_back.png`,
      content: backURL,
    };

    const audioBase64 = await blobToBase64(audioURL);

    const audioData = {
      path: `${encodeURIComponent(trackName)}.webm`,
      content: audioBase64,
    };

    const hashes = await saveAssetsToIPFS(frontImage, backImage, audioData);

    const metadata = {
      name: `${artistName} - ${trackName}`,
      description: 'a floppy dubplate',
      image: hashes[0],
      animation_url: hashes[2],
    };

    const metadataHash = await saveMetadataToIPFS(
      btoa(JSON.stringify(metadata)),
      `${encodeURIComponent(trackName)}_metadata.json`
    );

    const audio = document.getElementById('audio');
    const audioDuration = (audio.duration / 60).toFixed(2).replace('.', ':');

    await uploadDubplate({
      artist: artistName,
      track: trackName,
      price: price,
      front: hashes[0],
      back: hashes[1],
      audio: hashes[2],
      length: audioDuration,
      metadataHash: metadataHash,
      status: 'new',
    });

    setMessage('object saved successfully');
  };

  const saveFinal = async () => {
    if (disabled) {
      setMessage('please fill out all fields');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setMessage('uploading...');
      }, 2000);
    } else if (!isAuthenticated) {
      setMessage('please connect wallet to upload');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setMessage('uploading...');
      }, 2000);
    } else {
      setDisabled(true);
      setShowMessage(true);
      await saveToDatabase();
      router.push('/crates');
    }
  };

  useEffect(() => {
    if (artistName.length > 0 && trackName.length > 0 && audioURL.length > 0) {
      setDisabled(false);
    }
  }, [artistName, trackName, price, audioURL]);

  useEffect(() => {
    const onLoad = () => {
      setArtistName(artist);
      setTrackName(track);
    };
    onLoad();
  }, []);

  return (
    <div className="upload-wrapper">
      <img src={frontURL} />
      <div className="upload-inner-wrapper">
        <label htmlFor="artist-name">Artist</label>
        <input
          id="artist-name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        ></input>
        <label htmlFor="track-name">Track</label>
        <input
          id="track-name"
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
        ></input>
        <label htmlFor="price">Price (Eth)</label>
        <input
          id="price"
          type="number"
          min={0}
          step={0.1}
          onChange={updatePrice}
          value={price}
        ></input>
        {audioURL && <audio id="audio" src={audioURL} controls></audio>}
        <img
          id="upload-save"
          src={`${corsAssetURL}/bg_images/save_redux.png`}
          onClick={saveFinal}
        />
        <button onClick={() => router.push('/')}>X</button>
      </div>
      {showMessage && (
        <div className="message-container crates-border">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
