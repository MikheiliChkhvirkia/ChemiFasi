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
                <li>მოწყობილობის ინფორმაცია</li>
                <li>IP მისამართი</li>
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
                <li>უსაფრთხოების უზრუნველყოფა</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. ქუქი-ფაილები</h2>
              <p className="text-gray-700">
                ჩვენ ვიყენებთ ქუქი-ფაილებს სერვისის გასაუმჯობესებლად. თქვენ შეგიძლიათ გამორთოთ 
                ქუქი-ფაილები თქვენი ბრაუზერის პარამეტრებში, თუმცა ამან შეიძლება გავლენა იქონიოს 
                ვებგვერდის ფუნქციონირებაზე.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. ინფორმაციის გაზიარება</h2>
              <p className="text-gray-700">
                ჩვენ არ ვყიდით და არ ვაზიარებთ თქვენს პერსონალურ ინფორმაციას მესამე მხარეებთან, 
                გარდა კანონით გათვალისწინებული შემთხვევებისა.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. უსაფრთხოება</h2>
              <p className="text-gray-700">
                ვიყენებთ შესაბამის ტექნიკურ და ორგანიზაციულ ზომებს თქვენი ინფორმაციის დასაცავად 
                არაავტორიზებული წვდომის, გამჟღავნების, შეცვლის ან განადგურებისგან.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. თქვენი უფლებები</h2>
              <p className="text-gray-700">
                თქვენ გაქვთ უფლება:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-700">
                <li>მოითხოვოთ წვდომა თქვენს პერსონალურ მონაცემებზე</li>
                <li>მოითხოვოთ თქვენი მონაცემების შესწორება ან წაშლა</li>
                <li>შეზღუდოთ თქვენი მონაცემების დამუშავება</li>
                <li>გააპროტესტოთ თქვენი მონაცემების დამუშავება</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. კონტაქტი</h2>
              <p className="text-gray-700">
                თუ გაქვთ კითხვები ამ პოლიტიკასთან დაკავშირებით, გთხოვთ დაგვიკავშირდეთ ელ-ფოსტაზე: 
                privacy@chemifasi.ge
              </p>
            </section>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default PrivacyPage;