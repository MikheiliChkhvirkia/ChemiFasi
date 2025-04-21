'use client';

import { useEffect, useState, useCallback } from 'react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface GeolocationState {
  location: Coordinates | null;
  error: string | null;
  loading: boolean;
  permissionState: PermissionState;
  getLocation: () => void;
}

export function useGeolocation(): GeolocationState {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [permissionState, setPermissionState] = useState<PermissionState>('prompt');

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      setLoading(false);
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };

        console.log('[Geolocation] Coordinates:', coords);
        setLocation(coords);
        setError(null);
        setLoading(false);
      },
      (err) => {
        console.error('[Geolocation] Error:', err);
        if (err.code === 1) { // PERMISSION_DENIED
          setError('Geolocation permission denied');
          setPermissionState('denied');
          setLocation(null);
        } else {
          setError(err.message);
          // Only set fallback location for non-permission errors
          setLocation({
            latitude: 41.716667, // Tbilisi fallback
            longitude: 44.783333,
          });
        }
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  useEffect(() => {
    // Check permission state
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' as PermissionName }).then((res) => {
        setPermissionState(res.state);
        res.onchange = () => setPermissionState(res.state);
      }).catch(() => {
        setPermissionState('prompt');
      });
    }
  }, []);

  return {
    location,
    error,
    loading,
    permissionState,
    getLocation,
  };
}