'use client';

import { Card } from '@/components/ui/card';
import type { NextPage } from 'next';

const PrivacyPage: NextPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-8">კონფიდენციალურობის პოლიტიკა</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. შესავალი</h2>
              <p className="text-gray-700">
                თქვენი პირადი ინფორმაციის დაცვა ჩვენთვის პრიორიტეტულია. ეს პოლიტიკა განმარტავს, 
                თუ როგორ ვაგროვებთ, ვიყენებთ და ვიცავთ თქვენს პერსონალურ მონაცემებს.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. შეგროვებული ინფორმაცია</h2>
              <p className="text-gray-700">ჩვენ ვაგროვებთ შემდეგ ინფორმაციას:</p>
              <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-700">
                <li>საძიებო მოთხოვნები</li>
                <li>ბრაუზერის ტიპი და ვერსია</li>
                <li>გამოყენების სტატისტიკა</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. ინფორმაციის გამოყენება</h2>
              <p className="text-gray-700">
                შეგროვებულ ინფორმაციას ვიყენებთ შემდეგი მიზნებისთვის:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-700">
                <li>სერვისის გაუმჯობესება</li>
                <li>მომხმარებელთა გამოცდილების ოპტიმიზაცია</li>
                <li>ტექნიკური პრობლემების გადაჭრა</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. პერსონალური ინფორმაცია</h2>
              <p className="text-gray-700">
                ჩვენ არ ვფლობთ თქვენს პერსონალურ ინფორმაციას. 
                საიტის სარგებლობისთვის პერსონალური მონაცემების გაზიარება არ არის საჭირო.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. კონტაქტი</h2>
              <p className="text-gray-700">
                თუ გაქვთ კითხვები ამ პოლიტიკასთან დაკავშირებით, გთხოვთ დაგვიკავშირდეთ ელ-ფოსტაზე: 
                mishikochkhvirkia@gmail.com
              </p>
            </section>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default PrivacyPage;