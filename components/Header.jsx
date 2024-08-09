'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import { useRouter } from 'next/navigation';


import Nav from './Nav';
import NavMobile from './NavMobile';
import { Button } from './ui/button';

const Header = () => {
  const [active, setActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleReservation = (location) => {
    const url = location === 'petite-terre' ? 'https://petite-terre.teranga-resto-galerie.fr/reservation' : 'https://grande-terre.teranga-resto-galerie.fr/reservation';
    router.push(url);
    setShowModal(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // detect scroll
      setActive(window.scrollY > 100);
    };

    // add event listener
    window.addEventListener('scroll', handleScroll);

    // clear event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        active ? 'bg-black-heavy py-4' : 'bg-none py-8'
      } fixed top-0 w-full z-50 left-0 right-0 transition-all duration-200`}
    >
      <div className='container mx-auto'>
        {/* logo, nav, btn */}
        <div className='flex items-center justify-between'>
          {/* logo */}
          <Link href='/'>
  <Image src='/logo.jpg' width={200} height={75} style={{ width: 'auto', height: 'auto' }} alt='' />
</Link>
          {/* nav */}
          <Nav
            containerStyles='hidden xl:flex gap-x-12 text-white'
            linkStyles='capitalize'
          />
          {/* btn */}
         
            
            <Button variant='orange' size='sm' onClick={() => setShowModal(true)}>Réserver</Button>
          {/* mobile nav */}
          <NavMobile
            containerStyles='xl:hidden'
            iconStyles='text-3xl'
            linkStyles='uppercase'
          />
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <h2 className="text-xl mb-4">Choisissez une option de réservation</h2>
            <div className="flex justify-center space-x-4">
              <Button variant='red' size='sm' onClick={() => handleReservation('petite-terre')}>Petite Terre</Button>
              <Button variant='default' size='sm' onClick={() => handleReservation('grande-terre')}>Grande Terre</Button>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-gray-500 underline"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
