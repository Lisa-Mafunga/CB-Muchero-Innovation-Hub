import React, { useState } from 'react';
import { Mic, Play, Calendar, MessageSquare, Star, ThumbsUp } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface PodcastReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
}

interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  audioUrl: string;
  thumbnail: string;
  reviews: PodcastReview[];
}

const Podcasts: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  // Mock podcast episodes data
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([
    {
      id: '1',
      title: 'Digital Empowerment: Breaking Barriers in Tech',
      description:
        'Join us as we discuss how women are breaking barriers in technology and creating opportunities for themselves and their communities.',
      date: 'January 15, 2026',
      duration: '45 min',
      audioUrl: '#',
      thumbnail:
        'https://images.unsplash.com/photo-1627667050609-d4ba6483a368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwcmVjb3JkaW5nJTIwc3R1ZGlvJTIwbWljcm9waG9uZXxlbnwxfHx8fDE3Njk3ODk1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      reviews: [
        {
          id: '1',
          userName: 'Nyasha T.',
          rating: 5,
          comment:
            'This episode was incredibly inspiring! The insights on digital skills were practical and actionable.',
          date: 'January 16, 2026',
          likes: 12,
        },
        {
          id: '2',
          userName: 'Grace M.',
          rating: 5,
          comment:
            'Loved the discussion about AI in Ministry. As a church leader, this was eye-opening!',
          date: 'January 17, 2026',
          likes: 8,
        },
      ],
    },
    {
      id: '2',
      title: 'AI and the Future of Work in Africa',
      description:
        'Exploring how artificial intelligence is reshaping the workplace and what it means for African professionals.',
      date: 'January 1, 2026',
      duration: '52 min',
      audioUrl: '#',
      thumbnail:
        'https://images.unsplash.com/photo-1627667050609-d4ba6483a368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwcmVjb3JkaW5nJTIwc3R1ZGlvJTIwbWljcm9waG9uZXxlbnwxfHx8fDE3Njk3ODk1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      reviews: [
        {
          id: '3',
          userName: 'Kudzai P.',
          rating: 4,
          comment:
            'Great content! Would love to hear more about practical applications of AI in small businesses.',
          date: 'January 3, 2026',
          likes: 5,
        },
      ],
    },
    {
      id: '3',
      title: 'From Zero to Digital Entrepreneur',
      description:
        'Success stories of women who transformed their lives through digital entrepreneurship and what we can learn from them.',
      date: 'December 15, 2025',
      duration: '48 min',
      audioUrl: '#',
      thumbnail:
        'https://images.unsplash.com/photo-1627667050609-d4ba6483a368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwcmVjb3JkaW5nJTIwc3R1ZGlvJTIwbWljcm9waG9uZXxlbnwxfHx8fDE3Njk3ODk1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      reviews: [],
    },
  ]);

  const handleSubmitReview = (episodeId: string) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to leave a review');
      return;
    }

    if (!reviewText.trim()) {
      toast.error('Please write a review');
      return;
    }

    const newReview: PodcastReview = {
      id: Date.now().toString(),
      userName: user?.name || 'Anonymous',
      rating,
      comment: reviewText,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      likes: 0,
    };

    setEpisodes(
      episodes.map((ep) =>
        ep.id === episodeId ? { ...ep, reviews: [...ep.reviews, newReview] } : ep
      )
    );

    setReviewText('');
    setRating(5);
    setSelectedEpisode(null);
    toast.success('Review submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-700 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <Mic size={48} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-center">
            CB Muchero Innovation Hub Podcast
          </h1>
          <p className="text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto text-center">
            Join us twice a month for inspiring conversations about digital empowerment, technology,
            and women in tech.
          </p>
        </div>
      </section>

      {/* Podcast Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <img
                  src="https://images.unsplash.com/photo-1627667050609-d4ba6483a368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwcmVjb3JkaW5nJTIwc3R1ZGlvJTIwbWljcm9waG9uZXxlbnwxfHx8fDE3Njk3ODk1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Podcast"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="md:col-span-2 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About Our Podcast</h2>
                <p className="text-gray-600 mb-4">
                  Our podcast brings you inspiring stories, practical tips, and expert insights on
                  digital empowerment, technology trends, and career development. Released twice a
                  month, each episode features conversations with industry leaders, successful
                  entrepreneurs, and women making a difference in tech.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Frequency</p>
                    <p className="font-semibold text-gray-900">Twice Monthly</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Average Duration</p>
                    <p className="font-semibold text-gray-900">45-50 minutes</p>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Episodes List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Latest Episodes
            </h2>
            <p className="text-lg text-gray-600">
              Listen to our latest episodes and share your thoughts
            </p>
          </div>

          <div className="space-y-8">
            {episodes.map((episode) => (
              <Card key={episode.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-1">
                    <img
                      src={episode.thumbnail}
                      alt={episode.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <CardContent className="md:col-span-3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{episode.title}</h3>
                        <p className="text-gray-600 mb-4">{episode.description}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>{episode.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Play size={16} />
                            <span>{episode.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MessageSquare size={16} />
                            <span>{episode.reviews.length} reviews</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-6">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Play size={16} className="mr-2" />
                        Listen Now
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          setSelectedEpisode(selectedEpisode === episode.id ? null : episode.id)
                        }
                      >
                        <MessageSquare size={16} className="mr-2" />
                        Leave Review
                      </Button>
                    </div>

                    {/* Review Form */}
                    {selectedEpisode === episode.id && (
                      <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Write Your Review</h4>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating
                          </label>
                          <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => setRating(star)}
                                className="focus:outline-none"
                              >
                                <Star
                                  size={24}
                                  className={
                                    star <= rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <Textarea
                          placeholder="Share your thoughts about this episode..."
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          className="mb-4"
                          rows={4}
                        />
                        <div className="flex space-x-3">
                          <Button onClick={() => handleSubmitReview(episode.id)}>
                            Submit Review
                          </Button>
                          <Button variant="outline" onClick={() => setSelectedEpisode(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Reviews List */}
                    {episode.reviews.length > 0 && (
                      <div className="border-t border-gray-200 pt-6">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Reviews ({episode.reviews.length})
                        </h4>
                        <div className="space-y-4">
                          {episode.reviews.map((review) => (
                            <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <div className="font-semibold text-gray-900">
                                    {review.userName}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="flex">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          size={14}
                                          className={
                                            star <= review.rating
                                              ? 'fill-yellow-400 text-yellow-400'
                                              : 'text-gray-300'
                                          }
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-gray-500">{review.date}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                              <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-purple-600">
                                <ThumbsUp size={14} />
                                <span>{review.likes} helpful</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mic className="mx-auto mb-4" size={48} />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Never Miss an Episode</h2>
          <p className="text-lg mb-8 text-purple-100">
            Subscribe to get notified when we release new episodes
          </p>
          <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
            Subscribe Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Podcasts;
