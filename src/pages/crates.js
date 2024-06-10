/* previously in Crates/index.js */

import React, { useState } from 'react';
import Grid from '@/components/Crates/Grid';
import Player3D from '@/components/Crates/Player3D';

export default function Crates() {
  const [grid, setGrid] = useState(true);
  const view = grid ? '3D' : 'GRID';
  const toggle = () => {
    setGrid(!grid);
  };

  return (
    <div>
      <button className="toggle-switch" onClick={toggle}>
        {view}
      </button>
      {grid && <Grid />}
      {!grid && <Player3D />}
    </div>
  );
}
