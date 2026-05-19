import { Alert, CircularProgress, Typography } from '@mui/material';
import { useMemo } from 'react';
import useHosts from '../../../hooks/host/useHosts';
import useCountries from '../../../hooks/country/useCountries';
import HostGrid from '../../components/host/HostGrid';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import Section from '../../components/layout/Section/Section';
import Surface from '../../components/layout/Surface/Surface';

const HostsPage = () => {
  const { hosts, loading, error } = useHosts();
  const { countries, loading: countriesLoading, error: countriesError } = useCountries();

  const countryNameById = useMemo(() => {
    const m: Record<number, string> = {};
    for (const c of countries) {
      m[c.id] = c.name;
    }
    return m;
  }, [countries]);

  return (
    <Section>
      <PageHeader
        id='hosts-heading'
        title='Host directory'
        subtitle='Meet the people behind the listings. Open a profile to see where they are based and link through to their country.'
        meta={
          !loading && !error && hosts.length > 0 ? (
            <Typography variant='body2' sx={{ color: 'primary.main', fontWeight: 600 }}>
              {hosts.length} host{hosts.length === 1 ? '' : 's'} in the directory
            </Typography>
          ) : null
        }
      />

      {error && (
        <Alert severity='error' role='alert'>
          {error.message}
        </Alert>
      )}

      {countriesError && (
        <Alert severity='warning' role='status'>
          {countriesError.message} Country names on cards may be incomplete.
        </Alert>
      )}

      {loading && (
        <Surface sx={{ display: 'grid', placeItems: 'center', minHeight: 280 }}>
          <CircularProgress aria-label='Loading hosts' />
        </Surface>
      )}

      {!loading && !error && hosts.length === 0 && (
        <Alert severity='info'>No hosts are listed yet. Check back soon.</Alert>
      )}

      {!loading && !error && hosts.length > 0 && (
        <HostGrid hosts={hosts} countryNameById={countriesLoading ? undefined : countryNameById} />
      )}
    </Section>
  );
};

export default HostsPage;

