import React from 'react';
import { Button } from '@chakra-ui/react';
import { useFabricOverlayState } from 'context/fabric-overlay-context';
import { DeleteIcon } from '@chakra-ui/icons';
import ToolbarButton from 'components/Toolbar/Button';

export default function RemoveObject() {
  const { fabricOverlay } = useFabricOverlayState();
  const [isActiveObject, setIsActiveObject] = React.useState();

  React.useEffect(() => {
    if (!fabricOverlay) return;

    function handleSelectionCleared(e) {
      setIsActiveObject(false);
    }
    function handleSelectionCreated(e) {
      setIsActiveObject(true);
    }

    const canvas = fabricOverlay.fabricCanvas();
    canvas.on('selection:created', handleSelectionCreated);
    canvas.on('selection:cleared', handleSelectionCleared);

    return () => {
      canvas.off('selection:created', handleSelectionCreated);
      canvas.off('selection:cleared', handleSelectionCleared);
    };
  }, [fabricOverlay]);

  const handleRemoveObject = () => {
    const activeObject = fabricOverlay.fabricCanvas().getActiveObject();
    fabricOverlay.fabricCanvas().remove(activeObject);
  };

  return (
    <ToolbarButton
      onClick={handleRemoveObject}
      icon={<DeleteIcon />}
      label="Remove item"
      disabled={!isActiveObject}
    />
  );
}
