import Purchases, { PurchasesOffering, CustomerInfo } from 'react-native-purchases';
import { Platform } from 'react-native';

const REVENUECAT_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_API_KEY || '';

export const ENTITLEMENT_ID = 'premium';

export async function initializeRevenueCat(): Promise<void> {
  if (!REVENUECAT_API_KEY) {
    console.warn('RevenueCat API key not configured');
    return;
  }

  Purchases.configure({
    apiKey: REVENUECAT_API_KEY,
  });

  if (__DEV__) {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
  }
}

export async function getOfferings(): Promise<PurchasesOffering | null> {
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current;
  } catch (e) {
    console.error('Error getting offerings:', e);
    return null;
  }
}

export async function purchasePackage(pkg: any): Promise<CustomerInfo | null> {
  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    return customerInfo;
  } catch (e: any) {
    if (!e.userCancelled) {
      console.error('Error purchasing:', e);
    }
    return null;
  }
}

export async function restorePurchases(): Promise<CustomerInfo | null> {
  try {
    const customerInfo = await Purchases.restorePurchases();
    return customerInfo;
  } catch (e) {
    console.error('Error restoring purchases:', e);
    return null;
  }
}

export async function getCustomerInfo(): Promise<CustomerInfo | null> {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo;
  } catch (e) {
    console.error('Error getting customer info:', e);
    return null;
  }
}

export function isPremiumUser(customerInfo: CustomerInfo): boolean {
  return customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
}
