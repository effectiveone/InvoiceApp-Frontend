import React from 'react';
import Layout from '../shared/ui/Layout/layout';
import { ProductProvider } from '../entities/product/model/useProductContext';
import { EnhancedInventoryTable } from '../shared/ui/DataTable';
import { useProductContext } from '../entities/product/model/useProductContext';

// Component that uses the product context
const InventoryTableWithContext = () => {
  const { productList } = useProductContext();

  return <EnhancedInventoryTable products={productList || []} />;
};

const EnhancedInventoryPage = () => {
  return (
    <ProductProvider>
      <InventoryTableWithContext />
    </ProductProvider>
  );
};

export default Layout(EnhancedInventoryPage);
