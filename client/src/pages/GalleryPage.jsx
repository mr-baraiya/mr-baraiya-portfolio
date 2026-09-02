import React from 'react';
import Gallery from '../components/Gallery';

export const GalleryPage = ({ galleryItems }) => {
  return (
    <div className="pt-16 min-h-screen bg-[#050508] text-[#F8FAFC]">
      <Gallery items={galleryItems} />
    </div>
  );
};

export default GalleryPage;
