import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <MuiBreadcrumbs>
    {items.map((item, index) => {
      const isLast = index === items.length - 1;

      if (isLast) {
        return (
          <Typography key={item.label} color="text.primary">
            {item.label}
          </Typography>
        );
      }

      return (
        <Link
          key={item.label}
          component={RouterLink}
          to={item.href || '#'}
          color="inherit"
        >
          {item.label}
        </Link>
      );
    })}
  </MuiBreadcrumbs>
);
