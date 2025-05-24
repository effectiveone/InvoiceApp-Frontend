import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sanitizedUrl } from '../../Utils/api';
import { styled } from '@mui/material/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Avatar,
} from '@mui/material';
import {
  Dashboard,
  Receipt,
  Inventory,
  People,
  Business,
  Settings,
  AddCircle,
} from '@mui/icons-material';
import { t } from 'i18next';

const drawerWidth = 280;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.15)',
    zIndex: 1200,
  },
}));

const LogoSection = styled(Box)(({ theme }) => ({
  padding: '24px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  marginBottom: '16px',
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: '4px 12px',
  borderRadius: '12px',
  background: active ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
  backdropFilter: active ? 'blur(10px)' : 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(4px)',
  },
  '& .MuiListItemIcon-root': {
    color: 'white',
    minWidth: '40px',
  },
  '& .MuiListItemText-primary': {
    fontWeight: active ? '600' : '500',
    fontSize: '14px',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  padding: '16px 24px 8px 24px',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  opacity: 0.7,
}));

const MainContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  marginLeft: drawerWidth,
  minHeight: '100vh',
  transition: 'margin 0.3s ease',
}));

const PermanentDrawer = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    {
      section: 'Główne',
      items: [
        {
          path: sanitizedUrl.MainPage,
          label: t('dashboardPage'),
          icon: <Dashboard />,
        },
        {
          path: sanitizedUrl.AllInvoices,
          label: t('newInvoice'),
          icon: <AddCircle />,
        },
        {
          path: sanitizedUrl.Dashboard,
          label: t('allInvoice'),
          icon: <Receipt />,
        },
      ],
    },
    {
      section: 'Zarządzanie',
      items: [
        {
          path: sanitizedUrl.Inventory,
          label: t('inventory'),
          icon: <Inventory />,
        },
        {
          path: sanitizedUrl.Kontrahent,
          label: t('contrahent'),
          icon: <People />,
        },
        {
          path: sanitizedUrl.MyCompany,
          label: t('myCompany'),
          icon: <Business />,
        },
      ],
    },
    {
      section: 'Konfiguracja',
      items: [
        {
          path: sanitizedUrl.Settings,
          label: t('settings'),
          icon: <Settings />,
        },
      ],
    },
  ];

  return (
    <Box sx={{ display: 'flex' }} data-testid='permanent-drawer'>
      <StyledDrawer variant='permanent' anchor='left'>
        <LogoSection>
          <Avatar
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              width: 40,
              height: 40,
            }}
          >
            <Receipt />
          </Avatar>
          <Box>
            <Typography
              variant='h6'
              sx={{ fontWeight: 'bold', fontSize: '18px' }}
            >
              InvoiceApp
            </Typography>
            <Typography
              variant='caption'
              sx={{ opacity: 0.8, fontSize: '12px' }}
            >
              System fakturowania
            </Typography>
          </Box>
        </LogoSection>

        {menuItems.map((section, sectionIndex) => (
          <Box key={sectionIndex}>
            <SectionTitle>{section.section}</SectionTitle>
            <List sx={{ padding: 0 }}>
              {section.items.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <StyledListItem
                    key={index}
                    component={Link}
                    to={item.path}
                    active={isActive}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </StyledListItem>
                );
              })}
            </List>
            {sectionIndex < menuItems.length - 1 && (
              <Divider
                sx={{
                  margin: '16px 20px',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              />
            )}
          </Box>
        ))}
      </StyledDrawer>
      <MainContent>{children}</MainContent>
    </Box>
  );
};

export default PermanentDrawer;
