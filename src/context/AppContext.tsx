import React, { createContext, useContext, useState, useEffect } from 'react';
import { fireConfetti } from '../utils/confetti';
import {
  Gym,
  Product,
  CartItem,
  Order,
  Challenge,
  LeaderboardAthlete,
  PersonalRecord,
  UserPersona,
  PersonaRole,
  MemberPass,
  AttendanceRecord,
} from '../types';
import {
  INITIAL_PERSONAS,
  INITIAL_GYMS,
  INITIAL_PRODUCTS,
  INITIAL_CHALLENGES,
  INITIAL_LEADERBOARD,
  INITIAL_PERSONAL_RECORDS,
  INITIAL_MEMBER_PASS,
  INITIAL_ATTENDANCE_HISTORY,
} from '../data/mockData';

interface AppContextType {
  personaRole: PersonaRole;
  currentPersona: UserPersona;
  setPersonaRole: (role: PersonaRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currency: 'INR' | 'USD';
  toggleCurrency: () => void;
  formatPrice: (amountInINR: number) => string;
  gyms: Gym[];
  selectedGym: Gym | null;
  setSelectedGym: (gym: Gym | null) => void;
  memberPass: MemberPass | null;
  attendanceHistory: AttendanceRecord[];
  personalRecords: PersonalRecord[];
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  challenges: Challenge[];
  leaderboard: LeaderboardAthlete[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isPassModalOpen: boolean;
  setIsPassModalOpen: (open: boolean) => void;
  isLogPROpen: boolean;
  setIsLogPROpen: (open: boolean) => void;
  notification: { text: string; type: 'success' | 'info' | 'warning' } | null;
  showNotification: (text: string, type?: 'success' | 'info' | 'warning') => void;
  markTodayCheckIn: () => void;
  renewPass: (planName: 'Monthly Pass' | 'Quarterly Pass' | 'Annual Elite') => void;
  logNewPR: (lift: PersonalRecord['lift'], weightKg: number, reps: number, videoNote?: string) => void;
  reviewPR: (prId: string, status: 'verified' | 'rejected') => void;
  updateGymByOwner: (gymId: string, updates: Partial<Gym>) => void;
  verifyGymByAdmin: (gymId: string) => void;
  toggleGymStatusByAdmin: (gymId: string) => void;
  updateOrderStatusByAdmin: (orderId: string, status: Order['status']) => void;
  addToCart: (product: Product, option?: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkoutStore: (paymentMethod: string) => Order;
  checkoutMembershipPass: (gym: Gym, planType: 'Monthly Pass' | 'Quarterly Pass' | 'Annual Elite', paymentMethod: string) => void;
  joinChallenge: (challengeId: string) => void;
  resetDemoData: () => void;
  triggerCelebration: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personaRole, setPersonaRoleState] = useState<PersonaRole>(() => {
    return (localStorage.getItem('akhada_persona') as PersonaRole) || 'member';
  });

  const [activeTab, setActiveTab] = useState<string>('discover');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [gyms, setGyms] = useState<Gym[]>(() => {
    const saved = localStorage.getItem('akhada_gyms');
    return saved ? JSON.parse(saved) : INITIAL_GYMS;
  });
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [memberPass, setMemberPass] = useState<MemberPass | null>(() => {
    const saved = localStorage.getItem('akhada_pass');
    return saved ? JSON.parse(saved) : INITIAL_MEMBER_PASS;
  });
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('akhada_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE_HISTORY;
  });
  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>(() => {
    const saved = localStorage.getItem('akhada_prs');
    return saved ? JSON.parse(saved) : INITIAL_PERSONAL_RECORDS;
  });
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('akhada_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('akhada_orders');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'ORD-98214',
            date: '2026-10-14',
            customerName: 'Aryan Sharma',
            customerEmail: 'aryan.sharma@akhada.fitness',
            items: [
              { product: INITIAL_PRODUCTS[0], quantity: 1, selectedOption: 'Belgian Dark Chocolate' },
              { product: INITIAL_PRODUCTS[1], quantity: 1, selectedOption: 'Unflavored 250g' },
            ],
            totalAmount: 5198,
            status: 'Delivered',
            paymentMethod: 'UPI Instant QR',
            trackingNumber: 'DEL-EXP-7729112',
          },
        ];
  });
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem('akhada_challenges');
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
  });
  const [leaderboard, setLeaderboard] = useState<LeaderboardAthlete[]>(() => {
    const saved = localStorage.getItem('akhada_leaderboard');
    return saved ? JSON.parse(saved) : INITIAL_LEADERBOARD;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isLogPROpen, setIsLogPROpen] = useState(false);
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Sync states to localStorage
  useEffect(() => {
    localStorage.setItem('akhada_persona', personaRole);
  }, [personaRole]);

  useEffect(() => {
    localStorage.setItem('akhada_gyms', JSON.stringify(gyms));
  }, [gyms]);

  useEffect(() => {
    localStorage.setItem('akhada_pass', JSON.stringify(memberPass));
  }, [memberPass]);

  useEffect(() => {
    localStorage.setItem('akhada_attendance', JSON.stringify(attendanceHistory));
  }, [attendanceHistory]);

  useEffect(() => {
    localStorage.setItem('akhada_prs', JSON.stringify(personalRecords));
  }, [personalRecords]);

  useEffect(() => {
    localStorage.setItem('akhada_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('akhada_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('akhada_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('akhada_leaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);

  const currentPersona = INITIAL_PERSONAS[personaRole];

  const setPersonaRole = (role: PersonaRole) => {
    setPersonaRoleState(role);
    const targetName = INITIAL_PERSONAS[role].name;
    const roleTitle = INITIAL_PERSONAS[role].title;
    showNotification(`Switched persona to ${roleTitle} (${targetName})`, 'info');
    if (role === 'owner' || role === 'admin') {
      setActiveTab('dashboard');
    }
  };

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'INR' ? 'USD' : 'INR'));
  };

  const formatPrice = (amountInINR: number): string => {
    if (currency === 'USD') {
      const usd = Math.round(amountInINR / 85);
      return `$${usd.toLocaleString()}`;
    }
    return `₹${amountInINR.toLocaleString('en-IN')}`;
  };

  const showNotification = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.text === text ? null : curr));
    }, 4000);
  };

  const triggerCelebration = () => {
    fireConfetti();
  };

  const markTodayCheckIn = () => {
    const today = new Date().toISOString().split('T')[0];
    const alreadyCheckedIn = attendanceHistory.some((item) => item.date === today);

    if (alreadyCheckedIn) {
      showNotification("You've already marked today's gym session! Great job!", 'info');
      return;
    }

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      date: today,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      gymName: memberPass?.gymName || 'Akhada Iron Forge Arena',
      verified: true,
    };

    setAttendanceHistory([newRecord, ...attendanceHistory]);

    if (memberPass) {
      setMemberPass({
        ...memberPass,
        checkInsCount: memberPass.checkInsCount + 1,
      });
    }

    // Update streak in leaderboard for Aryan Sharma
    setLeaderboard((prev) =>
      prev.map((ath) => (ath.name.includes('Aryan') ? { ...ath, streakDays: ath.streakDays + 1 } : ath))
    );

    triggerCelebration();
    showNotification("Today's workout session logged! Attendance streak updated 🔥", 'success');
  };

  const renewPass = (planName: 'Monthly Pass' | 'Quarterly Pass' | 'Annual Elite') => {
    const daysToAdd = planName === 'Monthly Pass' ? 30 : planName === 'Quarterly Pass' ? 90 : 365;
    const now = new Date();
    const expiry = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    const updatedPass: MemberPass = {
      passId: `AKH-2026-${Math.floor(1000 + Math.random() * 9000)}-DEL`,
      memberName: currentPersona.name,
      memberEmail: currentPersona.email,
      gymId: 'gym-1',
      gymName: 'Akhada Iron Forge Arena',
      planType: planName,
      startDate: now.toISOString().split('T')[0],
      expiryDate: expiry.toISOString().split('T')[0],
      daysRemaining: daysToAdd,
      status: 'active',
      qrCodeData: `AKH-PASS:${Math.floor(1000 + Math.random() * 9000)}:${currentPersona.name.toUpperCase()}:VALID-${expiry.toISOString().split('T')[0]}`,
      checkInsCount: (memberPass?.checkInsCount || 0) + 1,
    };

    setMemberPass(updatedPass);
    triggerCelebration();
    showNotification(`${planName} renewed successfully! Digital QR pass updated.`, 'success');
  };

  const logNewPR = (
    lift: PersonalRecord['lift'],
    weightKg: number,
    reps: number,
    videoNote?: string
  ) => {
    const newPR: PersonalRecord = {
      id: `pr-${Date.now()}`,
      athleteName: currentPersona.name,
      lift,
      weightKg,
      reps,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      gymName: memberPass?.gymName || 'Akhada Iron Forge Arena',
      videoNote: videoNote || 'Submitted for Owner (Ansh Dwivedi) verification',
    };

    setPersonalRecords([newPR, ...personalRecords]);
    setIsLogPROpen(false);
    showNotification(`New ${lift} PR (${weightKg}kg) submitted! Sent to Gym Owner (Ansh Dwivedi) for official review.`, 'info');
  };

  const reviewPR = (prId: string, status: 'verified' | 'rejected') => {
    const targetPR = personalRecords.find((p) => p.id === prId);
    if (!targetPR) return;

    setPersonalRecords((prev) =>
      prev.map((item) =>
        item.id === prId
          ? {
              ...item,
              status,
              verifiedBy: status === 'verified' ? 'Ansh Dwivedi (Gym Owner)' : undefined,
            }
          : item
      )
    );

    if (status === 'verified') {
      // If Aryan Sharma PR was verified, update the leaderboard total
      if (targetPR.athleteName.includes('Aryan')) {
        setLeaderboard((prev) =>
          prev.map((ath) => {
            if (ath.name.includes('Aryan')) {
              let s = ath.squatKg;
              let b = ath.benchKg;
              let d = ath.deadliftKg;
              if (targetPR.lift === 'Squat' && targetPR.weightKg > s) s = targetPR.weightKg;
              if (targetPR.lift === 'Bench Press' && targetPR.weightKg > b) b = targetPR.weightKg;
              if (targetPR.lift === 'Deadlift' && targetPR.weightKg > d) d = targetPR.weightKg;
              return {
                ...ath,
                squatKg: s,
                benchKg: b,
                deadliftKg: d,
                totalKg: s + b + d,
              };
            }
            return ath;
          })
        );
      }
      triggerCelebration();
      showNotification(`PR for ${targetPR.athleteName} officially approved and published to public leaderboard by Ansh Dwivedi!`, 'success');
    } else {
      showNotification(`PR for ${targetPR.athleteName} marked rejected by Ansh Dwivedi.`, 'warning');
    }
  };

  const updateGymByOwner = (gymId: string, updates: Partial<Gym>) => {
    setGyms((prev) =>
      prev.map((g) => (g.id === gymId ? { ...g, ...updates } : g))
    );
    showNotification('Gym details and pricing tiers saved successfully by Ansh Dwivedi!', 'success');
  };

  const verifyGymByAdmin = (gymId: string) => {
    setGyms((prev) =>
      prev.map((g) => (g.id === gymId ? { ...g, verified: !g.verified } : g))
    );
    showNotification('Gym verification badge toggled by Platform Administrator Ansh Dwivedi!', 'info');
  };

  const toggleGymStatusByAdmin = (gymId: string) => {
    setGyms((prev) =>
      prev.map((g) =>
        g.id === gymId ? { ...g, status: g.status === 'active' ? 'suspended' : 'active' } : g
      )
    );
    showNotification('Gym active status modified by Platform Admin Ansh Dwivedi!', 'warning');
  };

  const updateOrderStatusByAdmin = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showNotification(`Order ${orderId} marked as ${status} by Ansh Dwivedi!`, 'info');
  };

  const addToCart = (product: Product, option?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedOption === option);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedOption === option
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedOption: option || product.sizeOrFlavor?.[0] }];
    });
    showNotification(`Added ${product.name} to cart!`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkoutStore = (paymentMethod: string): Order => {
    const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      customerName: currentPersona.name,
      customerEmail: currentPersona.email,
      items: [...cart],
      totalAmount,
      status: 'Processing',
      paymentMethod,
      trackingNumber: `TRK-EXP-${Math.floor(1000000 + Math.random() * 9000000)}`,
    };

    setOrders([newOrder, ...orders]);
    clearCart();
    setIsCartOpen(false);
    triggerCelebration();
    showNotification(`Order placed successfully! Order ID: ${newOrder.id}`, 'success');
    return newOrder;
  };

  const checkoutMembershipPass = (
    gym: Gym,
    planType: 'Monthly Pass' | 'Quarterly Pass' | 'Annual Elite',
    _paymentMethod: string
  ) => {
    const daysToAdd = planType === 'Monthly Pass' ? 30 : planType === 'Quarterly Pass' ? 90 : 365;
    const now = new Date();
    const expiry = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    const newPass: MemberPass = {
      passId: `AKH-2026-${Math.floor(1000 + Math.random() * 9000)}-${gym.city.substring(0, 3).toUpperCase()}`,
      memberName: currentPersona.name,
      memberEmail: currentPersona.email,
      gymId: gym.id,
      gymName: gym.name,
      planType,
      startDate: now.toISOString().split('T')[0],
      expiryDate: expiry.toISOString().split('T')[0],
      daysRemaining: daysToAdd,
      status: 'active',
      qrCodeData: `AKH-PASS:${Math.floor(1000 + Math.random() * 9000)}:${currentPersona.name.toUpperCase()}:${gym.id}:VALID-${expiry.toISOString().split('T')[0]}`,
      checkInsCount: 1,
    };

    setMemberPass(newPass);
    setSelectedGym(null);
    triggerCelebration();
    showNotification(`Welcome to ${gym.name}! Digital pass issued.`, 'success');
    setActiveTab('dashboard');
    setIsPassModalOpen(true);
  };

  const joinChallenge = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === challengeId
          ? {
              ...c,
              joined: !c.joined,
              participantsCount: c.joined ? c.participantsCount - 1 : c.participantsCount + 1,
            }
          : c
      )
    );
    showNotification('Challenge status updated!', 'info');
  };

  const resetDemoData = () => {
    localStorage.removeItem('akhada_gyms');
    localStorage.removeItem('akhada_pass');
    localStorage.removeItem('akhada_attendance');
    localStorage.removeItem('akhada_prs');
    localStorage.removeItem('akhada_cart');
    localStorage.removeItem('akhada_orders');
    localStorage.removeItem('akhada_challenges');
    localStorage.removeItem('akhada_leaderboard');
    localStorage.removeItem('akhada_persona');

    setGyms(INITIAL_GYMS);
    setMemberPass(INITIAL_MEMBER_PASS);
    setAttendanceHistory(INITIAL_ATTENDANCE_HISTORY);
    setPersonalRecords(INITIAL_PERSONAL_RECORDS);
    setCart([]);
    setChallenges(INITIAL_CHALLENGES);
    setLeaderboard(INITIAL_LEADERBOARD);
    setPersonaRoleState('member');
    showNotification('Demo data reset to fresh state! Owner and Admin initialized to Ansh Dwivedi.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        personaRole,
        currentPersona,
        setPersonaRole,
        activeTab,
        setActiveTab,
        currency,
        toggleCurrency,
        formatPrice,
        gyms,
        selectedGym,
        setSelectedGym,
        memberPass,
        attendanceHistory,
        personalRecords,
        products,
        cart,
        orders,
        challenges,
        leaderboard,
        isCartOpen,
        setIsCartOpen,
        isPassModalOpen,
        setIsPassModalOpen,
        isLogPROpen,
        setIsLogPROpen,
        notification,
        showNotification,
        markTodayCheckIn,
        renewPass,
        logNewPR,
        reviewPR,
        updateGymByOwner,
        verifyGymByAdmin,
        toggleGymStatusByAdmin,
        updateOrderStatusByAdmin,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        checkoutStore,
        checkoutMembershipPass,
        joinChallenge,
        resetDemoData,
        triggerCelebration,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
