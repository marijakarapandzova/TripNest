import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../../../hooks/useAuth';

const publicNavItems = [
  { label: 'Home', to: '/', icon: <HomeRoundedIcon fontSize='small' /> },
  { label: 'Stays', to: '/accommodations', icon: <TravelExploreRoundedIcon fontSize='small' /> },
  { label: 'Hosts', to: '/hosts', icon: <PersonRoundedIcon fontSize='small' /> },
  { label: 'Countries', to: '/countries', icon: <PublicRoundedIcon fontSize='small' /> },
];

const authenticatedNavItems = [
  ...publicNavItems,
  { label: 'Reservations', to: '/reservations', icon: <BookmarkRoundedIcon fontSize='small' /> },
];

const Header = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();

  const handleDrawerToggle = () => setMobileOpen((open) => !open);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'left', pt: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pb: 1 }}>
        <Typography variant='h6' component='span' sx={{ fontWeight: 700, color: 'primary.main' }}>
          TripNest
        </Typography>
        <IconButton aria-label='close menu'>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ px: 1, py: 1 }}>
        {(isLoggedIn ? authenticatedNavItems : publicNavItems).map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.to}
              selected={isActive(item.to)}
              sx={{
                borderRadius: 1.25,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: (t) => t.palette.action.selected,
                  color: 'primary.main',
                  '&:hover': { bgcolor: (t) => t.palette.action.selected },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        {isLoggedIn ? (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} sx={{ borderRadius: 1.25 }}>
              <ListItemIcon sx={{ minWidth: 30 }}><LogoutRoundedIcon fontSize='small' /></ListItemIcon>
              <ListItemText primary='Sign out' slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
            </ListItemButton>
          </ListItem>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to='/login' sx={{ borderRadius: 1.25, mb: 0.5 }}>
                <ListItemText primary='Sign in' slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to='/register' sx={{ borderRadius: 1.25 }}>
                <ListItemText primary='Register' slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      position='sticky'
      color='default'
      elevation={0}
      sx={{
        borderBottom: 0,
        bgcolor: (t) => alpha(t.palette.background.paper, 0.7),
        boxShadow: 'none',
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar disableGutters sx={{ minHeight: { xs: 66, sm: 78 }, gap: 2, py: 1 }}>
          <Box
            component={RouterLink}
            to='/'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'text.primary',
              textDecoration: 'none',
              mr: 'auto',
            }}
          >
            <Paper
              elevation={0}
              sx={{
                width: 42,
                height: 42,
                borderRadius: 999,
                display: 'grid',
                placeItems: 'center',
                bgcolor: (t) => alpha(t.palette.primary.main, 0.14),
                color: 'primary.main',
                border: 1,
                borderColor: (t) => alpha(t.palette.primary.main, 0.22),
              }}
            >
              <TravelExploreRoundedIcon sx={{ fontSize: 24 }} />
            </Paper>
            <Typography variant='h6' component='span' sx={{ fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05 }}>
              TripNest
            </Typography>
          </Box>

          {isMdUp ? (
            <Paper
              elevation={0}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1,
                py: 0.75,
                borderRadius: 999,
                border: 1,
                borderColor: 'divider',
                bgcolor: (t) => alpha(t.palette.background.paper, 0.75),
              }}
            >
              {(isLoggedIn ? authenticatedNavItems : publicNavItems).map((item) => (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  variant={isActive(item.to) ? 'contained' : 'text'}
                  color={isActive(item.to) ? 'primary' : 'inherit'}
                  sx={{
                    px: 2,
                    minHeight: 38,
                    ...(isActive(item.to)
                      ? {}
                      : { color: 'text.secondary', '&:hover': { color: 'text.primary', bgcolor: 'transparent' } }),
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Divider flexItem orientation='vertical' sx={{ mx: 0.5, borderColor: (t) => alpha(t.palette.divider, 0.7) }} />
              {isLoggedIn ? (
                <>
                  <Typography variant='body2' color='text.secondary' sx={{ px: 1, fontWeight: 500 }}>
                    {user?.username}
                  </Typography>
                  <Button
                    variant='outlined'
                    color='inherit'
                    onClick={handleLogout}
                    startIcon={<LogoutRoundedIcon />}
                    sx={{ px: 2, minHeight: 38, color: 'text.secondary' }}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    component={RouterLink}
                    to='/login'
                    variant='text'
                    color='inherit'
                    sx={{ px: 2, minHeight: 38, color: 'text.secondary', '&:hover': { color: 'text.primary', bgcolor: 'transparent' } }}
                  >
                    Sign in
                  </Button>
                  <Button
                    component={RouterLink}
                    to='/register'
                    variant='contained'
                    color='secondary'
                    sx={{ px: 2.5, minHeight: 38 }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Paper>
          ) : (
            <IconButton color='inherit' aria-label='open menu' edge='end' onClick={handleDrawerToggle}>
              <MenuRoundedIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
      <Drawer
        variant='temporary'
        anchor='right'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
