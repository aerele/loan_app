'use client';

import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import Title1 from '@/components/Titel1';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

type AppHeaderProps = {
  showBack?: boolean;
  onBack?: () => void;
  showUser?: boolean;
  userName?: string;
  h1?: string;
  h2?: string;
};

export default function AppHeader({
  showBack = false,
  onBack,
  showUser = false,
  userName,
  h1,
  h2,
}: AppHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });

    handleClose();
    router.push('/login');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderBottom: '1px solid #E5E7EB',
        backgroundColor: '#fff',
        flexShrink: 0,
      }}
    >
      {showBack && (
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
      )}

      {showUser && (
        <>
          <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
            <Avatar src="/user.png" />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                borderRadius: 3,
                mt: 1,
                minWidth: 150,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <MenuItem
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                mx: 0.5,
                my: 0.5,
                '&:hover': {
                  backgroundColor: '#F3F4F6',
                },
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" sx={{ fontWeight: 500 }}>
                Logout
              </Typography>
            </MenuItem>
          </Menu>

          <Box>
            <Typography fontSize={12} color="text.secondary">
              SHG उपयोगकर्ता
            </Typography>
            <Typography fontWeight={700}>{userName}</Typography>
          </Box>
        </>
      )}

      {!showUser && h1 && (
        <Box>
          <Title1
            h1={h1}
            h2={h2}
            h1style={{ fontSize: 14, fontWeight: 600 }}
            h2style={{ fontSize: 12 }}
          />
        </Box>
      )}
    </Box>
  );
}
