import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { GymDiscovery } from './components/GymDiscovery';
import { LeaderboardChallenges } from './components/LeaderboardChallenges';
import { Store } from './components/Store';
import { MemberDashboard } from './components/MemberDashboard';
import { OwnerDashboard } from './components/OwnerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { GymDetailsModal } from './components/GymDetailsModal';
import { CheckoutModal } from './components/CheckoutModal';
import { DigitalPassModal } from './components/DigitalPassModal';
import { LogPRModal } from './components/LogPRModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    activeTab,
    personaRole,
    selectedGym,
    setSelectedGym,
    isPassModalOpen,
    setIsPassModalOpen,
    isLogPROpen,
    setIsLogPROpen,
    notification,
  } = useApp();

  const [checkoutPlan, setCheckoutPlan] = useState<'Monthly Pass' | 'Quarterly Pass' | 'Annual Elite' | null>(null);

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'discover':
        return <GymDiscovery />;
      case 'leaderboard':
        return <LeaderboardChallenges />;
      case 'store':
        return <Store />;
      case 'dashboard':
        if (personaRole === 'owner') return <OwnerDashboard />;
        if (personaRole === 'admin') return <AdminDashboard />;
        return <MemberDashboard />;
      default:
        return <GymDiscovery />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0D10] text-slate-100 selection:bg-[#CCFF00] selection:text-black">
      {/* Toast Notification Alert Banner */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-fade-in">
          <div
            className={`p-4 rounded-2xl shadow-2xl border flex items-center gap-3 backdrop-blur-md ${
              notification.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
                : notification.type === 'warning'
                ? 'bg-amber-950/90 border-amber-500/40 text-amber-200'
                : 'bg-slate-900/90 border-white/20 text-slate-200'
            }`}
          >
            {notification.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {notification.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />}
            {notification.type === 'info' && <Info className="w-5 h-5 text-[#CCFF00] shrink-0" />}
            <span className="text-xs font-semibold leading-relaxed flex-1">{notification.text}</span>
          </div>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar />

      {/* Main Page Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {renderCurrentView()}
      </main>

      {/* Modals & Slide-out Drawers */}
      {selectedGym && !checkoutPlan && (
        <GymDetailsModal
          gym={selectedGym}
          onClose={() => setSelectedGym(null)}
          onSelectPlan={(plan) => setCheckoutPlan(plan)}
        />
      )}

      {selectedGym && checkoutPlan && (
        <CheckoutModal
          gym={selectedGym}
          planType={checkoutPlan}
          onClose={() => {
            setCheckoutPlan(null);
            setSelectedGym(null);
          }}
        />
      )}

      {isPassModalOpen && (
        <DigitalPassModal onClose={() => setIsPassModalOpen(false)} />
      )}

      {isLogPROpen && (
        <LogPRModal onClose={() => setIsLogPROpen(false)} />
      )}

      <CartDrawer />

      {/* Footer with Ansh Dwivedi Credits */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
