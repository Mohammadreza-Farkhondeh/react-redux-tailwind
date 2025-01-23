import { Search as SearchIcon } from '@mui/icons-material';
import { Input } from '../Input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search...',
}: SearchBarProps) => (
  <Input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    startIcon={<SearchIcon />}
  />
);
