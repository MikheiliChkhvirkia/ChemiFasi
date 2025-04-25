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

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    სახელი
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    ელ-ფოსტა
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    თემა
                  </label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    შეტყობინება
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  გაგზავნა
                </Button>
              </form>
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