import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Typography } from '../../common/Typography';

interface NavbarProps {
  title: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  mobileMenuContent?: React.ReactNode;
}

export const Navbar = ({
  title,
  leftContent,
  rightContent,
  mobileMenuContent,
}: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {isMobile && mobileMenuContent && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ flexGrow: 0 }}>
            {title}
          </Typography>

          {leftContent && <Box sx={{ ml: 2, flexGrow: 1 }}>{leftContent}</Box>}

          {rightContent && <Box sx={{ ml: 'auto' }}>{rightContent}</Box>}
        </Toolbar>
      </AppBar>

      {mobileMenuContent && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
        >
          {mobileMenuContent}
        </Drawer>
      )}
    </>
  );
};
