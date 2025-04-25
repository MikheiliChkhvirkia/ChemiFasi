'use client';

import Link from 'next/link';
import { Github, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">ჩვენს შესახებ</h3>
            <p className="text-sm text-gray-300">
              ჩემი ფასი არ ყიდის პროდუქტებს. ყველა პროდუქტის მონაცემები მოპოვებულია საჯარო წყაროებიდან.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">სამართლებრივი</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white">
                  კონფიდენციალურობის პოლიტიკა
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white">
                  მომსახურების პირობები
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  ჩვენს შესახებ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  კონტაქტი
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">შემქმნელი</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/MikheiliChkhvirkia/MikheilChkhvirkia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/mikheil-chkhvirkia-a1809421a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://www.youtube.com/@MrTypicalCouple"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-300">© 2025 მიხეილ ჩხვირკია</p>
          </div>
        </div>
      </div>
    </footer>
  );
}