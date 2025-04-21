export async function getBrowserGeolocationPermission(): Promise<PermissionState> {
  try {
    if (!navigator.permissions) return 'prompt';
    const permission = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
    return permission.state; // 'granted' | 'denied' | 'prompt'
  } catch {
    return 'prompt';
  }
}
