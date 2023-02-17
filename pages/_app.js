import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import PropTypes from 'prop-types';

// 1. Import `createTheme`
import { createTheme, NextUIProvider } from '@nextui-org/react';

// 2. Call `createTheme` and pass your custom theme values
const theme = createTheme({
  type: 'dark', // it could be "light" or "dark"
  theme: {
    colors: {
      primary: '#4ADE7B',
      secondary: '#F9CB80',
      error: '#FCC5D8',
    },
  }
});

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
    <NextUIProvider theme={theme}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </NextUIProvider>
  );
}

export default PersonalRecords;
