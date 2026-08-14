import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  initializeRevenueCat,
  getCustomerInfo,
  purchasePackage,
  restorePurchases as restorePurchasesService,
  isPremiumUser,
  getOfferings,
  ENTITLEMENT_ID,
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
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  isPremium: false,
  isLoading: true,
  offerings: null,
  purchase: async () => false,
  restorePurchases: async () => false,
  refreshStatus: async () => {},
});

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SubscriptionState>({
    isPremium: false,
    isLoading: true,
    offerings: null,
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
    async function init() {
      try {
        await initializeRevenueCat();
        const [customerInfo, currentOfferings] = await Promise.all([
          getCustomerInfo(),
          getOfferings(),
        ]);

        setState({
          isPremium: customerInfo ? isPremiumUser(customerInfo) : false,
          isLoading: false,
          offerings: currentOfferings,
        });
      } catch (e) {
        console.error('Error initializing RevenueCat:', e);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    }
    init();
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

  return (
    <SubscriptionContext.Provider
      value={{
        ...state,
        purchase,
        restorePurchases: restorePurchasesHandler,
        refreshStatus,
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
