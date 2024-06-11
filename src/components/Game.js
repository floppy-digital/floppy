import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setTrack, setAudioURL } from '@/lib/Redux/metadata';
import HTMLPlayer from '@/components/HTMLPlayer';
import { listenForRecordOn, listenForRecordOff } from '@/lib/db';

const initialMessage = 'new upload, do you want to go to the image editor?';

const Game = () => {
  const [started, setStarted] = useState(false);
  const [playerIP, setPlayerIP] = useState();
  const [ctx, setCtx] = useState(null);
  // const address = useSelector((state) => state.user.address);
  const [uploadMessage, setUploadMessage] = useState(initialMessage);
  const [showUploadMessage, setShowUploadMessage] = useState(false);
  // const [uploadData, setUploadData] = useState({});
  const sourceRef = useRef();
  const recorderRef = useRef();
  const recordedChunksRef = useRef();

  const introModalRef = useRef();
  const videoOneRef = useRef();
  const loadingVideoRef = useRef();
  const loadingAudioRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const record = () => {
    sourceRef.current = '';
    recordedChunksRef.current = [];
    const destination =
      ctx.AL.currentCtx.audioCtx.createMediaStreamDestination();
    const gain = ctx.AL.currentCtx.gain;
    gain.connect(destination);
    const _recorder = new MediaRecorder(destination.stream);

    _recorder.ondataavailable = handleAvailableData;
    _recorder.onstop = handleData;
    _recorder.start();
    recorderRef.current = _recorder;
  };

  const handleAvailableData = (event) => {
    if (event.data) {
      recordedChunksRef.current.push(event.data);
    }
  };

  const handleData = async () => {
    const blob = new Blob(recordedChunksRef.current);
    const url = URL.createObjectURL(blob);
    sourceRef.current = url;
  };

  const stop = () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
      setShowUploadMessage(true);
    }
  };

  const go = () => {
    dispatch(setAudioURL(sourceRef.current));
    router.push('/editor');
  };

  const stay = async () => {
    setShowUploadMessage(false);
    setUploadMessage(initialMessage);
  };

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => setPlayerIP(data.ip));
  }, []);

  useEffect(() => {
    if (playerIP) {
      listenForRecordOn(record, playerIP);
      listenForRecordOff(stop, playerIP);
    }
  }, [playerIP]);

  return (
    <div>
      {showUploadMessage && (
        <div className="alert-upload-modal">
          <p>{uploadMessage}</p>
          <div>
            <button onClick={go}>go</button>
            <button onClick={stay}>stay</button>
          </div>
        </div>
      )}
      {!started && (
        <div id="loading-modal">
          <p>LOADING</p>
        </div>
      )}

      {<HTMLPlayer setCtx={setCtx} setStarted={setStarted} />}
      {sourceRef.current && (
        <audio
          className="recorded-audio-modal"
          src={sourceRef.current}
          controls
        ></audio>
      )}
    </div>
  );
};

export default Game;
