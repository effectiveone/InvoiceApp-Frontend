import React from 'react';
import Layout from '../shared/ui/Layout/layout';
import { KontrahentProvider } from '../entities/kontrahent/model/useKontrahentContext';
import { EnhancedContrahentsTable } from '../shared/ui/DataTable';
import { useKontrahentContext } from '../entities/kontrahent/model/useKontrahentContext';

// Component that uses the kontrahent context
const ContrahentsTableWithContext = () => {
  const { kontrahent } = useKontrahentContext();

  return <EnhancedContrahentsTable contrahents={kontrahent || []} />;
};

const EnhancedKontrahentPage = () => {
  return (
    <KontrahentProvider>
      <ContrahentsTableWithContext />
    </KontrahentProvider>
  );
};

export default Layout(EnhancedKontrahentPage);
