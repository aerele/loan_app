'use client';

import { Box, Typography, TextField, Button, Paper } from '@mui/material';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useEffect } from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import Title1 from '@/components/Titel1';
import { addToast } from '@/components/error/toastStore';
import hi from '@/messages/hi.json';
import en from '@/messages/en.json';
import { redirect } from 'next/navigation';

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState('');
  const [fillOtp, setFillOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [resend, SetResend] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!fillOtp) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resend]);

  const resendOtp = () => {
    if (!canResend) return;
    setCanResend(false);
    setFillOtp(true);
    setSeconds(60);
    validteAndSendOtp();
  };

  const handleRequestOTP = async () => {
    setLoading(true);
    if (fillOtp) {
      if (otp.length >= 6 && otp == '123456') {
        addToast({
          type: 'success',
          hi: hi?.login?.login_success,
          en: en?.login?.login_success,
        });
        redirect('/dashboard');
      } else {
        addToast({
          type: 'error',
          hi: hi?.login?.invalid,
          en: en?.login?.invalid,
        });
      }
    } else {
      validteAndSendOtp();
    }
    setLoading(false);
  };

  const validteAndSendOtp = () => {
    if (mobile.length > 10) {
      addToast({
        type: 'error',
        hi: hi?.login?.enter_number,
        en: en?.login?.enter_number,
      });
    } else if (mobile == '7826844889') {
      addToast({
        type: 'success',
        hi: hi?.login?.otp_sent,
        en: en?.login?.otp_sent,
      });
      setFillOtp(true);
      setCanResend(false);
      SetResend(!resend);
    } else {
      addToast({
        type: 'error',
        hi: hi?.login?.invalid_number,
        en: en?.login?.invalid_number,
      });
    }
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

          <Title1
            h1={hi.login.title}
            h2={en.login.title}
            h1style={{ fontSize: 22, fontWeight: 700 }}
            h2style={{ fontWeight: 500, mb: 2 }}
          />

          <Box sx={{ mt: 2 }}>
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
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                  onClick={resendOtp}
                >
                  <Title1
                    h1={`${hi.login.resend}`}
                    h2={`(${en.login.resend})`}
                    boxStyle={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: canResend ? 'pointer' : 'not-allowed',
                    }}
                    h1style={{
                      fontSize: 14,
                      fontWeight: canResend ? 700 : 400,
                      color: canResend ? '#000' : '#9CA3AF',
                    }}
                    h2style={{
                      pl: 1,
                      fontWeight: canResend ? 600 : 400,
                      color: canResend ? '#000' : '#9CA3AF',
                    }}
                  />

                  {!canResend && (
                    <Typography sx={{ ml: 1, fontSize: 14, color: '#9CA3AF' }}>
                      {seconds}s
                    </Typography>
                  )}
                </Box>

                {/* {resend && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      fontSize={14}
                      color={resend ? 'error' : 'text.secondary'}
                      mb={2}
                    >
                      <Box
                        component="span"
                        sx={{
                          cursor: 'pointer',
                          color: '#000',
                        }}
                        onClick={resendOtp}
                      >
                        <Title1
                          h1={hi.login.resend}
                          h2={`(${en.login.resend})`}
                          boxStyle={{ display: 'flex', flexDirection: 'row' }}
                          h1style={{ fontSize: 14, fontWeight: 600 }}
                          h2style={{ pl: 1 }}
                        />
                      </Box>
                    </Typography>
                  </Box>
                )} */}
              </Box>
            ) : (
              <Box>
                <Title1
                  h1={hi.login.mobile}
                  h2={en.login.mobile}
                  h1style={{ fontSize: 22, fontWeight: 600 }}
                  h2style={{ fontWeight: 300, mb: 2 }}
                />
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
                <Title1
                  h1={fillOtp ? hi.login.login : hi.login.otp}
                  h2={fillOtp ? en.login.login : en.login.otp}
                  h1style={{
                    fontWeight: 600,
                    textAlign: 'center',
                    fontSize: 14,
                  }}
                  h2style={{
                    fontWeight: 400,
                    fontSize: 'small',
                    textAlign: 'center',
                  }}
                />
              </Box>
            )}
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

export default LoginPage;
