import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Container from './components/Container/Container';
import NavigationMenu from './components/NavigationMenu/NavigationMenu';
import Section from './components/Section/Section';
import TopMenu from './components/TopMenu/TopMenu';
import { lazy, Suspense } from 'react';

const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const GroupsPage = lazy(() => import('./pages/GroupsPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const UsersPage = lazy(() => import('./pages/UsersPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

const App = () => {
  return (
    <Container>
      <TopMenu />
      <NavigationMenu />
      <Section>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Navigate to="/orders" />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/orders" />} />
          </Routes>
        </Suspense>
      </Section>
    </Container>
  );
};

export default App;
