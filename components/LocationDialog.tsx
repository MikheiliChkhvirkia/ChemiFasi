'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, AlertCircle, Loader2 } from 'lucide-react';

interface LocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (location: { latitude: number; longitude: number }) => void;
  storeName: string;
}

export function LocationDialog({ isOpen, onClose, onAccept, storeName }: LocationDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if (isOpen) {
      checkPermissionAndGetLocation();
    }
  }, [isOpen]);

  const checkPermissionAndGetLocation = async () => {
    if (!navigator.permissions || !navigator.geolocation) {
      setError('თქვენს ბრაუზერს არ აქვს გეოლოკაციის მხარდაჭერა');
      return;
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' as PermissionName });

      if (permission.state === 'granted') {
        handleGetLocation();
      } else if (permission.state === 'prompt') {
        handleGetLocation();
      } else {
        setError('გთხოვთ დაუშვათ მდებარეობის გაზიარება ბრაუზერის პარამეტრებიდან');
        onClose(); // auto close if denied
      }

      // Listen for permission changes in real-time
      permission.onchange = () => {
        if (permission.state === 'denied') {
          setError('თქვენ არ გაქვთ დაშვება მდებარეობის მისაღებად');
          onClose();
        }
      };
    } catch (e) {
      handleGetLocation(); // fallback if permission query fails
    }
  };

  const handleGetLocation = () => {
    setError('');
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
        setIsLoading(false);
        onAccept({ latitude, longitude }); // Auto accept
        onClose(); // Auto close
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('მდებარეობის დაშვება უარყოფილია');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('მდებარეობა მიუწვდომელია');
            break;
          case error.TIMEOUT:
            setError('მდებარეობის მოთხოვნა დაყოვნდა');
            break;
          default:
            setError('მდებარეობის მიღება ვერ მოხერხდა');
        }
        setIsLoading(false);
        onClose(); // close even on error
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>მდებარეობის მოთხოვნა</DialogTitle>
          <DialogDescription className="pt-2 text-sm text-gray-600">
            მდებარეობა გამოიყენება მხოლოდ მანძილის დასათვლელად და არ ინახება.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            <p className="mt-2 text-sm text-gray-600">მიმდინარეობს მდებარეობის განსაზღვრა...</p>
          </div>
        ) : error ? (
          <div className="mt-4 text-sm text-red-600 bg-red-100 rounded p-2">{error}</div>
        ) : (
          <div className="mt-4 text-sm text-gray-700">
            <MapPin className="inline-block mr-2" />
            გთხოვთ დაუშვათ მდებარეობის გაზიარება {storeName}-ისთვის
          </div>
        )}

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>დახურვა</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
