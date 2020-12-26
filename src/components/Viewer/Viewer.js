import React from 'react';
import { useOpenSeadragon, OpenSeadragon, Overlay } from 'use-open-seadragon';
import { Box } from '@chakra-ui/react';
import { fabric, initFabricJSOverlay } from 'openseadragon-fabricjs-overlay';
import { useFabricOverlayDispatch } from 'context/fabric-overlay-context';

const tile = {
  type: 'image',
  url:
    'https://tile.loc.gov/image-services/iiif/service:pnp:fsa:8c34000:8c34000:8c34058v/full/pct:100/0/default.jpg',
};

const osdOptions = {
  debugMode: true,
  showNavigationControl: true,
};

export default function Viewer() {
  const dispatch = useFabricOverlayDispatch();

  // Add Fabric support to OSD via the plugin "OpenseadragonFabricjsOverlay"
  initFabricJSOverlay(OpenSeadragon, fabric);

  // Initialize our OpenSeadragon instance
  const [ref, { viewer }] = useOpenSeadragon(tile, osdOptions);

  React.useEffect(() => {
    if (!viewer) return;

    // Create the fabric.js overlay, and set it on a sharable context
    dispatch({
      type: 'updateOverlay',
      fabricOverlay: viewer.fabricjsOverlay({ scale: 1 }),
      viewer: viewer,
    });
  }, [dispatch, viewer]);

  return (
    <Box ref={ref} w="100%" h="600px" bgColor="antiquewhite">
      <Overlay x={0.5} y={0.5}>
        <div style={{ background: '#fff' }}>
          <p>
            I'm a Overlay component where React components can live on the
            canvas
          </p>
        </div>
      </Overlay>
      <Overlay x={0.2} y={0.8}>
        <div style={{ background: '#fff' }}>
          <p>I'm another overlay</p>
        </div>
      </Overlay>
    </Box>
  );
}
