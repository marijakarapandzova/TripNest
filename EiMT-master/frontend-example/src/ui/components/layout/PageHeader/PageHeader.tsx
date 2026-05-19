import { alpha, Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  id?: string;
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  actions?: ReactNode;
}

const PageHeader = ({ id, title, subtitle, meta, actions }: PageHeaderProps) => {
  return (
    <Box
      sx={{
        p: { xs: 2.5, sm: 3.5 },
        borderRadius: 4,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: (t) =>
            `linear-gradient(90deg, ${alpha(t.palette.primary.main, 0.12)} 0%, transparent 22%),
             radial-gradient(circle at 90% 25%, ${alpha(t.palette.secondary.main, 0.16)} 0%, transparent 46%),
             linear-gradient(120deg, ${alpha(t.palette.primary.light, 0.10)} 0%, rgba(255,255,255,0) 70%)`,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 16,
          top: 16,
          bottom: 16,
          width: 6,
          borderRadius: 999,
          background: (t) =>
            `linear-gradient(180deg, ${t.palette.primary.main} 0%, ${alpha(t.palette.primary.main, 0.35)} 100%)`,
          opacity: 0.9,
        },
      }}
    >
      <Stack spacing={1.25} sx={{ position: 'relative', zIndex: 1, pl: { xs: 1.5, sm: 2 } }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography id={id} variant='h4' component='h1' sx={{ mb: 0.5, textAlign: 'left' }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant='body1' color='text.secondary' sx={{ textAlign: 'left', maxWidth: 680 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {actions ? <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>{actions}</Box> : null}
        </Stack>

        {meta ? <Box>{meta}</Box> : null}
      </Stack>
    </Box>
  );
};

export default PageHeader;

