import { Stack as MuiStack, StackProps as MuiStackProps } from '@mui/material';

interface StackProps extends MuiStackProps {
  inline?: boolean;
}

export const Stack = ({
  spacing = 2,
  inline,
  children,
  ...props
}: StackProps) => (
  <MuiStack
    spacing={spacing}
    direction={props.direction || 'column'}
    display={inline ? 'inline-flex' : 'flex'}
    {...props}
  >
    {children}
  </MuiStack>
);
