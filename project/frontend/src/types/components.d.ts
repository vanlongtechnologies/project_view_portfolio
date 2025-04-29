declare module '*.tsx' {
  const component: React.ComponentType<any>;
  export default component;
}

declare module './pages/Home';
declare module './pages/About';
declare module './pages/Contact';
declare module './pages/admin/Admin';
declare module './pages/admin/Login';
declare module './components/Navbar';
declare module './components/Footer';
declare module './components/PrivateRoute'; 