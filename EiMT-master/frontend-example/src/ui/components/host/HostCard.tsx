import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import {
  alpha,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import type { Host } from '../../../types/host';

interface HostCardProps {
  host: Host;
  countryName?: string;
  onEdit?: (host: Host) => void;
  onDelete?: (host: Host) => void;
}

const HostCard = ({ host, countryName, onEdit, onDelete }: HostCardProps) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);
  const detailPath = `/hosts/${host.id}`;
  const fullName = `${host.name} ${host.surname}`.trim();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => setMenuAnchor(null);

  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: 'box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
        '&:hover': {
          borderColor: (t) => alpha(t.palette.primary.main, 0.55),
          boxShadow: (t) => `0 22px 55px ${alpha(t.palette.primary.dark, 0.2)}`,
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardMedia
        component={RouterLink}
        to={detailPath}
        sx={{
          height: 170,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          position: 'relative',
          background: (t) =>
            `linear-gradient(155deg, ${alpha(t.palette.secondary.light, 0.92)} 0%, ${alpha(t.palette.primary.main, 0.92)} 55%, ${alpha(t.palette.primary.dark, 0.75)} 100%)`,
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: (t) =>
              `radial-gradient(circle at 25% 25%, ${alpha(t.palette.common.white, 0.2)} 0%, transparent 46%),
               radial-gradient(circle at 78% 44%, ${alpha(t.palette.common.white, 0.12)} 0%, transparent 52%)`,
            pointerEvents: 'none',
          },
          '&:focus-visible': { outline: '2px solid', outlineColor: 'secondary.light', outlineOffset: 2 },
        }}
        aria-label={`View profile for ${fullName}`}
      >
        <Stack spacing={0.75} sx={{ alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <PersonRoundedIcon sx={{ fontSize: 52, color: alpha('#fff', 0.95) }} aria-hidden />
          <Typography variant='subtitle2' sx={{ color: alpha('#fff', 0.9), letterSpacing: '0.1em' }}>
            HOST
          </Typography>
        </Stack>
      </CardMedia>

      <CardContent sx={{ flex: '1 1 auto', pt: 2.25, pb: 1.25, px: 2.25 }}>
        <Stack direction='row' spacing={1} sx={{ mb: 1.25, justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography
            component='h3'
            variant='h6'
            sx={{
              fontWeight: 600,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textAlign: 'left',
            }}
          >
            {fullName}
          </Typography>
          {(onEdit || onDelete) && (
            <IconButton
              size='small'
              aria-label='More actions'
              aria-controls={menuOpen ? 'host-card-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={menuOpen ? 'true' : undefined}
              onClick={handleMenuOpen}
              sx={{ mt: -0.5, color: 'text.secondary' }}
            >
              <MoreVertRoundedIcon fontSize='small' />
            </IconButton>
          )}
        </Stack>

        <Stack direction='row' spacing={0.75} sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
          <Chip
            size='small'
            icon={<PublicRoundedIcon sx={{ '&&': { fontSize: 16 } }} />}
            label={countryName ?? 'Country'}
            variant='outlined'
            sx={{ fontWeight: 500, borderColor: 'divider' }}
          />
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 2.25, pt: 0, mt: 'auto' }}>
        <Button
          component={RouterLink}
          to={detailPath}
          variant='contained'
          color='primary'
          fullWidth
          size='large'
          sx={{ borderRadius: 2 }}
        >
          View host profile
        </Button>
      </CardActions>

      <Menu
        id='host-card-menu'
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ list: { dense: true } }}
      >
        {onEdit && (
          <MenuItem onClick={() => { handleMenuClose(); onEdit(host); }}>
            <ListItemIcon><EditRoundedIcon fontSize='small' /></ListItemIcon>
            <ListItemText primary='Edit host' />
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem onClick={() => { handleMenuClose(); onDelete(host); }} sx={{ color: 'error.main' }}>
            <ListItemIcon><DeleteOutlineRoundedIcon fontSize='small' color='error' /></ListItemIcon>
            <ListItemText primary='Remove' />
          </MenuItem>
        )}
      </Menu>
    </Card>
  );
};

export default HostCard;
