import React from 'react';
import Layout from '../shared/ui/Layout/layout';
import {
  ProductProvider,
  useProductContext,
} from '../entities/product/model/useProductContext';
import { InventoryTable } from '../features/inventory';

// Component that uses the product context
const InventoryTableWithContext = () => {
  const { productList } = useProductContext();

  return <InventoryTable products={productList || []} />;
};

const EnhancedInventoryPage = () => {
  return (
    <ProductProvider>
      <InventoryTableWithContext />
    </ProductProvider>
  );
};

export default Layout(EnhancedInventoryPage);
