import type { ReactNode } from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';

interface SectionProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

const Section = ({ children, sx }: SectionProps) => {
  return (
    <Box
      component='section'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2.5, md: 3 },
        py: { xs: 1, md: 1.5 },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Section;

