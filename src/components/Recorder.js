import React, { useState, useEffect } from 'react';
import { listenForRecordOn, listenForRecordOff } from '../lib/db';

const Recorder = ({ setSource, setShowUploadMessage, ctx, playerIP }) => {
  const [recorder, setRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const record = () => {
    const destination =
      ctx.AL.currentCtx.audioCtx.createMediaStreamDestination();
    const gain = ctx.AL.currentCtx.gain;
    gain.connect(destination);
    setSource('');
    setRecordedChunks([]);

    const _recorder = new MediaRecorder(destination.stream);

    _recorder.ondataavailable = handleAvailableData;
    _recorder.onstop = handleData;
    _recorder.start();
    setRecorder(_recorder);
  };

  const handleAvailableData = (event) => {
    if (event.data) {
      recordedChunks.push(event.data);
    }
  };

  const handleData = async () => {
    const blob = new Blob(recordedChunks);
    const url = URL.createObjectURL(blob);
    setSource(url);
  };

  const stop = () => {
    console.log(recorder);
    recorder.stop();
    setShowUploadMessage(true);
  };

  useEffect(() => {
    if (playerIP) {
      listenForRecordOn(record, playerIP);
      listenForRecordOff(stop, playerIP);
    }
  }, [playerIP]);

  return <></>;
};

export default Recorder;
