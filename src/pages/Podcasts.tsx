import React, { useEffect, useState } from 'react';
import { Mic, Play, Calendar, MessageSquare, Star, ThumbsUp, Clock, Bell } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { getPodcastEpisodes, createPodcastReview, updateReviewHelpful } from '@/utils/supabaseDatabase';

const Podcasts: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [upcomingPodcast, setUpcomingPodcast] = useState<any>(null);

  useEffect(() => {
    loadEpisodes();
  }, []);

  const loadEpisodes = async () => {
    try {
      setLoading(true);
      const data = await getPodcastEpisodes();
      if (data && data.length > 0) {
        setEpisodes(data);
        // Set first episode as upcoming if available
        setUpcomingPodcast(data[0] || null);
      }
    } catch (error) {
      toast.error('Failed to load podcast episodes');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (episodeId: string) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to leave a review');
      return;
    }

    if (!reviewText.trim()) {
      toast.error('Please write a review');
      return;
    }

    try {
      const review = await createPodcastReview({
        episode_id: episodeId,
        user_id: user?.id || '',
        rating,
        comment: reviewText,
      });

      // Update local episodes list
      setEpisodes(
        episodes.map((ep) =>
          ep.id === episodeId 
            ? { 
                ...ep, 
                podcast_reviews: [...(ep.podcast_reviews || []), review] 
              } 
            : ep
        )
      );

      setReviewText('');
      setRating(5);
      setSelectedEpisode(null);
      toast.success('Review submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit review');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <Mic size={48} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-center">
            The Digital Diva Lounge
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
                  src="/digital-diva-lounge.png"
                  alt="The Digital Diva Lounge Podcast"
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
          {/* Upcoming Podcast Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                🎙️ Upcoming Episode
              </h2>
              <p className="text-lg text-gray-600">
                Get ready for our next exciting conversation
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            ) : upcomingPodcast ? (
              <Card className="overflow-hidden border-2 border-purple-600 bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <img
                      src={upcomingPodcast.thumbnail_url || '/digital-diva-lounge.png'}
                      alt={upcomingPodcast.title}
                      className="w-full h-64 object-cover rounded-l-lg"
                    />
                  </div>
                  <CardContent className="md:col-span-2 p-8">
                    <div className="inline-block bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                      Coming Soon
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{upcomingPodcast.title}</h3>
                    <p className="text-gray-700 text-lg mb-6">{upcomingPodcast.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Calendar size={18} className="text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Release Date</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(upcomingPodcast.created_at).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                          <Clock size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="font-semibold text-gray-900">{upcomingPodcast.duration || '45 min'}</p>
                        </div>
                      </div>
                    </div>

                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                      <Bell size={18} className="mr-2" />
                      Notify Me
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No upcoming episodes scheduled yet. Check back soon!</p>
              </div>
            )}
          </div>

          {/* Previous Episodes Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Previous Episodes
              </h2>
              <p className="text-lg text-gray-600">
                Listen to our past episodes and share your thoughts
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            ) : episodes.length <= 1 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No previous episodes yet. Check back soon!</p>
              </div>
            ) : (
              <div className="space-y-8">
                {episodes.slice(1).map((episode) => (
                <Card key={episode.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                      <img
                        src={episode.thumbnail_url}
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
                              <span>{new Date(episode.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Play size={16} />
                              <span>{episode.duration || '45 min'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MessageSquare size={16} />
                              <span>{episode.podcast_reviews?.length || 0} reviews</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mb-6">
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700"
                          onClick={() => window.open(episode.audio_url, '_blank')}
                        >
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
                      {episode.podcast_reviews && episode.podcast_reviews.length > 0 && (
                        <div className="border-t border-gray-200 pt-6">
                          <h4 className="font-semibold text-gray-900 mb-4">
                            Reviews ({episode.podcast_reviews.length})
                          </h4>
                          <div className="space-y-4">
                            {episode.podcast_reviews.map((review: any) => (
                              <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <div className="font-semibold text-gray-900">
                                      {review.users?.name || 'Anonymous'}
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
                                      <span className="text-xs text-gray-500">
                                        {new Date(review.created_at).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                                <button 
                                  onClick={() => updateReviewHelpful(review.id, (review.helpful_count || 0) + 1)}
                                  className="flex items-center space-x-1 text-sm text-gray-500 hover:text-purple-600"
                                >
                                  <ThumbsUp size={14} />
                                  <span>{review.helpful_count || 0} helpful</span>
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
            )}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-black text-white">
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
