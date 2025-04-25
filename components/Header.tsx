'use client';

import { useState, useEffect } from 'react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeaderProps {
  isScrolled?: boolean;
  onReset?: () => void;
}

export function Header({ isScrolled = false, onReset }: HeaderProps) {
  return (
    <div className="bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-12 flex items-center justify-between">
          <Logo isScrolled={isScrolled} onReset={onReset} />
          <div className="flex items-center gap-4">
            <Link href="#" className="text-white/70 hover:text-white text-sm">
              შესვლა
            </Link>
            <Button variant="outline" size="sm" className="h-7 bg-transparent text-white border-white hover:bg-white hover:text-black">
              რეგისტრაცია
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}