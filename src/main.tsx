import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import store from './app/store.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.tsx';
import theme from './theme/theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </Provider>
);
