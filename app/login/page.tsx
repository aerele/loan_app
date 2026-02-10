'use client';

import { Box, Typography, TextField, Button, Paper } from '@mui/material';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';

function LoginPage() {
  const t = useTranslations('login');
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState('');
  const [fillOtp, setFillOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(true);

  const handleMainAction = () => {
    console.log('hi');
  };

  const handleRequestOTP = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setFillOtp(true);
    }, 2000);
  };

  const mobilbumber = (value: string) => {
    const numbersOnly = value.replace(/\D/g, '');
    setMobile(numbersOnly);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F3F4F6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        p: 2,
      }}
    >
      <Box
        sx={{
          minHeight: '100vh',
          maxWidth: 420,
          backgroundColor: 'transparent',
          boxShadow: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 420,
            borderRadius: 4,
            p: 3,
            backgroundColor: 'transparent',
            boxShadow: {
              xs: 'none',
              md: 6,
            },
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              backgroundColor: '#E5E7EB',
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <AccountBalanceIcon sx={{ fontSize: 32 }} />
          </Box>

          <Typography variant="h5" fontWeight={700} gutterBottom>
            {t('title')}
          </Typography>

          <Box>
            {fillOtp ? (
              <Box>
                <MuiOtpInput
                  value={otp}
                  onChange={(val) => setOtp(val.replace(/\D/g, ''))}
                  length={6}
                  autoFocus
                  sx={{
                    gap: 1,
                    mb: 2,
                    py: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      backgroundColor: '#F9FAFB',
                    },
                  }}
                />
                {otpError && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      fontSize={14}
                      color={otpError ? 'error' : 'text.secondary'}
                      mb={2}
                    >
                      OTP {t('invalid')}.&nbsp;
                      <Box
                        component="span"
                        sx={{
                          cursor: 'pointer',
                          color: '#000',
                        }}
                        onClick={handleRequestOTP}
                      >
                        {t('resend')}
                      </Box>
                    </Typography>
                  </Box>
                )}
              </Box>
            ) : (
              <Box>
                <Typography fontWeight={600} mb={1}>
                  {t('mobile')}
                </Typography>
                <TextField
                  fullWidth
                  placeholder="0123456789"
                  variant="outlined"
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      backgroundColor: '#F9FAFB',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+91</InputAdornment>
                    ),
                  }}
                  onChange={(e) => mobilbumber(e.target.value)}
                />
              </Box>
            )}
          </Box>

          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={handleRequestOTP}
            sx={{
              backgroundColor: '#000',
              borderRadius: 3,
              mt: 1,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0px 6px 10px rgba(0,0,0,0.2)',
              '&:hover': {
                backgroundColor: '#111',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: '#fff' }} />
            ) : (
              <Box textAlign="center">
                <Typography fontWeight={600}>
                  {fillOtp ? t('login') : t('otp')}
                </Typography>
              </Box>
            )}
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

export default LoginPage;
