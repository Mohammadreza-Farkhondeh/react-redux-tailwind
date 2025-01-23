import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  Box,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarItem {
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: Omit<SidebarItem, 'children'>[];
}

interface SidebarProps {
  items: SidebarItem[];
  width?: number;
}

export const Sidebar = ({ items, width = 240 }: SidebarProps) => {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const navigate = useNavigate();

  const renderItems = (items: SidebarItem[], level = 0) => {
    return items.map((item) => {
      const isSelected = item.path === location.pathname;
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = open[item.label];

      return (
        <Box key={item.label}>
          <ListItem disablePadding>
            <ListItemButton
              selected={isSelected}
              onClick={() => {
                if (hasChildren) {
                  setOpen((prev) => ({
                    ...prev,
                    [item.label]: !prev[item.label],
                  }));
                } else if (item.path) {
                  navigate(item.path);
                }
              }}
              sx={{ pl: level * 2 }}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText primary={item.label} />
              {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>

          {hasChildren && (
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List disablePadding>
                {renderItems(item.children!, level + 1)}
              </List>
            </Collapse>
          )}
        </Box>
      );
    });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>{renderItems(items)}</List>
    </Drawer>
  );
};
