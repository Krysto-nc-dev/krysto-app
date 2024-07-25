import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function Ship({text, sx}) {
  return (
    
    <Chip label={text} sx={sx} />
  
  
  );
}