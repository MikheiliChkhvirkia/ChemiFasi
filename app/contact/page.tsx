'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-8">კონტაქტი</h1>
          
          <div className="space-y-6">
            <section>
              <p className="text-gray-700 mb-6">
                გაქვთ კითხვები ან წინადადებები? დაგვიკავშირდით და ჩვენი გუნდი სიამოვნებით დაგეხმარებათ.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">სხვა საკონტაქტო ინფორმაცია</h2>
              <div className="space-y-2 text-gray-700">
                <p>ელ-ფოსტა: mishikochkhvirkia@gmail.com</p>
                <p>სამუშაო საათები: ორშაბათი-პარასკევი, 10:00-22:00</p>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </main>
  );
}