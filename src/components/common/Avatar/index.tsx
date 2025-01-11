import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
} from '@mui/material';

interface AvatarProps extends MuiAvatarProps {
  name?: string;
}

export const Avatar = ({ name, src, ...props }: AvatarProps) => {
  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <MuiAvatar src={src} {...props}>
      {!src && initials}
    </MuiAvatar>
  );
};
