import React from 'react';
import PropTypes from 'prop-types';
import { BiPointer } from 'react-icons/bi';
import ToolbarButton from 'components/Toolbar/Button';
import { useFabricOverlayDispatch } from 'context/fabric-overlay-context';

function ToolbarPointer({ isActive }) {
  const dispatch = useFabricOverlayDispatch();

  const handleToolbarClick = () => {
    dispatch({ type: 'updateTool', tool: isActive ? '' : 'POINTER' });
  };

  return (
    <ToolbarButton
      onClick={handleToolbarClick}
      icon={<BiPointer />}
      isActive={isActive}
      label="Select"
    />
  );
}

ToolbarPointer.propTypes = {
  isActive: PropTypes.bool,
};

export default ToolbarPointer;
