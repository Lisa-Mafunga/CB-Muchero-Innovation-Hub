import React, { useState } from 'react';
import { X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { galleryImages, GalleryImage } from '@/data/galleryImages';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [images] = useState<GalleryImage[]>(galleryImages);

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'training', label: 'Training' },
    { value: 'mentorship', label: 'Mentorship' },
    { value: 'feature', label: 'Feature' },
    { value: 'event', label: 'Events' },
    { value: 'awards', label: 'Awards' },
  ];

  const filteredImages =
    selectedCategory === 'all'
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'training':
        return 'bg-purple-100 text-purple-700';
      case 'mentorship':
        return 'bg-blue-100 text-blue-700';
      case 'workshop':
        return 'bg-green-100 text-green-700';
      case 'event':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1]);
    } else {
      setSelectedImage(filteredImages[filteredImages.length - 1]);
    }
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1]);
    } else {
      setSelectedImage(filteredImages[0]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="text-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-center">Gallery</h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto text-center">
           Explore our journey of empowerment and innovation! Dive into vibrant moments captured through our Training, Mentorship, Events, Features, and Awards. Witness the impact we make in the community!
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 sticky top-16 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.value)}
                className={
                  selectedCategory === category.value
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : ''
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow rounded-lg"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative aspect-[3/4]">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-2 w-full">
                      <p className="text-white text-xs font-semibold truncate">{image.title}</p>
                      <Badge className={`${getCategoryColor(image.category)} text-xs mt-1`}>
                        {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Arrow */}
            <button
              onClick={handlePrevImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-r-lg p-2 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} className="text-gray-800" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={handleNextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-l-lg p-2 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={32} className="text-gray-800" />
            </button>

            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors z-20"
            >
              <X size={24} />
            </button>

            {/* Image Content */}
            <div className="w-full overflow-y-auto">
              <div className="relative bg-gray-100">
                <img
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  className="w-full max-h-[60vh] object-contain"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Badge className={getCategoryColor(selectedImage.category)}>
                    {selectedImage.category.charAt(0).toUpperCase() +
                      selectedImage.category.slice(1)}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={16} className="mr-1" />
                    {new Date(selectedImage.date).toLocaleDateString()}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedImage.title}</h2>
                {selectedImage.description && (
                  <p className="text-gray-700 text-sm leading-relaxed">{selectedImage.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Share Your Experience</h2>
          <p className="text-lg text-purple-100 mb-6">
            Have photos from our events or training sessions? Contact us to add your images to the gallery!
          </p>
          <Button 
            className="bg-white text-purple-600 hover:bg-gray-100"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
