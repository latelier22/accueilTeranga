'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import { Button } from './ui/button';
import { Link as ScollLink}  from 'react-scroll';
import Link from 'next/link';

const heroContent = {
  left: {
    title: "NOUVEAU",
    description: "Nouveau, en petite terre à Pamandzi, Teranga propose ses plats pour vous faire découvrir les saveurs de l'Afrique",
    buttonText: "SITE PETITE-TERRE",
    imageUrl: '/reservation/photo-pt1.png',
  },
  right: {
    title: "TERANGA GRANDE-TERRE, TOUJOURS Là!",
    description: "Découvrez nos nouvelles spécialités en grande terre, une expérience culinaire unique vous attend",
    buttonText: "SITE GRANDE-TERRE",
    imageUrl: '/reservation/photo-gt1.png',
  }
};

const Hero = ({ resto, gauche = true }) => {
  const content = gauche ? heroContent.left : heroContent.right;
  const restoLink = resto === "petite-terre" ? 'https://petite-terre.teranga-resto-galerie.fr' : 'https://grande-terre.teranga-resto-galerie.fr';

  return (
    <section
      className={`${gauche ? 'bg-hero' : 'bg-hero2'} bg-no-repeat relative xl:bg-cover xl:h-[1098px] py-40 pb-32 xl:py-0`}
      id={resto}
    >
      <Link href={restoLink}>
        <div className='container mx-auto'>
          {/* text & img */}
          <div className={`flex items-center xl:h-[960px] ${gauche ? '' : 'flex-row-reverse'}`}>
            {/* text */}
            <div className={`w-full xl:max-w-[460px] text-center xl:text-left ${gauche ? '' : 'xl:text-right'}`}>
              <motion.h1
                variants={fadeIn('down', 0.2)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: false, amount: 0.4 }}
                className='text-white mb-7'
              >
                {content.title} <br />
              </motion.h1>
              <motion.p
                variants={fadeIn('down', 0.4)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: false, amount: 0.4 }}
                className='text-white font-semibold mb-7'
              >
                par <span className='text-orange'>Teranga</span>
              </motion.p>
              <motion.p
                variants={fadeIn('down', 0.6)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: false, amount: 0.4 }}
                className='text-white mb-12 max-w-lg mx-auto xl:max-w-none xl:mx-0'
              >
                {content.description}
              </motion.p>
              <motion.div
                variants={fadeIn('down', 0.8)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: false, amount: 0.4 }}
              >
                <Button>{content.buttonText}</Button>
              </motion.div>
            </div>
            {/* image */}
            <motion.div
              variants={fadeIn('up', 0.8)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.1 }}
              className={`hidden xl:flex ${gauche ? 'xl:absolute xl:top-[200px] xl:right-0' : 'xl:absolute xl:top-[200px] xl:left-0'}`}
              style={{ width: 'auto', height: 'auto' }}
            >
              <Image
                src={content.imageUrl}
                width={756}
                height={682}
                alt=''
                style={{ width: 'auto', height: 'auto' }}
              />
            </motion.div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default Hero;
