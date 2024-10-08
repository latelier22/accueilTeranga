'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowRoundForward } from 'react-icons/io';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const fetchMenu = async () => {
  const res = await fetch('https://admin.teranga-resto-galerie.fr/api/menus?populate=*');
  const data = await res.json();
  return data.data;
};

const MenuSection = ({ items }) => (
  <Slider {...settings}>
    {items
      .filter(item => item.attributes.image && item.attributes.image.data)
      .sort((a, b) => (a.attributes.order ?? Infinity) - (b.attributes.order ?? Infinity))
      .map(item => {
        const imageUrl = item.attributes.image.data.attributes.formats?.medium?.url || item.attributes.image.data.attributes.url;
        return (
          <div key={item.id} className='p-4'>
            <div className='bg-white shadow-lg p-4' style={{ height: '400px', width: '300px' }}>
              <div className='overflow-hidden h-2/3'>
                <Image
                  src={`https://admin.teranga-resto-galerie.fr${imageUrl}`}
                  width={300}
                  height={200}
                  alt={item.attributes.title}
                  className='object-cover object-center w-full h-full'
                  style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }}
                />
              </div>
              <div className='pt-[20px] pb-[28px] px-[30px] h-1/3 flex flex-col justify-center'>
                <Link href='/'>
                  <h3 className='font-poppins text-black mb-[14px] text-center'>{item.attributes.title}</h3>
                </Link>
                <div className='text-xl font-poppins font-semibold text-orange text-center'>{item.attributes.price}€</div>
              </div>
            </div>
          </div>
        );
      })}
  </Slider>
);

const Menu = () => {
  const [activeSection, setActiveSection] = useState('plats');
  const [menu, setMenu] = useState({ entrees: [], plats: [], desserts: [], boissons: [] });

  useEffect(() => {
    const fetchData = async () => {
      const menuData = await fetchMenu();
      const categorizedMenu = {
        entrees: menuData.filter(item => item.attributes.category === 'Entrées'),
        plats: menuData.filter(item => item.attributes.category === 'Plats'),
        desserts: menuData.filter(item => item.attributes.category === 'Desserts'),
        boissons: menuData.filter(item => item.attributes.category === 'Boissons'),
      };
      setMenu(categorizedMenu);
    };

    fetchData();
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <section className='relative py-12 xl:py-24 bg-menu' id='menu'>
      <div className='container mx-auto'>
        <motion.div
          variants={fadeIn('left', 0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.2 }}
          className='max-w-[570px] mx-auto text-center xl:text-right'
        >
          <h2 className='mb-3'>Nos spécialités</h2>
          <Link
            href='/menu'
            className='text-green flex justify-center xl:justify-end items-center mb-16'
          >
            Voir toute la carte
            <IoIosArrowRoundForward className='text-3xl' />
          </Link>
        </motion.div>
        <div className='text-center mb-8'>
          <button
            className={`mx-2 py-2 px-4 ${activeSection === 'entrees' ? 'bg-green-500 text-black underline ' : 'bg-gray-200 opacity-60 hover:opacity-100'}`}
            onClick={() => handleSectionChange('entrees')}
          >
            Entrées
          </button>
          <button
            className={`mx-2 py-2 px-4 ${activeSection === 'plats' ? 'bg-green-500 text-black underline hover:opacity-100' : 'bg-gray-200 opacity-60 hover:opacity-100'}`}
            onClick={() => handleSectionChange('plats')}
          >
            Plats
          </button>
          <button
            className={`mx-2 py-2 px-4 ${activeSection === 'desserts' ? 'bg-green-500 text-black underline hover:opacity-100' : 'bg-gray-200 opacity-60 hover:opacity-100'}`}
            onClick={() => handleSectionChange('desserts')}
          >
            Desserts
          </button>
          <button
            className={`mx-2 py-2 px-4 ${activeSection === 'boissons' ? 'bg-green-500 text-black underline hover:opacity-100' : 'bg-gray-200 opacity-60 hover:opacity-100'}`}
            onClick={() => handleSectionChange('boissons')}
          >
            Boissons
          </button>
        </div>
        <motion.div
          variants={fadeIn('up', 0.4)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.2 }}
        >
          {activeSection === 'entrees' && <MenuSection items={menu.entrees} />}
          {activeSection === 'plats' && <MenuSection items={menu.plats} />}
          {activeSection === 'desserts' && <MenuSection items={menu.desserts} />}
          {activeSection === 'boissons' && <MenuSection items={menu.boissons} />}
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;
