import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/system';
import {
  Settings as SettingsIcon,
  Language,
  Palette,
  ArticleOutlined,
} from '@mui/icons-material';
import CustomSelect from './CustomSelect';
import TemplateCheckbox from './templateCheckbox';
import DesignSelect from './designSelect';

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '32px',
  padding: '24px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '16px',
  color: 'white',
}));

const SettingsCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  transition: 'all 0.3s ease',
  pointerEvents: 'auto',
  position: 'relative',
  zIndex: 2,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '16px',
  fontWeight: '600',
  color: '#374151',
  fontSize: '18px',
}));

const Settings = () => {
  return (
    <Container
      maxWidth='lg'
      sx={{
        pointerEvents: 'auto',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <HeaderSection>
        <SettingsIcon sx={{ fontSize: 32, marginRight: 2 }} />
        <Box>
          <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            Ustawienia aplikacji
          </Typography>
          <Typography variant='body1' sx={{ opacity: 0.9 }}>
            Personalizuj swoją aplikację fakturową
          </Typography>
        </Box>
      </HeaderSection>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <SettingsCard>
            <CardContent sx={{ p: 3 }}>
              <SectionTitle>
                <Language sx={{ color: '#667eea' }} />
                Język aplikacji
              </SectionTitle>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CustomSelect />
              </Box>
            </CardContent>
          </SettingsCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <SettingsCard>
            <CardContent sx={{ p: 3 }}>
              <SectionTitle>
                <Palette sx={{ color: '#667eea' }} />
                Motyw aplikacji
              </SectionTitle>
              <DesignSelect />
            </CardContent>
          </SettingsCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <SettingsCard>
            <CardContent sx={{ p: 3 }}>
              <SectionTitle>
                <ArticleOutlined sx={{ color: '#667eea' }} />
                Szablon faktury
              </SectionTitle>
              <TemplateCheckbox />
            </CardContent>
          </SettingsCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;
