import React, { useEffect, useState } from 'react';
import { Users, Calendar, MessageSquare, BookOpen, Award, TrendingUp, Video, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { supabase } from '@/utils/supabaseClient';
import {
  getUserByEmail,
  getMenteesForMentor,
  getMentorshipSessions,
  getResourcesByUser,
  getResources,
  createResource,
  uploadResource,
  sendMessage,
  getMessagesByUser,
  getMentorStats,
  createMentorshipSession,
  getAvailableMentees,
  getProfileByUserId,
  getMenteesByMentor,
  createOrUpdateProfile,
  uploadAvatar,
  releaseMenteeFromMentor,
} from '@/utils/supabaseDatabase';
import { ProfileBrowser } from '@/app/components/ProfileBrowser';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/app/components/ui/dialog';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/app/components/ui/alert-dialog';

const MentorDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Data
  const [supabaseUser, setSupabaseUser] = useState<any | null>(null);
  const [mentorProfile, setMentorProfile] = useState<any | null>(null);
  const [mentees, setMentees] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [stats, setStats] = useState({ sessionsThisMonth: 0, hoursMentored: 0, activeMentees: 0, impactScore: 0 });
  const [loading, setLoading] = useState(true);
  // Messages
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  // Resource form
  const [showResourceForm, setShowResourceForm] = useState(false);
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceType, setResourceType] = useState('PDF');
  const [resourceUrl, setResourceUrl] = useState('');
  const [resourceFile, setResourceFile] = useState<File | null>(null);

  // Session form
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [availableMentees, setAvailableMentees] = useState<any[]>([]);
  const [selectedMenteeId, setSelectedMenteeId] = useState<string>('');
  const [sessionDate, setSessionDate] = useState<string>('');
  const [sessionTime, setSessionTime] = useState<string>('');
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [sessionMeetingLink, setSessionMeetingLink] = useState<string>('');
  const [creatingSession, setCreatingSession] = useState(false);

  // Profile form
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileAbout, setProfileAbout] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [viewingMentee, setViewingMentee] = useState<any | null>(null);
  const [endingMenteeId, setEndingMenteeId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      // Use user.id directly from auth context
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        // Set supabaseUser to user object directly
        setSupabaseUser({ id: user.id, email: user.email, name: user.name, role: user.role });

        // Load mentees, sessions, resources, stats using user.id
        await Promise.all([fetchMentees(user.id), fetchSessions(user.id), fetchResources(user.id), fetchStats(user.id), fetchProfile(user.id)]);
        // Fetch recent messages involving this mentor
        await fetchRecentMessages(user.id);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchMentees = async (supabaseId: string) => {
    try {
      const m = await getMenteesByMentor(supabaseId);
      setMentees(m || []);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('fetchMentees', err);
    }
  };

  const fetchSessions = async (supabaseId: string) => {
    try {
      const s = await getMentorshipSessions(supabaseId, 'mentor');
      setSessions(s || []);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('fetchSessions', err);
    }
  };

  const fetchResources = async (supabaseId: string) => {
    try {
      // Show user resources + global resources
      const userResources = await getResourcesByUser(supabaseId);
      const globalResources = await getResources();
      // Combine and dedupe by id
      const combined = [...(userResources || []), ...(globalResources || [])];
      const map = new Map<string, any>();
      combined.forEach((r: any) => map.set(r.id, r));
      setResources(Array.from(map.values()));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('fetchResources', err);
    }
  };

  const fetchStats = async (supabaseId: string) => {
    try {
      const s = await getMentorStats(supabaseId);
      setStats(s || { sessionsThisMonth: 0, hoursMentored: 0, activeMentees: 0, impactScore: 0 });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('fetchStats', err);
    }
  };

  const fetchProfile = async (supabaseId: string) => {
    try {
      const profile = await getProfileByUserId(supabaseId);
      setMentorProfile(profile);
      if (profile) {
        setProfileAbout(profile.about_bio || '');
        setProfileImageUrl(profile.profile_picture_url || '');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('fetchProfile', err);
    }
  };

  const handleEndMentorship = async (menteeId: string) => {
    if (!supabaseUser) return toast.error('No linked user record found.');
    try {
      setEndingMenteeId(menteeId);
      await releaseMenteeFromMentor(menteeId);
      // Refresh lists
      if (supabaseUser) {
        await Promise.all([fetchMentees(supabaseUser.id), fetchSessions(supabaseUser.id), fetchStats(supabaseUser.id)]);
      }
      toast.success('Mentorship ended; mentee is now open for new mentors.');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error ending mentorship:', err);
      toast.error('Failed to end mentorship: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setEndingMenteeId(null);
    }
  };

  const fetchRecentMessages = async (supabaseId: string) => {
    try {
      const msgs = await getMessagesByUser(supabaseId);
      // Reduce to one message per conversation (most recent first)
      const seen = new Set<string>();
      const recent: any[] = [];
      for (const m of (msgs || [])) {
        if (!m.conversation_id) continue;
        if (!seen.has(m.conversation_id)) {
          seen.add(m.conversation_id);
          recent.push(m);
        }
      }
      setRecentMessages(recent.slice(0, 6));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('fetchRecentMessages', err);
    }
  };

  const handleJoinSession = (session: any) => {
    const url = session?.notes || session?.metadata?.meeting_url || session?.meeting_url;
    if (url) {
      window.open(url, '_blank');
    } else {
      toast.error('No meeting link attached to this session.');
    }
  };

  const handleSendMessage = async (mentee: any) => {
    if (!supabaseUser) return toast.error('No linked user record found. Messages require Supabase users.');
    const content = prompt(`Send a message to ${mentee.name}`);
    if (!content) return;

    // conversation_id: deterministic key menteeId_mentorId
    const convo = [supabaseUser.id, mentee.id].sort().join('_');
    try {
      await sendMessage({ conversation_id: convo, sender_id: supabaseUser.id, receiver_id: mentee.id, content });
      toast.success('Message sent');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error('Failed to send message: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleCreateResource = async () => {
    if (!supabaseUser) return toast.error('You must be linked to a Supabase user to upload resources.');
    try {
      let url = resourceUrl;
      if (resourceFile) {
        url = await uploadResource(resourceFile);
      }
      if (!url) return toast.error('Please provide a URL or upload a file.');
      await createResource({ title: resourceTitle || 'Untitled', url, type: resourceType, uploaded_by: supabaseUser.id });
      setResourceTitle('');
      setResourceUrl('');
      setResourceFile(null);
      setShowResourceForm(false);
      // resources will refresh via realtime or fetchResources
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error('Failed to create resource');
    }
  };

  const fetchAvailableMentees = async () => {
    try {
      // Show only mentees assigned to this mentor
      if (supabaseUser) {
        const list = await getMenteesByMentor(supabaseUser.id);
        const menteeUsers = (list || []).map((m: any) => m.users).filter(Boolean);
        setAvailableMentees(menteeUsers);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('fetchAvailableMentees', err);
    }
  };

  const handleCreateSession = async () => {
    if (!supabaseUser) return toast.error('You must be linked to a Supabase user to create sessions.');
    if (!selectedMenteeId) return toast.error('Select a mentee to schedule a session with.');
    if (!sessionDate || !sessionTime) return toast.error('Select date and time.');
    setCreatingSession(true);
    try {
      const scheduledAt = new Date(`${sessionDate}T${sessionTime}`).toISOString();
      await createMentorshipSession({
        mentor_id: supabaseUser.id,
        mentee_id: selectedMenteeId,
        scheduled_at: scheduledAt,
        duration_minutes: durationMinutes,
        notes: sessionMeetingLink,
      });
      setSelectedMenteeId('');
      setSessionDate('');
      setSessionTime('');
      setDurationMinutes(60);
      setSessionMeetingLink('');
      setShowSessionForm(false);
      // refresh
      await Promise.all([fetchSessions(supabaseUser.id), fetchMentees(supabaseUser.id), fetchStats(supabaseUser.id)]);
      toast.success('Session created successfully');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error('Failed to create session');
    } finally {
      setCreatingSession(false);
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
      setMentorProfile(updatedProfile);
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



  if (!isAuthenticated || user?.role !== 'mentor') {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Mentor Dashboard</h1>
              <p className="text-purple-100">Welcome back, {user?.name}!</p>
            </div>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Users className="text-purple-600" size={32} />
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
                  <p className="text-sm text-gray-600 mb-1">Active Mentees</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeMentees}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="text-purple-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Sessions This Month</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.sessionsThisMonth}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="text-black" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Hours Mentored</p>
                  <p className="text-3xl font-bold text-gray-900">{Math.round(stats.hoursMentored)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-green-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Impact Score</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.impactScore || '—'}</p>
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
            <TabsTrigger value="browse">Browse Mentees</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mentees">My Mentees</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
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
                      <label className="border-2 border-dashed border-purple-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-purple-600 hover:bg-purple-50 transition-colors">
                        <Upload size={48} className="text-purple-600 mb-4" />
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
                <div className="absolute left-0 top-0 w-2 h-32 bg-purple-500 rounded"></div>
                <div className="pl-8 space-y-6">
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{profileName}</h2>
                    <p className="text-purple-600 font-semibold">Mentor</p>
                  </div>

                  {!isEditingProfile && mentorProfile ? (
                    <>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">About</h3>
                        <p className="text-gray-700">{profileAbout}</p>
                      </div>
                      <Button onClick={() => setIsEditingProfile(true)} className="bg-purple-600 hover:bg-purple-700">
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
                          placeholder="Tell mentees about yourself, your expertise, and experience..."
                          className="h-24 resize-none"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <Button onClick={handleSaveProfile} disabled={savingProfile} className="bg-purple-600 hover:bg-purple-700">
                          {savingProfile ? 'Saving...' : 'Save Profile'}
                        </Button>
                        {mentorProfile && (
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

          {/* Browse Mentees Tab */}
          <TabsContent value="browse" className="space-y-6">
            {supabaseUser && mentorProfile ? (
              <ProfileBrowser
                currentUserId={supabaseUser.id}
                currentUserRole="mentor"
                currentUserProfile={mentorProfile}
                onProfileSelected={(profile) => {
                  // Refresh mentees list after new match
                  if (supabaseUser) {
                    fetchMentees(supabaseUser.id);
                  }
                }}
              />
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">
                      Please complete your mentor profile first to browse mentees.
                    </p>
                    <Link to="/profile"><Button>Create Profile</Button></Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6" style={{ marginTop: '-10px' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Sessions */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Upcoming Sessions</h3>
                    <Calendar className="text-purple-600" size={20} />
                  </div>
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.id} className="border-l-4 border-purple-600 pl-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{session.mentee_name || session.mentee_id}</p>
                            <p className="text-sm text-gray-600">{session.notes}</p>
                            <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                              <span>{new Date(session.scheduled_at).toLocaleDateString()}</span>
                              <span>•</span>
                              <span>{new Date(session.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => handleJoinSession(session)}>
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

              {/* Recent Messages */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Recent Messages</h3>
                    <MessageSquare className="text-purple-600" size={20} />
                  </div>
                  <div className="space-y-4">
                    {recentMessages && recentMessages.length > 0 ? (
                      recentMessages.map((msg) => {
                        const partnerId = msg.sender_id === supabaseUser?.id ? msg.receiver_id : msg.sender_id;
                        const partner = (mentees || []).find((m: any) => m.user_id === partnerId) || null;
                        return (
                          <div key={msg.id} className="border rounded p-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{partner?.users?.name || partnerId}</p>
                                <p className="text-sm text-gray-700">{msg.content}</p>
                              </div>
                              <p className="text-xs text-gray-500 ml-4">{msg.created_at ? new Date(msg.created_at).toLocaleString() : ''}</p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-sm text-gray-500">No recent messages. Use the mentee cards to message directly.</p>
                    )}
                    <Button variant="outline" className="w-full mt-4">
                      View All Messages
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* My Mentees Tab */}
          <TabsContent value="mentees">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">My Mentees</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentees.map((mentee) => (
                <Card key={mentee.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      {mentee.profile_picture_url ? (
                        <img
                          src={mentee.profile_picture_url}
                          alt={mentee.users?.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {mentee.users?.name?.charAt(0) || 'U'}
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{mentee.users?.name || 'Unknown'}</h3>
                        <p className="text-sm text-gray-600">{mentee.about_bio || 'No bio'}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Active Sessions</span>
                        <span className="font-semibold text-gray-900">{(sessions || []).filter(s => s.mentee_id === mentee.user_id).length}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1" onClick={() => setViewingMentee(mentee)}>
                        View Profile
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline" className="text-red-600" disabled={endingMenteeId === mentee.user_id}>
                            End Mentorship
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogTitle>End mentorship with {mentee.users?.name || 'this mentee'}?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will unassign the mentee and make their profile available in Browse Mentees.
                          </AlertDialogDescription>
                          <div className="flex gap-2 justify-end mt-4">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleEndMentorship(mentee.user_id)} className="bg-red-600 hover:bg-red-700">
                              {endingMenteeId === mentee.user_id ? 'Ending...' : 'End Mentorship'}
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    <Dialog open={!!viewingMentee} onOpenChange={(open) => { if (!open) setViewingMentee(null); }}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{viewingMentee?.users?.name || 'Profile'}</DialogTitle>
                          <DialogDescription>{viewingMentee?.about_bio || 'No bio available.'}</DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 flex items-start space-x-4">
                          {viewingMentee?.profile_picture_url ? (
                            <img src={viewingMentee.profile_picture_url} alt={viewingMentee?.users?.name} className="w-20 h-20 rounded-md object-cover" />
                          ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-gray-600">No Image</div>
                          )}
                          <div>
                            <p className="text-sm text-gray-700">{viewingMentee?.expertise_topics || 'No topics listed'}</p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={() => setViewingMentee(null)}>Close</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
            {mentees.length === 0 && <p className="text-sm text-gray-500">No mentees found.</p>}
            </div>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Schedule New Session</h3>
                <Button className="bg-purple-600 hover:bg-purple-700 mb-6" onClick={async () => { if (supabaseUser && availableMentees.length === 0) await fetchAvailableMentees(); setShowSessionForm((s) => !s); }}>
                  <Calendar className="mr-2" size={18} />
                  Create New Session
                </Button>

                {showSessionForm && (
                  <div className="mb-6 p-4 border rounded-lg bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <select className="p-2 border" value={selectedMenteeId} onChange={(e) => setSelectedMenteeId(e.target.value)}>
                        <option value="">Select mentee</option>
                        {availableMentees.map((m) => (
                          <option key={m.id} value={m.id}>{m.name || m.email}</option>
                        ))}
                      </select>

                      <input type="date" className="p-2 border" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} />
                      <input type="time" className="p-2 border" value={sessionTime} onChange={(e) => setSessionTime(e.target.value)} />

                      <input type="number" className="p-2 border" value={durationMinutes} onChange={(e) => setDurationMinutes(Number(e.target.value))} placeholder="Duration (minutes)" />

                      <input type="url" className="p-2 border md:col-span-2" placeholder="Meeting link (e.g., https://zoom.us/my/...)" value={sessionMeetingLink} onChange={(e) => setSessionMeetingLink(e.target.value)} />

                      <div className="md:col-span-2 flex space-x-2">
                        <Button onClick={handleCreateSession} disabled={creatingSession}>{creatingSession ? 'Creating...' : 'Create Session'}</Button>
                        <Button variant="outline" onClick={() => setShowSessionForm(false)}>Cancel</Button>
                      </div>
                    </div>
                  </div>
                )}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">All Upcoming Sessions</h4>
                  {sessions.map((session) => (
                    <Card key={session.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{session.mentee_name || session.mentee_id}</p>
                            <p className="text-sm text-gray-600">{session.notes}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {session.scheduled_at ? `${new Date(session.scheduled_at).toLocaleString()}` : 'No date'}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" onClick={() => handleJoinSession(session)}>
                              <Video size={16} className="mr-1" />
                              Join
                            </Button>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </div>
                        </div>
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
                  <h3 className="text-lg font-bold text-gray-900">Mentor Resources</h3>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="text-purple-600" size={24} />
                    <Button size="sm" onClick={() => setShowResourceForm((s) => !s)}>Add Resource</Button>
                  </div>
                </div>

                {showResourceForm && (
                  <div className="mb-6 p-4 border rounded-lg bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input className="p-2 border" placeholder="Title" value={resourceTitle} onChange={(e) => setResourceTitle(e.target.value)} />
                      <select className="p-2 border" value={resourceType} onChange={(e) => setResourceType(e.target.value)}>
                        <option>PDF</option>
                        <option>Video</option>
                        <option>Document</option>
                        <option>Other</option>
                      </select>
                      <input className="p-2 border md:col-span-2" placeholder="URL (Google Drive link, etc.)" value={resourceUrl} onChange={(e) => setResourceUrl(e.target.value)} />
                      <input type="file" className="md:col-span-2" onChange={(e) => setResourceFile(e.target.files ? e.target.files[0] : null)} />
                      <div className="md:col-span-2 flex space-x-2">
                        <Button onClick={handleCreateResource}>Upload</Button>
                        <Button variant="outline" onClick={() => setShowResourceForm(false)}>Cancel</Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource, index) => (
                    <Card key={resource.id || index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <Badge className="mb-2">{resource.type}</Badge>
                            <h4 className="font-semibold text-gray-900 mb-2">{resource.title}</h4>
                            <p className="text-xs text-gray-500">{resource.size || ''}</p>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <Button size="sm" variant="outline" onClick={() => window.open(resource.url, '_blank')}>Open</Button>
                            <div className="text-xs text-gray-500">{resource.downloads || 0} downloads</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MentorDashboard;
