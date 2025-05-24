import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useSettings } from '../../Hook/useSettings';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    '&:hover fieldset': {
      borderColor: '#667eea',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#667eea',
    },
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: '#667eea',
    },
  },
}));

const DesignSelect = () => {
  const { mySystemOfDesign, handleThemeChange, selectedDesign } = useSettings();

  return (
    <Box sx={{ mt: 1 }}>
      <StyledFormControl fullWidth>
        <InputLabel id='design-select-label'>Wybierz motyw</InputLabel>
        <Select
          labelId='design-select-label'
          value={selectedDesign}
          label='Wybierz motyw'
          onChange={handleThemeChange}
        >
          {mySystemOfDesign?.map((design) => (
            <MenuItem key={design.name} value={design.name}>
              {design.name}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </Box>
  );
};

export default DesignSelect;
