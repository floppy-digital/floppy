import React, { useEffect } from 'react';

const HTMLPlayer = ({ setCtx, setStarted }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'game/DrumSequencer-HTML5-Shipping.UE4.js';
    script.async = true;
    script.onload = () => {
      Module.onGameReadyFn = () => {
        setStarted(true);
      };
      setCtx(Module);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="game-wrapper">
      <div className="wrapper" id="mainarea">
        <div
          className="alert alert-warning centered-axis-xy"
          style={{ minHeight: 20 + 'px', display: 'none' }}
          role="alert"
          id="compilingmessage"
        >
          <div id="loadTasks"></div>
        </div>

        <canvas
          tabIndex="0"
          id="canvas"
          className="emscripten"
          onContextMenu={(event) => event.preventDefault()}
          style={{ display: 'none' }}
        />
      </div>
      <div
        className="buttonarea text-center"
        id="buttonarea"
        style={{ display: 'none' }}
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            try {
              Module['pauseMainLoop']();
            } catch (e) {
              console.error(e);
            }
          }}
          title="Pause"
        >
          <span className="glyphicon glyphicon-pause" aria-hidden="true"></span>
          <span className="buttontext"> Pause</span>
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            try {
              Module['resumeMainLoop']();
            } catch (e) {
              console.error(e);
            }
          }}
          title="Resume"
        >
          <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
          <span className="buttontext"> Resume</span>
        </button>

        <button
          type="button"
          className="btn btn-primary"
          id="clear_indexeddb"
          onClick={() => {
            try {
              deleteIndexedDBStorage();
            } catch (e) {
              console.error(e);
            }
          }}
          title="Clear IndexedDB"
        >
          <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
          <span className="buttontext"> Clear IndexedDB</span>
        </button>
        <button
          type="button"
          className="btn btn-primary"
          id="fullscreen_request"
          title="Fullscreen"
        >
          <span
            className="glyphicon glyphicon-fullscreen"
            aria-hidden="true"
          ></span>
          <span className="buttontext"> Fullscreen</span>
        </button>
      </div>
      <div
        className="texthalf text-normal jumbotron "
        id="logwindow"
        style={{ display: 'none' }}
      ></div>
    </div>
  );
};

export default HTMLPlayer;
