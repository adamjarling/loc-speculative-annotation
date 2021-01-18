import React from 'react';
import { Checkbox, Stack, Text } from '@chakra-ui/react';

export default function ShowHideAnnotations() {
  return (
    <Stack spacing={5} direction="row" ml={6}>
      <Checkbox>
        <Text fontSize="sm">Your Annotations</Text>
      </Checkbox>
      <Checkbox defaultIsChecked>
        <Text fontSize="sm">Curators Annotations</Text>
      </Checkbox>
    </Stack>
  );
}