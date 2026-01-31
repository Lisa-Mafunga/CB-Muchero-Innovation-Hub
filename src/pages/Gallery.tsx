import React, { useState } from 'react';
import { X, Calendar, Tag } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  date: string;
  category: 'training' | 'mentorship' | 'workshop' | 'event';
  description: string;
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const images: GalleryImage[] = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1633504885008-f8fed592a06a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tZW4lMjB0ZWNobm9sb2d5JTIwdHJhaW5pbmclMjBjb21wdXRlcnxlbnwxfHx8fDE3Njk4ODkyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Computer Literacy Training Session',
      date: 'January 2026',
      category: 'training',
      description: 'Women learning basic computer skills in our hands-on training workshop.',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1646066490017-c935b1a1eb0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGVtcG93ZXJtZW50JTIwbWVudG9yc2hpcCUyMHNlc3Npb258ZW58MXx8fHwxNzY5ODg5MjAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Mentorship Session',
      date: 'December 2025',
      category: 'mentorship',
      description: 'One-on-one mentorship session connecting experienced professionals with mentees.',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1620831468075-db24ca183258?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2tpbGxzJTIwd29ya3Nob3AlMjBhZnJpY2F8ZW58MXx8fHwxNzY5ODg5MjAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Digital Skills Workshop',
      date: 'November 2025',
      category: 'workshop',
      description: 'Participants engaged in an intensive digital skills workshop covering multiple topics.',
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1634838083208-ce7a36701fe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGNvZGluZyUyMHByb2dyYW1taW5nfGVufDF8fHx8MTc2OTg4OTIwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Coding Workshop',
      date: 'October 2025',
      category: 'workshop',
      description: 'Introduction to coding and programming concepts for beginners.',
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1763298448528-bcdbcd972aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGlubm92YXRpb24lMjBodWJ8ZW58MXx8fHwxNzY5ODg5MjAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Innovation Hub Launch',
      date: 'March 2025',
      category: 'event',
      description: 'Official launch of CB Muchero Innovation Hub with stakeholders and partners.',
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1633504885008-f8fed592a06a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tZW4lMjB0ZWNobm9sb2d5JTIwdHJhaW5pbmclMjBjb21wdXRlcnxlbnwxfHx8fDE3Njk4ODkyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Smartphone Training',
      date: 'September 2025',
      category: 'training',
      description: 'Teaching smartphone basics and mobile applications to community members.',
    },
  ];

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'training', label: 'Training' },
    { value: 'mentorship', label: 'Mentorship' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'event', label: 'Events' },
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-700 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-center">Event Gallery</h1>
          <p className="text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto text-center">
            Explore photos from our training sessions, workshops, mentorship programs, and community
            events.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <Card
                key={image.id}
                className="overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative aspect-square">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                      <p className="text-sm opacity-90">{image.date}</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className={getCategoryColor(image.category)}>
                      {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                    </Badge>
                  </div>
                </div>
              </Card>
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
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full max-h-[60vh] object-contain bg-gray-100"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Badge className={getCategoryColor(selectedImage.category)}>
                  {selectedImage.category.charAt(0).toUpperCase() +
                    selectedImage.category.slice(1)}
                </Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-1" />
                  {selectedImage.date}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedImage.title}</h2>
              <p className="text-gray-600">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Info */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Gallery Updates Through Odoo Integration
          </h2>
          <p className="text-lg mb-8 text-purple-100">
            Our gallery is automatically updated through our Odoo ERP system, ensuring you always
            see the latest photos from our events and training sessions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
