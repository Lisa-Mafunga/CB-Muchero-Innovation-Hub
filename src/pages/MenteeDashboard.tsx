import React, { useEffect, useState } from 'react';
import { Target, Calendar, BookOpen, Award, TrendingUp, Video, Download, MessageSquare, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Progress } from '@/app/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { supabase } from '@/utils/supabaseClient';
import {
  getUserByEmail,
  getLearningProgress,
  getMentorshipSessions,
  getResources,
  getProfileByUserId,
  releaseMenteeFromMentor,
  createOrUpdateProfile,
  uploadAvatar,
  submitSessionRating,
  getSessionRating,
  getMessages,
  sendMessage,
} from '@/utils/supabaseDatabase';
import { MentorProfileCard } from '@/app/components/MentorProfileCard';

const MenteeDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const [supabaseUser, setSupabaseUser] = useState<any | null>(null);
  const [menteeProfile, setMenteeProfile] = useState<any | null>(null);
  const [mentorProfile, setMentorProfile] = useState<any | null>(null);
  const [mentorUser, setMentorUser] = useState<any | null>(null);
  const [learningPath, setLearningPath] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  // Profile form
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileAbout, setProfileAbout] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);

  // Message form
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<any>(null);

  // Rating form
  const [ratingSessionId, setRatingSessionId] = useState<string | null>(null);
  const [ratingValue, setRatingValue] = useState<number>(5);
  const [ratingComment, setRatingComment] = useState<string>('');
  const [submittingRating, setSubmittingRating] = useState(false);

  useEffect(() => {
    let progressSub: any;
    let sessionsSub: any;

    const init = async () => {
      if (!user?.email && !user?.id) return;
      try {
        // Use user ID from auth context directly
        let userId = user?.id;
        
        // If no ID from auth context, try to fetch from database
        if (!userId) {
          const su = await getUserByEmail(user.email!);
          if (!su) {
            console.warn('User not found in database, continuing without profile data');
            setSupabaseUser(null);
            return;
          }
          userId = su.id;
          setSupabaseUser(su);
        } else {
          // Set supabaseUser from auth context
          setSupabaseUser({ id: user.id, email: user.email, name: user.name, role: user.role });
        }

        // Load profile with the userId
        const profile = await getProfileByUserId(userId);
        setMenteeProfile(profile);
        if (profile) {
          setProfileAbout(profile.about_bio || '');
          setProfileImageUrl(profile.profile_picture_url || '');
        }

        // If mentee has a mentor, load mentor profile and user data
        if (profile?.mentor_id) {
          try {
            const mentorProf = await getProfileByUserId(profile.mentor_id);
            setMentorProfile(mentorProf);
            
            // Fetch mentor user data
            const { data: mentorUserData } = await supabase
              .from('users')
              .select('*')
              .eq('id', profile.mentor_id)
              .single();
            if (mentorUserData) {
              setMentorUser(mentorUserData);
            }

            // Fetch messages with mentor
            try {
              const convo = [userId, profile.mentor_id].sort().join('_');
              const messagesData = await getMessages(convo);
              setMessages(messagesData || []);
            } catch (err) {
              // eslint-disable-next-line no-console
              console.error('Error loading messages:', err);
            }
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Error loading mentor profile:', err);
          }
        }

        const [progressData, sessionsData, resourcesData] = await Promise.all([
          getLearningProgress(userId),
          getMentorshipSessions(userId, 'mentee'),
          getResources(),
        ]);

        setLearningPath(
          (progressData || []).map((p: any) => ({ title: p.module_title || p.module_key, progress: p.progress_percent || 0, status: p.completed ? 'completed' : p.progress_percent ? 'in-progress' : 'not-started' }))
        );

        setSessions(sessionsData || []);
        setResources(resourcesData || []);

        // Simple achievements derived from progress
        const completedCount = (progressData || []).filter((m: any) => m.completed).length;
        setAchievements([
          { title: 'First Session Completed', icon: Award, earned: (sessionsData || []).length > 0 },
          { title: 'Module Master', icon: BookOpen, earned: completedCount >= 3 },
          { title: '10 Hours of Learning', icon: TrendingUp, earned: false },
          { title: 'Perfect Attendance', icon: Calendar, earned: false },
        ]);

        // Realtime subscriptions
        progressSub = supabase.from(`learning_progress:user_id=eq.${userId}`).on('*', () => {
          getLearningProgress(userId).then((pd) => setLearningPath((pd || []).map((p: any) => ({ title: p.module_title || p.module_key, progress: p.progress_percent || 0, status: p.completed ? 'completed' : p.progress_percent ? 'in-progress' : 'not-started' }))));
        }).subscribe();

        sessionsSub = supabase.from(`mentorship_sessions:mentee_id=eq.${userId}`).on('*', () => {
          getMentorshipSessions(userId, 'mentee').then((sd) => setSessions(sd || []));
        }).subscribe();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };

    init();

    return () => {
      if (progressSub && progressSub.unsubscribe) progressSub.unsubscribe();
      if (sessionsSub && sessionsSub.unsubscribe) sessionsSub.unsubscribe();
    };
  }, [user]);

  const handleJoin = (session: any) => {
    const url = session?.notes || session?.metadata?.meeting_url || session?.meeting_url;
    if (url) window.open(url, '_blank');
    else toast.error('No meeting link available for this session.');
  };

  const handleMessageMentor = (mentor: any) => {
    if (!supabaseUser) {
      toast.error('Connect a Supabase user to message your mentor.');
      return;
    }
    setSelectedMentor(mentor);
    setMessageContent('');
    setShowMessageForm(true);
  };

  const handleSendMessage = async () => {
    if (!messageContent.trim()) {
      toast.error('Please enter a message');
      return;
    }

    if (!supabaseUser || !selectedMentor) {
      toast.error('Unable to send message');
      return;
    }

    try {
      setSendingMessage(true);
      const convo = [supabaseUser.id, selectedMentor.id].sort().join('_');
      
      await sendMessage({
        conversation_id: convo,
        sender_id: supabaseUser.id,
        receiver_id: selectedMentor.id,
        content: messageContent,
      });
      
      const updatedMessages = await getMessages(convo);
      setMessages(updatedMessages || []);
      
      setShowMessageForm(false);
      setMessageContent('');
      setSelectedMentor(null);
      toast.success('Message sent');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error sending message:', err);
      toast.error('Failed to send message: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSendingMessage(false);
    }
  };

  const handleEndMentorship = async () => {
    if (!supabaseUser || !menteeProfile) return;
    try {
      await releaseMenteeFromMentor(supabaseUser.id);
      // Refresh profile and mentor data
      const profile = await getProfileByUserId(supabaseUser.id);
      setMenteeProfile(profile);
      setMentorProfile(null);
      setMentorUser(null);
      toast.success('Mentorship ended. You are now open for new mentors!');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error ending mentorship:', err);
      toast.error('Failed to end mentorship');
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('Image must be smaller than 10MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    setProfileImageFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfileImageUrl(event.target?.result as string);
    };
    reader.onerror = () => {
      toast.error('Failed to read image file');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    try {
      // Use user ID from auth context directly
      let userId = user?.id;
      
      if (!userId) {
        // Fallback: try to fetch from database if ID not in auth context
        const fetchedUser = await getUserByEmail(user?.email!);
        if (!fetchedUser) return toast.error('Could not find your account. Please sign out and sign back in.');
        userId = fetchedUser.id;
      }

      if (!profileAbout.trim()) return toast.error('Please add an about section.');
      
      setSavingProfile(true);
      let finalImageUrl = profileImageUrl;
      console.log('Saving profile for userId:', userId);

      // Only upload if file was selected AND it's new file
      if (profileImageFile) {
        try {
          console.log('Uploading image...');
          finalImageUrl = await uploadAvatar(userId, profileImageFile);
          console.log('Image uploaded successfully:', finalImageUrl);
        } catch (err) {
          console.error('Error uploading image:', err);
          // Continue saving without image on upload failure
          finalImageUrl = profileImageUrl;
        }
      }
      
      console.log('Calling createOrUpdateProfile with:', { userId, profileImageUrl: finalImageUrl, profileAbout });
      const updatedProfile = await createOrUpdateProfile(userId, {
        profile_picture_url: finalImageUrl,
        about_bio: profileAbout,
      });
      
      console.log('Profile saved:', updatedProfile);
      setMenteeProfile(updatedProfile);
      setProfileImageFile(null);
      setIsEditingProfile(false);
      toast.success('Profile saved successfully!');
    } catch (err) {
      console.error('Error saving profile - full error:', err);
      const errorMsg = err instanceof Error ? err.message : JSON.stringify(err);
      toast.error('Failed to save profile: ' + errorMsg);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSubmitRating = async (sessionId: string, mentorId: string) => {
    if (!user?.id) return toast.error('You must be signed in');
    
    setSubmittingRating(true);
    try {
      await submitSessionRating(sessionId, user.id, mentorId, ratingValue, ratingComment);
      toast.success('Rating submitted successfully!');
      setRatingSessionId(null);
      setRatingValue(5);
      setRatingComment('');
    } catch (err) {
      console.error('Error submitting rating:', err);
      toast.error('Failed to submit rating');
    } finally {
      setSubmittingRating(false);
    }
  };

  if (!isAuthenticated || user?.role !== 'mentee') {
    return <Navigate to="/signin" />;
  }

  const overallProgress = learningPath.length ? Math.round(learningPath.reduce((s, m) => s + m.progress, 0) / learningPath.length) : 0;
  const sessionsAttended = sessions.filter((s) => s.status === 'completed').length;
  const hoursLearned = Math.round((sessions.filter((s) => s.duration_minutes).reduce((sum, s) => sum + (s.duration_minutes || 0), 0) || 0) / 60);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Mentee Dashboard</h1>
              <p className="text-blue-100">Welcome back, {user?.name}!</p>
            </div>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Target className="text-blue-600" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Overall Progress</p>
                  <p className="text-3xl font-bold text-gray-900">{overallProgress}%</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-blue-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Sessions Attended</p>
                  <p className="text-3xl font-bold text-gray-900">{sessionsAttended}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="text-purple-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Hours Learned</p>
                  <p className="text-3xl font-bold text-gray-900">{hoursLearned}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BookOpen className="text-green-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Achievements</p>
                  <p className="text-3xl font-bold text-gray-900">{achievements.filter(a => a.earned).length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Award className="text-orange-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="learning">My Learning Path</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Side - Profile Picture */}
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  {isEditingProfile ? (
                    <>
                      {profileImageUrl && (
                        <div className="mb-4">
                          <img
                            src={profileImageUrl}
                            alt="Profile Preview"
                            className="rounded-lg w-full h-80 object-cover shadow-lg"
                          />
                        </div>
                      )}
                      <label className="border-2 border-dashed border-blue-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition-colors">
                        <Upload size={48} className="text-blue-600 mb-4" />
                        <span className="text-gray-700 font-semibold mb-1">Click to upload profile picture</span>
                        <span className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfileImageChange}
                          className="hidden"
                        />
                      </label>
                    </>
                  ) : profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt="Profile"
                      className="rounded-lg shadow-2xl w-full h-96 object-cover"
                    />
                  ) : null}
                </div>
              </div>

              {/* Right Side - Profile Form */}
              <div className="relative">
                <div className="absolute left-0 top-0 w-2 h-32 bg-blue-500 rounded"></div>
                <div className="pl-8 space-y-6">
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{profileName}</h2>
                    <p className="text-blue-600 font-semibold">Mentee</p>
                  </div>

                  {!isEditingProfile && menteeProfile ? (
                    <>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">About</h3>
                        <p className="text-gray-700">{profileAbout || 'No bio added yet'}</p>
                      </div>

                      <Button onClick={() => setIsEditingProfile(true)} className="bg-blue-600 hover:bg-blue-700">
                        Edit Profile
                      </Button>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">About</label>
                        <Textarea
                          value={profileAbout}
                          onChange={(e) => setProfileAbout(e.target.value)}
                          placeholder="Tell mentors about your goals, interests, and what you want to learn..."
                          className="h-24 resize-none"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <Button onClick={handleSaveProfile} disabled={savingProfile} className="bg-blue-600 hover:bg-blue-700">
                          {savingProfile ? 'Saving...' : 'Save Profile'}
                        </Button>
                        {menteeProfile && (
                          <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                            Cancel
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>


          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* My Mentor */}
              {mentorProfile && mentorUser ? (
                <MentorProfileCard
                  mentor={{ ...mentorUser, profile: mentorProfile }}
                  onMessage={(mentor) => handleMessageMentor(mentor)}
                />
              ) : menteeProfile?.is_open_for_mentorship ? (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">No Mentor Yet</h3>
                    <p className="text-gray-600 mb-4">
                      You are currently open for mentorship. Complete your profile to attract mentors!
                    </p>
                    <Link to="/profile"><Button className="w-full">Complete Your Profile</Button></Link>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">No Mentor Assigned</h3>
                    <p className="text-gray-600">
                      Please create or update your profile to be visible to mentors.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Upcoming Sessions */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Upcoming Sessions</h3>
                    <Calendar className="text-blue-600" size={20} />
                  </div>
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.id} className="border-l-4 border-blue-600 pl-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{session.topic || session.notes}</p>
                            <p className="text-sm text-gray-600">with {session.mentor_name}</p>
                            <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                              <span>{session.scheduled_at ? new Date(session.scheduled_at).toLocaleDateString() : 'No date'}</span>
                              <span>•</span>
                              <span>{session.scheduled_at ? new Date(session.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => handleJoin(session)}>
                            <Video size={16} className="mr-1" />
                            Join
                          </Button>
                        </div>
                      </div>
                    ))}
                    {sessions.length === 0 && <p className="text-sm text-gray-500">No upcoming sessions</p>}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Messages */}
            {mentorUser && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Messages with {mentorUser.name}</h3>
                    <MessageSquare className="text-blue-600" size={20} />
                  </div>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {messages.length > 0 ? (
                      messages.slice(-5).map((msg: any, index: number) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            msg.sender_id === supabaseUser?.id
                              ? 'bg-blue-100 ml-12'
                              : 'bg-gray-100 mr-12'
                          }`}
                        >
                          <p className="text-sm text-gray-900">{msg.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No messages yet. Start a conversation with your mentor!</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Achievements */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Your Achievements</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`text-center p-4 rounded-lg ${
                        achievement.earned ? 'bg-gradient-to-br from-purple-50 to-blue-50' : 'bg-gray-100'
                      }`}
                    >
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                          achievement.earned
                            ? 'bg-gradient-to-br from-purple-600 to-blue-600'
                            : 'bg-gray-300'
                        }`}
                      >
                        <achievement.icon
                          className={achievement.earned ? 'text-white' : 'text-gray-500'}
                          size={28}
                        />
                      </div>
                      <p
                        className={`text-sm font-semibold ${
                          achievement.earned ? 'text-gray-900' : 'text-gray-500'
                        }`}
                      >
                        {achievement.title}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Path Tab */}
          <TabsContent value="learning">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Your Learning Journey</h3>
                <div className="space-y-6">
                  {learningPath.map((module, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            module.status === 'completed'
                              ? 'bg-green-600'
                              : module.status === 'in-progress'
                              ? 'bg-blue-600'
                              : 'bg-gray-300'
                          }`}
                        >
                          {module.status === 'completed' ? (
                            <span className="text-white font-bold">✓</span>
                          ) : (
                            <span className="text-white font-bold">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{module.title}</h4>
                            <Badge
                              variant={
                                module.status === 'completed'
                                  ? 'default'
                                  : module.status === 'in-progress'
                                  ? 'secondary'
                                  : 'outline'
                              }
                            >
                              {module.status === 'completed'
                                ? 'Completed'
                                : module.status === 'in-progress'
                                ? 'In Progress'
                                : 'Not Started'}
                            </Badge>
                          </div>
                          <Progress value={module.progress} className="h-2 mb-2" />
                          <p className="text-sm text-gray-600">{module.progress}% complete</p>
                        </div>
                      </div>
                      {index < learningPath.length - 1 && (
                        <div className="absolute left-5 top-12 w-0.5 h-8 bg-gray-300" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">My Sessions</h3>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm">Upcoming</h4>
                  {sessions.map((session) => (
                    <Card key={session.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{session.topic || session.notes}</p>
                            <p className="text-sm text-gray-600">with {session.mentor_name}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {session.scheduled_at ? `${new Date(session.scheduled_at).toLocaleString()}` : 'No date'}
                            </p>
                            {session.status === 'completed' && (
                              <Badge className="mt-2">Completed</Badge>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            {session.status !== 'completed' && (
                              <Button size="sm" onClick={() => handleJoin(session)}>
                                <Video size={16} className="mr-1" />
                                Join
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Rating form for completed sessions */}
                        {session.status === 'completed' && ratingSessionId === session.id && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-gray-900 mb-3">Rate this session</h4>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5 stars)</label>
                                <div className="flex gap-2">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      onClick={() => setRatingValue(star)}
                                      className={`text-2xl ${ratingValue >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                    >
                                      ★
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Comment (optional)</label>
                                <Textarea
                                  value={ratingComment}
                                  onChange={(e) => setRatingComment(e.target.value)}
                                  placeholder="Share your feedback about this session..."
                                  className="h-20 resize-none"
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleSubmitRating(session.id, session.mentor_id)}
                                  disabled={submittingRating}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  {submittingRating ? 'Submitting...' : 'Submit Rating'}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setRatingSessionId(null)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Rating button for completed sessions */}
                        {session.status === 'completed' && ratingSessionId !== session.id && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setRatingSessionId(session.id)}
                            className="mt-3 w-full"
                          >
                            Rate this session
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Learning Resources</h3>
                  <BookOpen className="text-blue-600" size={24} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource, index) => (
                    <Card key={resource.id || index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <Badge className="mb-2">{resource.type || 'Resource'}</Badge>
                            <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">{resource.size || ''}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open(resource.url, '_blank')}>
                          <Download size={16} className="mr-1" />
                          Open
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            {mentorUser ? (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Messages with {mentorUser.name}</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                    {messages.length > 0 ? (
                      messages.map((msg: any, index: number) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg ${
                            msg.sender_id === supabaseUser?.id
                              ? 'bg-blue-100 ml-12'
                              : 'bg-gray-100 mr-12'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <p className="text-sm text-gray-900">{msg.content}</p>
                            <p className="text-xs text-gray-500 ml-2">
                              {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No messages yet. Start a conversation with your mentor!</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600">You don't have an assigned mentor yet. Once your mentor starts working with you, messages will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Message Dialog */}
        <Dialog open={showMessageForm} onOpenChange={setShowMessageForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Message {selectedMentor?.name || 'Your Mentor'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type your message here..."
                className="resize-none h-32"
              />
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowMessageForm(false);
                    setMessageContent('');
                    setSelectedMentor(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={sendingMessage || !messageContent.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {sendingMessage ? 'Sending...' : 'Send'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MenteeDashboard;
