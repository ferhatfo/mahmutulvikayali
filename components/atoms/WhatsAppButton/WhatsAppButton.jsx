'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function WhatsAppButton() {
  return (
    <Link
      href="https://api.whatsapp.com/send?phone=+905550520212 &text=Merhaba bilgi almak istiyorum"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 sm:bottom-9 sm:right-10 z-50 bg-white p-3 rounded-full shadow-[0px_8px_20px_rgba(51,97,89,0.4)]"
    >
      <Image
        src="/images/svg/Whatsup.svg"
        alt="WhatsApp"
        width={28}
        height={28}
        className="hover:scale-110 transition-transform duration-200"
      />
    </Link>
  );
}
