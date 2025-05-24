import { createTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

const useTheme = () => {
  const dispatch = useDispatch();
  const [selectedDesign, setSelectedDesign] = useState();
  const design = useSelector((state) => state?.settings.mySystemOfDesign);
  const selectedDesignName = useSelector(
    (state) => state?.settings.settings.designName,
  );

  useEffect(() => {
    const selectedDesign = design?.find((p) => p.name === selectedDesignName);
    setSelectedDesign(selectedDesign);
  }, [design, selectedDesignName, dispatch]);

  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: selectedDesign?.primaryColor || '#667eea',
      },
      secondary: {
        main: selectedDesign?.secondaryColor || '#764ba2',
      },
      background: {
        default: selectedDesign?.backgroundColor || '#f8fafc',
        paper: '#ffffff',
      },
      text: {
        primary: selectedDesign?.textColor || '#374151',
        secondary: '#6b7280',
      },
      grey: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 12,
            fontWeight: 600,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
  });
};

export default useTheme;
