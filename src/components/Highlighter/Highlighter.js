import React from 'react';
import { BiHighlight } from 'react-icons/bi';
import {
  useFabricOverlayDispatch,
  useFabricOverlayState,
} from 'context/fabric-overlay-context';
import ToolbarButton from 'components/Toolbar/Button';
import useHexRGB from 'hooks/use-hex-rgb';
import useFabricHelpers from 'hooks/use-fabric-helpers';
import { useBreakpointValue } from '@chakra-ui/react';

function Highlighter({ isActive }) {
  const { color, fabricOverlay, viewer } = useFabricOverlayState();
  const dispatch = useFabricOverlayDispatch();
  const { hexToRGBA } = useHexRGB();
  const { setDefaultCursor } = useFabricHelpers();
  const brushWidth = useBreakpointValue({ base: 40, md: 60, lg: 100 });

  const [myState, _setMyState] = React.useState({
    isActive,
  });
  const myStateRef = React.useRef(myState);
  const setMyState = data => {
    myStateRef.current = data;
    _setMyState(data);
  };

  React.useEffect(() => {
    setMyState({ isActive });
    if (isActive) {
      setDefaultCursor('crosshair');
    }
  }, [isActive]);

  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    function handleMouseDown() {
      if (!myStateRef.current.isActive) return;
      // Need this as double protection to make sure OSD isn't swallowing
      // Fabric's drawing mode for some reason
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);
    }
    canvas.on('mouse:down', handleMouseDown);

    return () => {
      canvas.off('mouse:down', handleMouseDown);
    };
  }, [fabricOverlay]);

  React.useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    if (isActive) {
      // Enable Fabric drawing; disable OSD mouseclicks
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = hexToRGBA(color.hex, 0.5);
      canvas.freeDrawingBrush.width = brushWidth;

      canvas.renderAll();

      // EXAMPLE: of using an image for cursor
      // https://i.stack.imgur.com/fp7eL.png
      //canvas.freeDrawingCursor = `url(${logo}) 0 50, auto`;
    } else {
      // Disable Fabric drawing; enable OSD mouseclicks
      viewer.setMouseNavEnabled(true);
      viewer.outerTracker.setTracking(true);
      canvas.isDrawingMode = false;
    }
  }, [isActive]);

  React.useEffect(() => {
    // Update brush color and size with Fabric
    if (!fabricOverlay || !isActive) return;

    const canvas = fabricOverlay.fabricCanvas();

    canvas.freeDrawingBrush.color = hexToRGBA(color.hex, 0.5);
    canvas.freeDrawingBrush.width = brushWidth;
  }, [color]);

  const handleToolbarClick = () => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'HIGHLIGHTER' });
  };

  return (
    <>
      <ToolbarButton
        onClick={handleToolbarClick}
        icon={<BiHighlight />}
        isActive={isActive}
        label="Highlighter"
      />
    </>
  );
}

export default Highlighter;
