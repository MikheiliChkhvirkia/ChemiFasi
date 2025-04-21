'use client';

import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, AlertCircle, Loader2 } from 'lucide-react';
import { useGeolocation } from '@/lib/hooks/useGeolocation';

interface LocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (location: { latitude: number; longitude: number }) => void;
  storeName: string;
}

const LocationDialog = ({ isOpen, onClose, onAccept, storeName }: LocationDialogProps) => {
  const { location, error, loading, permissionState, getLocation } = useGeolocation();

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      onAccept(location);
    }
  }, [location, onAccept]);

  const handleRequestLocation = () => {
    if (permissionState === 'denied') {
      // Open browser settings if permission is denied
      window.open('chrome://settings/content/location', '_blank');
      return;
    }
    getLocation();
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="py-8 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-black" />
          <p className="mt-4 text-sm text-gray-600">
            მიმდინარეობს მდებარეობის განსაზღვრა...
          </p>
        </div>
      );
    }

    if (error || permissionState === 'denied') {
      return (
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-900">
                მდებარეობის გაზიარება ბლოკირებულია
              </p>
              <p className="mt-1 text-sm text-red-700">
                გთხოვთ დაუშვათ მდებარეობის გაზიარება ბრაუზერის პარამეტრებში
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={onClose}>
              დახურვა
            </Button>
            {permissionState === 'denied' && (
              <Button onClick={handleRequestLocation}>
                ბრაუზერის პარამეტრები
              </Button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4 py-4">
        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900">
              {storeName} გთხოვთ მდებარეობის გაზიარებას
            </p>
            <p className="mt-1 text-sm text-blue-700">
              მდებარეობა გამოიყენება მაღაზიამდე მანძილის დასათვლელად და უახლოესი ფილიალების საჩვენებლად
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            უარი
          </Button>
          <Button onClick={handleRequestLocation}>
            დაშვება
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            მდებარეობის გაზიარება
          </DialogTitle>
          <DialogDescription>
            გთხოვთ დაუშვათ მდებარეობის გაზიარება უკეთესი მომსახურებისთვის
          </DialogDescription>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default LocationDialog;