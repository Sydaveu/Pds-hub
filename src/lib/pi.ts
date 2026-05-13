declare global {
  interface Window {
    Pi: PiSDK;
  }
}

interface PiSDK {
  init: (config: { version: string }) => Promise<{ sandbox?: boolean }>;
  authenticate: (
    scopes: string[],
    onIncompletePaymentFound?: (payment: unknown) => void
  ) => Promise<{
    accessToken: string;
    user: { username: string; uid: string };
  }>;
}

export interface PiUser {
  uid: string;
  username: string;
  accessToken: string;
}

export function isPiAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.Pi !== 'undefined';
}

export async function initPi(): Promise<boolean> {
  if (!isPiAvailable()) return false;
  try {
    await window.Pi.init({ version: '2.0' });
    return true;
  } catch {
    return false;
  }
}

export async function authenticatePi(): Promise<PiUser | null> {
  if (!isPiAvailable()) return null;
  try {
    const result = await window.Pi.authenticate(['username']);
    return {
      uid: result.user.uid,
      username: result.user.username,
      accessToken: result.accessToken,
    };
  } catch (err: unknown) {
    console.error('Pi auth failed:', err);
    return null;
  }
}

export async function validatePiToken(accessToken: string): Promise<boolean> {
  try {
    const res = await fetch('https://api.minepi.com/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}
