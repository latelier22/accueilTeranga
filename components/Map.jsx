'use client';

import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

// leaflet css
import 'leaflet/dist/leaflet.css';

import { motion } from 'framer-motion';
import { fadeIn } from '../variants';

const markers = [
  {
    position: [-12.780202974724954, 45.231479612905204],
    title: 'Location 1',
    sutitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    image: '/map/1.png',
  },
  {
    position: [-12.784863264235, 45.27940228968275],
    title: 'Location 2',
    sutitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    image: '/map/2.png',
  },
 
];

const customIcon = new Icon({
  iconUrl: '/pin-solid.svg',
  iconSize: [40, 40],
});

const Map = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });

  return (
    <motion.section
      variants={fadeIn('up', 0.2)}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.2 }}
      className='relative xl:after:w-full xl:after:h-[240px] xl:after:bg-gradient-to-b xl:after:from-white xl:after:via-white/80 xl:after:to-white/20 xl:after:absolute xl:after:top-0 xl:after:z-20'
      id='contact'
    >
      <MapContainer
        center={[-12.782610266241328, 45.25364490589123]}
        zoom={isMobile ? 12.5 : 14.5}
        className={`${isMobile ? 'h-[300px]' : 'h-[900px]'} z-10`}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        />
        {/* markers */}
        {markers.map((marker, index) => {
          return (
            <Marker key={index} position={marker.position} icon={customIcon}>
              <Popup>
                <div className='flex gap-x-[30px]'>
                  <div className='flex-1'>
                    <h3>{marker.title}</h3>
                    <p className='leading-snug'>{marker.sutitle}</p>
                  </div>
                  <div className='flex-1'>
                    <Image src={marker.image} width={130} height={160} alt='' />
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </motion.section>
  );
};

export default Map;
