import { Container as MuiContainer, ContainerProps } from '@mui/material';

interface CustomContainerProps extends Omit<ContainerProps, 'maxWidth'> {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fluid?: boolean;
}

export const Container = ({
  fluid,
  maxWidth = 'lg',
  children,
  ...props
}: CustomContainerProps) => (
  <MuiContainer maxWidth={fluid ? false : maxWidth} {...props}>
    {children}
  </MuiContainer>
);
