import type { ReactNode } from 'react';
import { alpha, Paper, type PaperProps } from '@mui/material';

export interface SurfaceProps extends Omit<PaperProps, 'elevation'> {
  children: ReactNode;
}

const Surface = ({ children, sx, ...rest }: SurfaceProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: 4,
        border: 1,
        borderColor: (t) => alpha(t.palette.divider, 0.9),
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'hidden',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Paper>
  );
};

export default Surface;

