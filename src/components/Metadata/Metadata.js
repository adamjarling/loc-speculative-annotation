import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  IconButton,
  Link,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { locImages } from 'services/loc-images';

function MetadataHeading({ children }) {
  return (
    <Heading as="h2" size="md" pt={3}>
      {children}
    </Heading>
  );
}

function MetadataBody({ children }) {
  return <Box mb={3}>{children}</Box>;
}

function Metadata() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const params = useParams();
  const [currentWork, setCurrentWork] = React.useState();
  const iconButtonSize = useBreakpointValue({ base: 'md', md: 'lg' });

  const handleClose = () => {
    onClose();
  };

  const handleToolbarClick = () => {
    // Drawer not yet opened
    if (!isOpen) {
      const work = locImages.find(i => i.id === params.id);
      setCurrentWork(work);
      onOpen();
    } else {
      onClose();
    }
  };

  return (
    <>
      <Tooltip
        label="Info"
        aria-label="Info"
        placement="right-end"
        openDelay={500}
      >
        <IconButton
          icon={<FaInfoCircle />}
          onClick={handleToolbarClick}
          size={iconButtonSize}
          fontSize={['2xl', '3xl']}
          variant="ghost"
        />
      </Tooltip>

      <Drawer isOpen={isOpen} placement="right" onClose={handleClose}>
        <DrawerOverlay>
          {currentWork && (
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>{currentWork.title}</DrawerHeader>

              <DrawerBody>
                <MetadataBody>{currentWork.info}</MetadataBody>

                <MetadataHeading>Creator</MetadataHeading>
                <MetadataBody>{currentWork.creator}</MetadataBody>

                <MetadataHeading>Date</MetadataHeading>
                <MetadataBody>{currentWork.date}</MetadataBody>

                <MetadataHeading>Questions</MetadataHeading>
                <MetadataBody>
                  <Wrap>
                    {currentWork.questions.map((question, i) => (
                      <WrapItem key={i}>{question}</WrapItem>
                    ))}
                  </Wrap>
                </MetadataBody>

                <MetadataHeading>Contact</MetadataHeading>
                <MetadataBody>
                  <Link href={currentWork.contact} isExternal>
                    {currentWork.contact} <ExternalLinkIcon mx="2px" />
                  </Link>
                </MetadataBody>

                <MetadataBody>
                  <Link href={currentWork.seeCollection} isExternal>
                    View Collection <ExternalLinkIcon mx="2px" />
                  </Link>
                </MetadataBody>

                <MetadataBody>
                  <Link href={currentWork.seeImage} isExternal>
                    View Image <ExternalLinkIcon mx="2px" />
                  </Link>
                </MetadataBody>
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
              </DrawerFooter>
            </DrawerContent>
          )}
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default Metadata;