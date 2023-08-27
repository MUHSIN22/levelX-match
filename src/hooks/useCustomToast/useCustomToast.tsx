// import react
import { useCallback } from 'react';

// import chakra ui
import { useToast } from '@chakra-ui/react';

export default function useCustomToast() {
  const toast = useToast();

  /* The `useCallback` hook is creating a memoized function called `showToast` that takes in four
optional parameters: `title`, `message`, `status`, and `duration`. This function calls the
`useToast` hook from the Chakra UI library to display a toast notification with the provided
parameters. The `useCallback` hook is also passing in the `toast` function as a dependency, which
ensures that the `showToast` function is only recreated if the `toast` function changes. This helps
to optimize performance by preventing unnecessary re-renders. The `useCustomToast` function returns
the `showToast` function. */
  const showToast = useCallback(
    (
      title?: string,
      message?: string,
      status?: 'success' | 'error' | 'warning' | 'info',
      duration?: number
    ) => {
      toast({
        title,
        description: message,
        position: 'bottom',
        status: status || 'success',
        duration: duration || 6000,
        isClosable: true
      });
    },
    [toast]
  );

  return showToast;
}
