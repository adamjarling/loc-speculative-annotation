import React from 'react';
import PropTypes from 'prop-types';
import { Stack, useBreakpointValue } from '@chakra-ui/react';
import ToolbarBorderBox from 'components/Toolbar/BorderBox';
import ToolbarBorderBoxInner from 'components/Toolbar/BorderBoxInner';
import {
  useToolbarOptionsDispatch,
  useToolbarOptionsState,
} from 'context/toolbar-options-context';
import { brushWidths } from 'context/toolbar-options-context';

function AdjustmentBarWidthPicker({ buttonSize }) {
  const { brushWidth, color } = useToolbarOptionsState();
  const dispatch = useToolbarOptionsDispatch();
  const stackSpacing = useBreakpointValue({ sm: '5px', md: '10px' });

  return (
    <Stack direction="row" spacing={stackSpacing} px={1}>
      {brushWidths.map(widthObj => {
        return (
          <ToolbarBorderBox
            key={widthObj.size}
            isActive={brushWidth && widthObj.size === brushWidth.size}
            w={buttonSize?.width}
            h={buttonSize?.height}
          >
            <ToolbarBorderBoxInner
              onClick={() =>
                dispatch({ type: 'updateBrushWidth', brushWidth: widthObj })
              }
            >
              <widthObj.IconSVG fill={color.hex} height="100%" width="100%" />
            </ToolbarBorderBoxInner>
          </ToolbarBorderBox>
        );
      })}
    </Stack>
  );
}

AdjustmentBarWidthPicker.propTypes = {
  buttonSize: PropTypes.object,
};

export default AdjustmentBarWidthPicker;