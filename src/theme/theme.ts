import { extendTheme } from '@chakra-ui/react';

const fonts = {
  heading: `'Montserrat', sans-serif`,
  body: `'Montserrat', sans-serif`
};

const breakpoints = {
  sm: '576px',
  md: '769px',
  lg: '992px',
  xl: '1200px',
  '2xl': '1400px'
};

const theme = extendTheme({
  fonts,
  breakpoints,
  components:{
    Text:{
      variants:{
        regular: {
          fontSize: ['12px','14px']
        },
        big:{
          fontSize:  ['17px','18px']
        }
      }
    }
  }
});

export default theme;
