import {
  Tabs as MuiTabs,
  Tab as MuiTab,
  Box,
  TabsProps as MuiTabsProps,
} from '@mui/material';

interface Tab {
  label: string;
  value: string | number;
}

interface TabsProps extends Omit<MuiTabsProps, 'value' | 'onChange'> {
  tabs: Tab[];
  value: string | number;
  onChange: (value: string | number) => void;
}

export const Tabs = ({ tabs, value, onChange, ...props }: TabsProps) => (
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <MuiTabs
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      {...props}
    >
      {tabs.map((tab) => (
        <MuiTab key={tab.value} label={tab.label} value={tab.value} />
      ))}
    </MuiTabs>
  </Box>
);
