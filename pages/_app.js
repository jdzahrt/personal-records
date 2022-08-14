import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import PropTypes from 'prop-types';

function PersonalRecords(props) {
  PersonalRecords.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.shape({
      session: PropTypes.string,
    }).isRequired,
  };

  const {
    Component,
    pageProps,
  } = props;

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default PersonalRecords;
