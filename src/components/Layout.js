import React from 'react';
import { Box, VStack, Grid } from '@chakra-ui/react';
import { ColorModeSwitcher } from 'ColorModeSwitcher';
import logo from 'images/logo.png';
import LayoutFooter from 'components/Layout/Footer';

export default function Layout({ children }) {
  return (
    <Box>
      <Grid>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <React.Fragment>
            <img src={logo} alt="logo" style={{ width: '200px' }} />
            {children}
            <LayoutFooter />
          </React.Fragment>
        </VStack>
      </Grid>
    </Box>
  );
}