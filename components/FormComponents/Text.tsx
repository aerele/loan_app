'use client';

import { Box, TextField, TextFieldProps } from '@mui/material';
import Title1 from '@/components/Titel1';

type textValue = {
  label_1: string;
  label_2: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
} & TextFieldProps;

function Text({
  label_1,
  label_2,
  placeholder,
  multiline = false,
  rows,
  type,
  ...rest
}: textValue) {
  return (
    <Box>
      <Title1
        h1={label_1}
        boxStyle={{ ml: 0.5 }}
        h2={label_2}
        h1style={{ fontSize: 13, fontWeight: 500 }}
        h2style={{ mb: 0.5, fontWeight: 550, fontSize: 13 }}
      />

      <TextField
        fullWidth
        placeholder={placeholder}
        variant="outlined"
        multiline={multiline}
        type={type}
        rows={rows}
        {...rest}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',

            '& fieldset': {
              borderColor: '#9CA3AF',
            },

            '&:hover fieldset': {
              borderColor: '#9CA3AF',
            },

            '&.Mui-focused fieldset': {
              borderColor: '#9CA3AF',
            },

            '& input::placeholder, & textarea::placeholder': {
              color: '#9CA3AF',
              opacity: 1,
              fontSize: '12px',
              fontWeight: 400,
            },
          },
        }}
      />
    </Box>
  );
}

export default Text;
