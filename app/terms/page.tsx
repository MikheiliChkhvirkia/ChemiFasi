'use client';

import { Card } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-8">მომსახურების პირობები</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. ზოგადი დებულებები</h2>
              <p className="text-gray-700">
                ვებგვერდი chemifasi.ge წარმოადგენს ონლაინ სერვისს, 
                რომელიც მომხმარებლებს საშუალებას აძლევს შეადარონ სხვადასხვა ონლაინ მაღაზიების ფასები. 
                ვებგვერდის გამოყენებით თქვენ ეთანხმებით ამ პირობებს.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. მომსახურების აღწერა</h2>
              <p className="text-gray-700">
                ჩვენი პლატფორმა აგროვებს და აჩვენებს ფასებს სხვადასხვა ონლაინ მაღაზიებიდან. 
                ჩვენ არ ვყიდით პროდუქტებს პირდაპირ და არ ვართ პასუხისმგებელი მესამე მხარის მაღაზიების 
                მიერ მოწოდებულ სერვისზე.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. მომხმარებლის პასუხისმგებლობა</h2>
              <p className="text-gray-700">
                მომხმარებელი პასუხისმგებელია:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-700">
                <li>პლატფორმის სწორად და კანონიერად გამოყენებაზე</li>
                <li>მესამე მხარის უფლებების პატივისცემაზე</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. ინტელექტუალური საკუთრება</h2>
              <p className="text-gray-700">
                ვებგვერდზე განთავსებული მასალა: დიზაინი, ტექსტი და პროგრამული 
                უზრუნველყოფა წარმოადგენს ჩვენს ინტელექტუალურ საკუთრებას და დაცულია საქართველოს 
                კანონმდებლობით.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. პასუხისმგებლობის შეზღუდვა</h2>
              <p className="text-gray-700">
                ჩვენ არ ვართ პასუხისმგებელი:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-700">
                <li>ვებგვერდზე განთავსებული მაღაზიების მიერ მოწოდებული ინფორმაციის სიზუსტეზე</li>
                <li>პროდუქტების ხარისხზე ან მიწოდების პირობებზე</li>
                <li>მესამე მხარის ვებგვერდებზე განთავსებულ შინაარსზე</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. მოქმედი კანონმდებლობა</h2>
              <p className="text-gray-700">
                ეს პირობები რეგულირდება საქართველოს კანონმდებლობით. ნებისმიერი დავა განიხილება 
                საქართველოს მოქმედი კანონმდებლობის შესაბამისად.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </main>
  );
}