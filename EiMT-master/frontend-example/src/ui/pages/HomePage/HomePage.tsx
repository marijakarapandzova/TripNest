import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import NightShelterRoundedIcon from '@mui/icons-material/NightShelterRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import { alpha, Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import Section from '../../components/layout/Section/Section';
import Surface from '../../components/layout/Surface/Surface';
//
// const HomePage = () => {
//   return (
//     <Section>
//       <Surface
//         sx={{
//           p: { xs: 3.5, md: 6 },
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             inset: 0,
//             background: (t) =>
//               `radial-gradient(circle at 18% 22%, ${alpha(t.palette.primary.main, 0.18)} 0%, transparent 42%),
//                radial-gradient(circle at 88% 14%, ${alpha(t.palette.secondary.main, 0.18)} 0%, transparent 42%),
//                linear-gradient(135deg, ${alpha(t.palette.primary.light, 0.12)} 0%, rgba(255,255,255,0) 55%)`,
//             pointerEvents: 'none',
//           },
//         }}
//       >
//         <Box sx={{ position: 'relative', zIndex: 1 }}>
//           <Chip
//             icon={<VerifiedRoundedIcon />}
//             label='Verified listings'
//             color='primary'
//             variant='outlined'
//             sx={{ mb: 2 }}
//           />
//           <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' }, gap: { xs: 3, md: 4 } }}>
//             <Box>
//               <Typography variant='h2' sx={{ fontSize: { xs: '2rem', sm: '2.6rem', md: '3.2rem' }, mb: 1.5 }}>
//                 Plan your next trip with less scrolling.
//               </Typography>
//               <Typography variant='body1' color='text.secondary' sx={{ maxWidth: 680, mb: 3.5 }}>
//                 Welcome to TripNest — a simple demo app for browsing accommodations, hosts, and countries with clear availability.
//               </Typography>
//               <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
//                 <Button
//                   component={RouterLink}
//                   to='/accommodations'
//                   variant='contained'
//                   color='primary'
//                   startIcon={<SearchRoundedIcon />}
//                 >
//                   Browse accommodations
//                 </Button>
//                 <Button component={RouterLink} to='/accommodations' variant='outlined' endIcon={<ArrowForwardRoundedIcon />}>
//                   See all listings
//                 </Button>
//               </Stack>
//             </Box>
//             <Box
//               sx={{
//                 borderRadius: 4,
//                 border: 1,
//                 borderColor: 'divider',
//                 bgcolor: (t) => alpha(t.palette.background.default, 0.55),
//                 p: 2.5,
//               }}
//             >
//               <Typography variant='subtitle2' color='text.secondary' sx={{ mb: 1 }}>
//                 What you can do
//               </Typography>
//               <Stack spacing={1.25}>
//                 <Stack direction='row' spacing={1.25}>
//                   <NightShelterRoundedIcon color='primary' fontSize='small' />
//                   <Box>
//                     <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }}>Check inventory fast</Typography>
//                     <Typography variant='body2' color='text.secondary'>See what is currently available.</Typography>
//                   </Box>
//                 </Stack>
//                 <Stack direction='row' spacing={1.25}>
//                   <FavoriteRoundedIcon color='primary' fontSize='small' />
//                   <Box>
//                     <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }}>Open listing details</Typography>
//                     <Typography variant='body2' color='text.secondary'>Availability, category, and host info.</Typography>
//                   </Box>
//                 </Stack>
//                 <Stack direction='row' spacing={1.25}>
//                   <SupportAgentRoundedIcon color='primary' fontSize='small' />
//                   <Box>
//                     <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }}>Explore people & places</Typography>
//                     <Typography variant='body2' color='text.secondary'>Hosts and country profiles included.</Typography>
//                   </Box>
//                 </Stack>
//               </Stack>
//             </Box>
//           </Box>
//         </Box>
//       </Surface>
//
//       <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
//         <Surface sx={{ p: 3 }}>
//           <Typography variant='h6' sx={{ mb: 0.5 }}>
//             Availability at a glance
//           </Typography>
//           <Typography variant='body2' color='text.secondary'>
//             Status chips make it easy to spot rented vs. available stays.
//           </Typography>
//         </Surface>
//         <Surface sx={{ p: 3 }}>
//           <Typography variant='h6' sx={{ mb: 0.5 }}>
//             Clean, comparable listings
//           </Typography>
//           <Typography variant='body2' color='text.secondary'>
//             Cards highlight the details you actually use to decide quickly.
//           </Typography>
//         </Surface>
//         <Surface sx={{ p: 3 }}>
//           <Typography variant='h6' sx={{ mb: 0.5 }}>
//             Smooth navigation
//           </Typography>
//           <Typography variant='body2' color='text.secondary'>
//             A minimal layout keeps browsing quick across devices.
//           </Typography>
//         </Surface>
//       </Box>
//
//       <Surface sx={{ p: { xs: 3, md: 4 } }}>
//         <Typography variant='h5' sx={{ mb: 1.5 }}>
//           Why TripNest feels simple
//         </Typography>
//         <Typography variant='body1' color='text.secondary' sx={{ mb: 4, maxWidth: 760 }}>
//           Whether it is a quick weekend getaway or a longer plan, TripNest helps you compare options and move forward
//           with less friction.
//         </Typography>
//         <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
//           <Stack direction='row' spacing={1.5} sx={{ alignItems: 'flex-start' }}>
//             <NightShelterRoundedIcon color='primary' />
//             <Box>
//               <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
//                 Real-time inventory
//               </Typography>
//               <Typography variant='body2' color='text.secondary'>
//                 No guessing — you immediately see what is available right now.
//               </Typography>
//             </Box>
//           </Stack>
//           <Stack direction='row' spacing={1.5} sx={{ alignItems: 'flex-start' }}>
//             <FavoriteRoundedIcon color='primary' />
//             <Box>
//               <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
//                 Focused browsing flow
//               </Typography>
//               <Typography variant='body2' color='text.secondary'>
//                 A clean UI keeps decisions simple and helps you move faster.
//               </Typography>
//             </Box>
//           </Stack>
//           <Stack direction='row' spacing={1.5} sx={{ alignItems: 'flex-start' }}>
//             <SupportAgentRoundedIcon color='primary' />
//             <Box>
//               <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
//                 Helpful context
//               </Typography>
//               <Typography variant='body2' color='text.secondary'>
//                 Jump between accommodation, host, and country details.
//               </Typography>
//             </Box>
//           </Stack>
//         </Box>
//       </Surface>
//
//       <Surface sx={{ p: { xs: 3, md: 4 } }}>
//         <Typography variant='h5' sx={{ mb: 1.5 }}>
//           How TripNest works
//         </Typography>
//         <Typography variant='body1' color='text.secondary' sx={{ mb: 4, maxWidth: 760 }}>
//           Three simple steps to go from browsing to booking, without the usual decision fatigue.
//         </Typography>
//         <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
//           <Surface sx={{ p: 2.75, bgcolor: 'background.default' }}>
//             <Stack direction='row' spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
//               <SearchRoundedIcon color='primary' fontSize='small' />
//               <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
//                 1. Browse smarter
//               </Typography>
//             </Stack>
//             <Typography variant='body2' color='text.secondary'>
//               Start with listings that match your schedule and quickly spot low-inventory options.
//             </Typography>
//           </Surface>
//           <Surface sx={{ p: 2.75, bgcolor: 'background.default' }}>
//             <Stack direction='row' spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
//               <CheckCircleRoundedIcon color='primary' fontSize='small' />
//               <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
//                 2. Compare confidently
//               </Typography>
//             </Stack>
//             <Typography variant='body2' color='text.secondary'>
//               Use clear card details to compare availability, quality, and booking readiness side by side.
//             </Typography>
//           </Surface>
//           <Surface sx={{ p: 2.75, bgcolor: 'background.default' }}>
//             <Stack direction='row' spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
//               <FlightTakeoffRoundedIcon color='primary' fontSize='small' />
//               <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
//                 3. Book and go
//               </Typography>
//             </Stack>
//             <Typography variant='body2' color='text.secondary'>
//               Open your preferred stay, review details, and move forward with a clear next step.
//             </Typography>
//           </Surface>
//         </Box>
//       </Surface>
//
//       <Surface
//         sx={{
//           p: { xs: 3, md: 4 },
//           bgcolor: (t) => alpha(t.palette.secondary.main, 0.06),
//         }}
//       >
//         <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ justifyContent: 'space-between' }}>
//           <Box sx={{ maxWidth: 640 }}>
//             <Stack direction='row' spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
//               <TipsAndUpdatesRoundedIcon color='primary' fontSize='small' />
//               <Typography variant='subtitle2' color='primary.main'>
//                 Friendly tip
//               </Typography>
//             </Stack>
//             <Typography variant='h6' sx={{ mb: 1 }}>
//               Start with the stays page and filter by availability first.
//             </Typography>
//             <Typography variant='body1' color='text.secondary'>
//               It is the quickest way to narrow your options and focus only on places you can book today.
//             </Typography>
//           </Box>
//           <Stack direction={{ xs: 'column', sm: 'row', md: 'column' }} spacing={1.5}>
//             <Button component={RouterLink} to='/accommodations' variant='contained' color='primary'>
//               Start exploring
//             </Button>
//             <Button component={RouterLink} to='/accommodations' variant='text' endIcon={<ArrowForwardRoundedIcon />}>
//               Continue browsing
//             </Button>
//           </Stack>
//         </Stack>
//       </Surface>
//     </Section>
//   );
// };
//
// export default HomePage;

// ONLY styles updated — functionality untouched

const cardHover = {
  transition: 'all 0.25s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 6,
  },
};

const HomePage = () => {
  return (
      <Section>
        <Surface
            sx={{
              p: { xs: 4, md: 7 },
              borderRadius: 4,
              position: 'relative',
              overflow: 'hidden',
              background: (t) =>
                  `linear-gradient(135deg, ${alpha(t.palette.primary.main, 0.08)}, ${alpha(
                      t.palette.secondary.main,
                      0.08
                  )})`,
            }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/*<Chip*/}
            {/*    icon={<VerifiedRoundedIcon />}*/}
            {/*    label='Verified listings'*/}
            {/*    color='primary'*/}
            {/*    sx={{ mb: 3, fontWeight: 600 }}*/}
            {/*/>*/}

            <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' },
                  gap: 4,
                }}
            >
              <Box>
                <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '2.2rem', md: '3.4rem' },
                      fontWeight: 700,
                      mb: 2,
                    }}
                >
                  Plan your next trip <br /> without the chaos.
                </Typography>

                <Typography
                    variant='body1'
                    color='text.secondary'
                    sx={{ mb: 4, maxWidth: 600 }}
                >
                  TripNest helps you quickly explore stays, compare options, and
                  book faster — without endless scrolling.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                      component={RouterLink}
                      to='/accommodations'
                      variant='contained'
                      size='large'
                      startIcon={<SearchRoundedIcon />}
                      sx={{ borderRadius: 3 }}
                  >
                    Browse accommodations
                  </Button>

                  <Button
                      component={RouterLink}
                      to='/accommodations'
                      variant='outlined'
                      size='large'
                      endIcon={<ArrowForwardRoundedIcon />}
                      sx={{ borderRadius: 3 }}
                  >
                    See all listings
                  </Button>
                </Stack>
              </Box>

              {/* Right Info Card */}
              <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    boxShadow: 2,
                    ...cardHover,
                  }}
              >
                <Typography variant='subtitle2' sx={{ mb: 2 }}>
                  What you can do
                </Typography>

                <Stack spacing={2}>
                  {[
                    ['Check inventory fast', 'See what is currently available.', <NightShelterRoundedIcon color='primary' />],
                    ['Open listing details', 'Availability, category, and host info.', <FavoriteRoundedIcon color='primary' />],
                    ['Explore people & places', 'Hosts and country profiles.', <SupportAgentRoundedIcon color='primary' />],
                  ].map(([title, desc, icon], i) => (
                      <Stack key={i} direction='row' spacing={1.5}>
                        {icon}
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {desc}
                          </Typography>
                        </Box>
                      </Stack>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Box>
        </Surface>

        {/* Features */}
        <Box
            sx={{
              display: 'grid',
              gap: 3,
              mt: 2,
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            }}
        >
          {[
            ['Availability at a glance', 'Quickly see rented vs available stays'],
            ['Clean listings', 'Only important info, no clutter'],
            ['Smooth navigation', 'Fast browsing across all devices'],
          ].map(([title, desc], i) => (
              <Surface key={i} sx={{ p: 3, borderRadius: 3, ...cardHover }}>
                <Typography variant='h6' sx={{ mb: 1 }}>
                  {title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {desc}
                </Typography>
              </Surface>
          ))}
        </Box>

        {/* Why section */}
        <Surface sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant='h5' sx={{ mb: 2, fontWeight: 700 }}>
            Why TripNest feels simple
          </Typography>

          <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              }}
          >
            {[
              ['Real-time inventory', 'Instant availability updates', <NightShelterRoundedIcon color='primary' />],
              ['Focused browsing', 'Clean UI for faster decisions', <FavoriteRoundedIcon color='primary' />],
              ['Helpful context', 'Switch between details easily', <SupportAgentRoundedIcon color='primary' />],
            ].map(([title, desc, icon], i) => (
                <Stack key={i} direction='row' spacing={1.5}>
                  {icon}
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {desc}
                    </Typography>
                  </Box>
                </Stack>
            ))}
          </Box>
        </Surface>

        {/* CTA */}
        <Surface
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: 'center',
              bgcolor: (t) => alpha(t.palette.primary.main, 0.05),
            }}
        >
          <Typography variant='h5' sx={{ mb: 2 }}>
            Ready to explore?
          </Typography>

          <Button
              component={RouterLink}
              to='/accommodations'
              variant='contained'
              size='large'
              sx={{ borderRadius: 3 }}
          >
            Start exploring
          </Button>
        </Surface>
      </Section>
  );
};

export default HomePage;