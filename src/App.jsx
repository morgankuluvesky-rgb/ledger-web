import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import { AuthProvider } from './dashboard/context/AuthContext';

// Public Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import CookiePolicy from './pages/CookiePolicy';
import Assets from './pages/Assets';
import Bitcoin from './pages/Bitcoin';
import Ethereum from './pages/Ethereum';
import Solana from './pages/Solana';
import TradingPlatform from './pages/TradingPlatform';
import PortfolioManagement from './pages/PortfolioManagement';
import Staking from './pages/Staking';
import HelpCenter from './pages/HelpCenter';
import Blog from './pages/Blog';

// Auth Pages
import LoginPage from './dashboard/pages/LoginPage';
import RegisterPage from './dashboard/pages/RegisterPage';
import VerifyPage from './dashboard/pages/VerifyPage';

// Dashboard Pages
import DashboardLayout from './dashboard/DashboardLayout';
import WalletPage from './dashboard/pages/WalletPage';
import SendPage from './dashboard/pages/SendPage';
import ReceivePage from './dashboard/pages/ReceivePage';
import SwapPage from './dashboard/pages/SwapPage';
import ReferralsPage from './dashboard/pages/ReferralsPage';
import SettingsPage from './dashboard/pages/SettingsPage';
import ManageCryptoPage from './dashboard/pages/ManageCryptoPage';
import AddressesPage from './dashboard/pages/AddressesPage';
import NotificationsPage from './dashboard/pages/NotificationsPage';
import CardsPage from './dashboard/pages/CardsPage';
import BuyPage from './dashboard/pages/BuyPage';
import PinSetupPage from './dashboard/pages/PinSetupPage';
import PinEntryPage from './dashboard/pages/PinEntryPage';

// Admin Panel (Standalone)
import AdminLoginPage from './admin/AdminLoginPage';
import AdminPanel from './admin/AdminPanel';
import AdminDashboardPage from './admin/AdminDashboardPage';
import AdminUsersPage from './admin/AdminUsersPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <PageTransition>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />

            {/* Company Pages */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />

            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<CookiePolicy />} />

            {/* Asset Pages */}
            <Route path="/assets" element={<Assets />} />
            <Route path="/bitcoin" element={<Bitcoin />} />
            <Route path="/ethereum" element={<Ethereum />} />
            <Route path="/solana" element={<Solana />} />

            {/* Solutions Pages */}
            <Route path="/trading" element={<TradingPlatform />} />
            <Route path="/portfolio" element={<PortfolioManagement />} />
            <Route path="/staking" element={<Staking />} />

            {/* Resources Pages */}
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/blog" element={<Blog />} />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/pin-setup" element={<PinSetupPage />} />
            <Route path="/pin" element={<PinEntryPage />} />

            {/* Dashboard Routes (Protected) */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<WalletPage />} />
              <Route path="send" element={<SendPage />} />
              <Route path="receive" element={<ReceivePage />} />
              <Route path="swap" element={<SwapPage />} />
              <Route path="referrals" element={<ReferralsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="manage-crypto" element={<ManageCryptoPage />} />
              <Route path="addresses" element={<AddressesPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="cards" element={<CardsPage />} />
              <Route path="buy" element={<BuyPage />} />
            </Route>

            {/* Admin Panel (Separate) */}
            <Route path="/adminlogin" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminPanel />}>
              <Route index element={<AdminDashboardPage />} />
            </Route>
            <Route path="/admin/users" element={<AdminPanel />}>
              <Route index element={<AdminUsersPage />} />
            </Route>
          </Routes>
        </PageTransition>
      </AuthProvider>
    </BrowserRouter>
  );
}
