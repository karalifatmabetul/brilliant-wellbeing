import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  initializeRevenueCat,
  getCustomerInfo,
  purchasePackage,
  restorePurchases as restorePurchasesService,
  isPremiumUser,
  getOfferings,
  MOCK_OFFERINGS,
} from '../services/revenueCat';

interface SubscriptionState {
  isPremium: boolean;
  isLoading: boolean;
  offerings: any | null;
}

interface SubscriptionContextType extends SubscriptionState {
  purchase: (pkg: any) => Promise<boolean>;
  restorePurchases: () => Promise<boolean>;
  refreshStatus: () => Promise<void>;
  toggleDevPremium: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  isPremium: false,
  isLoading: true,
  offerings: null,
  purchase: async () => false,
  restorePurchases: async () => false,
  refreshStatus: async () => {},
  toggleDevPremium: () => {},
});

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SubscriptionState>({
    isPremium: false,
    isLoading: true,
    offerings: MOCK_OFFERINGS.current,
  });

  const refreshStatus = useCallback(async () => {
    try {
      const customerInfo = await getCustomerInfo();
      if (customerInfo) {
        setState(prev => ({
          ...prev,
          isPremium: isPremiumUser(customerInfo),
          isLoading: false,
        }));
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (e) {
      console.error('Error refreshing subscription status:', e);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function init() {
      try {
        await initializeRevenueCat();
        const [customerInfo, currentOfferings] = await Promise.allSettled([
          getCustomerInfo(),
          getOfferings(),
        ]);

        if (isMounted) {
          const info = customerInfo.status === 'fulfilled' ? customerInfo.value : null;
          const offs = currentOfferings.status === 'fulfilled' ? currentOfferings.value : MOCK_OFFERINGS.current;

          setState({
            isPremium: info ? isPremiumUser(info) : false,
            isLoading: false,
            offerings: offs || MOCK_OFFERINGS.current,
          });
        }
      } catch (e) {
        console.error('Safe initialization caught error in SubscriptionProvider:', e);
        if (isMounted) {
          setState(prev => ({
            ...prev,
            isLoading: false,
            offerings: MOCK_OFFERINGS.current,
          }));
        }
      }
    }
    init();

    return () => {
      isMounted = false;
    };
  }, []);

  const purchase = useCallback(async (pkg: any): Promise<boolean> => {
    try {
      const customerInfo = await purchasePackage(pkg);
      if (customerInfo && isPremiumUser(customerInfo)) {
        setState(prev => ({ ...prev, isPremium: true }));
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }, []);

  const restorePurchasesHandler = useCallback(async (): Promise<boolean> => {
    try {
      const customerInfo = await restorePurchasesService();
      if (customerInfo && isPremiumUser(customerInfo)) {
        setState(prev => ({ ...prev, isPremium: true }));
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }, []);

  const toggleDevPremium = useCallback(() => {
    setState(prev => ({ ...prev, isPremium: !prev.isPremium }));
  }, []);

  return (
    <SubscriptionContext.Provider
      value={{
        ...state,
        purchase,
        restorePurchases: restorePurchasesHandler,
        refreshStatus,
        toggleDevPremium,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
