import React from 'react';
import {
  Box,
  IconButton,
  Paper,
  ClickAwayListener,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/system';
import { useSettings } from '../../Hook/useSettings';
import { v4 as uuid } from 'uuid';

const LanguageSelector = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
}));

const SelectedOption = styled(IconButton)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  fontSize: '24px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
  },
}));

const OptionsContainer = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '70px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 9999,
  padding: '8px',
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  minWidth: '80px',
}));

const OptionButton = styled(IconButton)(({ theme }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  fontSize: '20px',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(102, 126, 234, 0.1)',
    transform: 'scale(1.1)',
  },
}));

const CustomSelect = () => {
  const {
    isOpen,
    setSelectedOption,
    selectedOption,
    toggleOptions,
    handleLang,
    options,
  } = useSettings();

  const selectOptions = (option) => {
    setSelectedOption(option);
    handleLang(option.value);
    toggleOptions();
  };

  const handleClickAway = () => {
    if (isOpen) {
      toggleOptions();
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <LanguageSelector>
        <Tooltip title='Wybierz język aplikacji' placement='top'>
          <SelectedOption onClick={toggleOptions}>
            {selectedOption.icon}
          </SelectedOption>
        </Tooltip>

        {isOpen && (
          <OptionsContainer elevation={0}>
            {options.map((option) => (
              <Tooltip
                key={uuid()}
                title={option.label || option.value}
                placement='right'
              >
                <OptionButton
                  onClick={() => selectOptions(option)}
                  size='small'
                >
                  {option.icon}
                </OptionButton>
              </Tooltip>
            ))}
          </OptionsContainer>
        )}
      </LanguageSelector>
    </ClickAwayListener>
  );
};

export default CustomSelect;
