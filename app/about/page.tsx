'use client';

import { Card } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-8">ჩვენ შესახებ</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">ჩვენი მისია</h2>
              <p className="text-gray-700">
                chemifasi.ge შეიქმნა იმისთვის, რომ დაეხმაროს მომხმარებლებს მარტივად იპოვონ საუკეთესო 
                ფასები ქართულ ონლაინ მაღაზიებში. ჩვენი მიზანია გავამარტივოთ შოპინგის პროცესი და 
                დავეხმაროთ მომხმარებლებს დაზოგონ დრო და ფული.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">როგორ ვმუშაობთ</h2>
              <p className="text-gray-700">
                ჩვენი პლატფორმა ავტომატურად აგროვებს და აახლებს ფასებს სხვადასხვა ონლაინ 
                მაღაზიებიდან. ჩვენ ვიყენებთ თანამედროვე ტექნოლოგიებს.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">უპირატესობები</h2>
              <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-700">
                <li>რეალურ დროში განახლებული ფასები</li>
                <li>მარტივი და სწრაფი ძიება</li>
                <li>სანდო და გამჭვირვალე სერვისი</li>
                <li>მომხმარებელზე ორიენტირებული ინტერფეისი</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">ჩვენი გუნდი</h2>
              <p className="text-gray-700">
                ჩვენი გუნდი მუდმივად მუშაობს სერვისის გაუმჯობესებაზე. 
                ჩვენ ვალდებულები ვართ შევქმნათ საუკეთესო გამოცდილება თქვენთვის.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </main>
  );
}