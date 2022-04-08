import { Alert, AlertIcon } from "@chakra-ui/react";

export function ErrorMessage({ children }) {
  return (
    <Alert status='error'>
      <AlertIcon />
      {children}
    </Alert>
  );
}
