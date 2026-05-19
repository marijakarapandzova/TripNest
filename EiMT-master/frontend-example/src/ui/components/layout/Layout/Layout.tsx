import { alpha, Box, Container } from '@mui/material';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
        backgroundImage: (t) =>
          `radial-gradient(circle at 8% 18%, ${alpha(t.palette.primary.main, 0.18)} 0%, transparent 35%),
           radial-gradient(circle at 92% 12%, ${alpha(t.palette.secondary.main, 0.14)} 0%, transparent 34%),
           linear-gradient(180deg, ${t.palette.background.default} 0%, #fff 60%, #f6efe6 100%),
           linear-gradient(${alpha('#000', 0.04)} 1px, transparent 1px),
           linear-gradient(90deg, ${alpha('#000', 0.04)} 1px, transparent 1px)`,
        backgroundSize: 'auto, auto, auto, 44px 44px, 44px 44px',
      }}
    >
      <Header />
      <Box
        component='main'
        className='app-main'
        sx={{
          flex: '1 1 auto',
          width: '100%',
          py: { xs: 3, sm: 4 },
        }}
      >
        <Container maxWidth='lg' sx={{ px: { xs: 2, sm: 3 }, position: 'relative', zIndex: 1 }}>
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
