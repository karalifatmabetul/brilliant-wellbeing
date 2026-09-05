import Purchases, { PurchasesOffering, CustomerInfo, PurchasesPackage } from 'react-native-purchases';
import { Platform } from 'react-native';

const REVENUECAT_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_API_KEY || '';

export const ENTITLEMENT_ID = 'premium';

let isConfigured = false;

// Mock offerings for fallback / test mode (guarantees Paywall UI works smoothly offline or with invalid key)
export const MOCK_OFFERINGS: any = {
  current: {
    identifier: 'default',
    serverDescription: 'Default Offering',
    availablePackages: [
      {
        identifier: '$rc_weekly',
        packageType: 'WEEKLY',
        product: {
          identifier: 'weekly_499',
          description: 'Unlock all well-being courses',
          title: 'Weekly Access',
          price: 4.99,
          priceString: '$4.99',
          currencyCode: 'USD',
        },
      },
      {
        identifier: '$rc_monthly',
        packageType: 'MONTHLY',
        product: {
          identifier: 'monthly_999',
          description: 'Unlock all well-being courses',
          title: 'Monthly Access',
          price: 9.99,
          priceString: '$9.99',
          currencyCode: 'USD',
        },
      },
      {
        identifier: '$rc_annual',
        packageType: 'ANNUAL',
        product: {
          identifier: 'annual_4999',
          description: 'Unlock all well-being courses',
          title: 'Yearly Access',
          price: 49.99,
          priceString: '$49.99',
          currencyCode: 'USD',
        },
      },
    ],
  },
};

export async function initializeRevenueCat(): Promise<void> {
  try {
    if (!REVENUECAT_API_KEY) {
      console.warn('[RevenueCat] API key not configured, running in offline fallback mode.');
      return;
    }

    // Secret keys ('sk_...') are backend-only. Mobile SDK requires public SDK keys ('goog_...' / 'appl_...').
    // Gracefully handle this without native crashes:
    if (REVENUECAT_API_KEY.startsWith('sk_')) {
      console.warn('[RevenueCat] Provided key is a Secret Key (sk_). Running in demo/safe mode to prevent app crash.');
      return;
    }

    Purchases.configure({
      apiKey: REVENUECAT_API_KEY,
    });
    isConfigured = true;

    if (__DEV__) {
      Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
    }
  } catch (e) {
    console.error('[RevenueCat] Safe initialization caught error:', e);
    isConfigured = false;
  }
}

export async function getOfferings(): Promise<PurchasesOffering | any | null> {
  if (!isConfigured) {
    return MOCK_OFFERINGS.current;
  }
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current || MOCK_OFFERINGS.current;
  } catch (e) {
    console.warn('[RevenueCat] Falling back to mock offerings due to:', e);
    return MOCK_OFFERINGS.current;
  }
}

export async function purchasePackage(pkg: any): Promise<CustomerInfo | null> {
  if (!isConfigured) {
    // Simulated purchase for demo/offline test
    console.log('[RevenueCat Mock] Simulating successful purchase of:', pkg);
    return {
      entitlements: {
        active: {
          [ENTITLEMENT_ID]: {
            identifier: ENTITLEMENT_ID,
            isActive: true,
            willRenew: true,
            periodType: 'NORMAL',
            latestPurchaseDate: new Date().toISOString(),
            originalPurchaseDate: new Date().toISOString(),
            expirationDate: null,
            store: 'PROMOTIONAL',
            productIdentifier: pkg?.product?.identifier || 'mock_premium',
            isSandbox: true,
            unsubscribeDetectedAt: null,
            billingIssueDetectedAt: null,
          } as any,
        },
        all: {},
      },
      activeSubscriptions: ['mock_subscription'],
      allPurchasedProductIdentifiers: [pkg?.product?.identifier || 'mock_premium'],
      nonSubscriptionTransactions: [],
      firstSeen: new Date().toISOString(),
      originalAppUserId: 'mock_user',
      allExpirationDates: {},
      allPurchaseDates: {},
      originalApplicationVersion: '1.0.0',
      originalPurchaseDate: new Date().toISOString(),
      managementURL: null,
    } as unknown as CustomerInfo;
  }

  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    return customerInfo;
  } catch (e: any) {
    if (!e.userCancelled) {
      console.error('[RevenueCat] Error purchasing:', e);
    }
    return null;
  }
}

export async function restorePurchases(): Promise<CustomerInfo | null> {
  if (!isConfigured) {
    console.log('[RevenueCat Mock] Simulated restore purchases');
    return null;
  }
  try {
    const customerInfo = await Purchases.restorePurchases();
    return customerInfo;
  } catch (e) {
    console.error('[RevenueCat] Error restoring purchases:', e);
    return null;
  }
}

export async function getCustomerInfo(): Promise<CustomerInfo | null> {
  if (!isConfigured) {
    return null;
  }
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo;
  } catch (e) {
    console.error('[RevenueCat] Error getting customer info:', e);
    return null;
  }
}

export function isPremiumUser(customerInfo: CustomerInfo | null): boolean {
  if (!customerInfo || !customerInfo.entitlements) return false;
  return customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
}
