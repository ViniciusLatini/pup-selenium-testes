'use client'

import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { useState } from 'react'
import { Bars3Icon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Product', href: '/home' },
    { name: 'Features', href: '/home' },
    { name: 'Marketplace', href: '/home' },
    { name: 'Company', href: '/home' },
  ];

  const features = [
    { name: 'Feature 1', description: 'Description of feature 1', icon: CheckIcon },
    { name: 'Feature 2', description: 'Description of feature 2', icon: CheckIcon },
  ];

  const tiers = [
    {
      id: 'tier1',
      name: 'Basic Plan',
      mostPopular: true,
      description: 'Description of Basic Plan',
      priceMonthly: '$10',
      features: ['Feature 1', 'Feature 2'],
      href: '#',
    },
    {
      id: 'tier2',
      name: 'Pro Plan',
      mostPopular: false,
      description: 'Description of Pro Plan',
      priceMonthly: '$20',
      features: ['Feature 3', 'Feature 4'],
      href: '#',
    },
  ];

  const faqs = [
    { id: 1, question: 'Question 1?', answer: 'Answer to question 1.' },
    { id: 2, question: 'Question 2?', answer: 'Answer to question 2.' },
  ];

  return (
    <div className=" bg-white">
      {/* Header */}
      <header className=" inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
             <h1>logo</h1>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <h1>Logo</h1>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      {/* Hero Section */}
      <main className="isolate">
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:py-32 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="block">Start building with our APIs for free.</span>
              <span className="block text-indigo-600">Take your product to the next level.</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-3xl">
              Trusted by developers from over 200 countries and regions around the world.
            </p>
            <div className="mt-10">
              <a
                href="#"
                className="inline-block bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-semibold text-white hover:bg-indigo-700"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
