import { supabase } from './supabaseClient';

// ===== File Upload Utilities =====

export const uploadFile = async (
  bucket: string,
  filePath: string,
  file: File
): Promise<string> => {
  const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
    upsert: true,
  });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  
  // Return public URL
  const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return publicData.publicUrl;
};

export const deleteFile = async (bucket: string, filePath: string): Promise<void> => {
  const { error } = await supabase.storage.from(bucket).remove([filePath]);
  if (error) throw new Error(`Delete failed: ${error.message}`);
};

// Avatar uploads
export const uploadAvatar = async (userId: string, file: File): Promise<string> => {
  const filePath = `avatars/${userId}/${Date.now()}_${file.name}`;
  return uploadFile('avatars', filePath, file);
};

// Gallery image uploads
export const uploadGalleryImage = async (file: File): Promise<string> => {
  const filePath = `${Date.now()}_${file.name}`;
  return uploadFile('gallery', filePath, file);
};

// Resource uploads (PDFs, docs, etc.)
export const uploadResource = async (file: File): Promise<string> => {
  const filePath = `${Date.now()}_${file.name}`;
  return uploadFile('resources', filePath, file);
};

// ===== Events =====

export const getEvents = async (status?: 'upcoming' | 'completed') => {
  let query = supabase.from('events').select('*').order('starts_at', { ascending: true });
  if (status === 'upcoming') {
    query = query.gte('starts_at', new Date().toISOString());
  } else if (status === 'completed') {
    query = query.lt('starts_at', new Date().toISOString());
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const createEvent = async (event: {
  title: string;
  description?: string;
  location?: string;
  starts_at?: string;
  ends_at?: string;
  capacity?: number;
  is_virtual?: boolean;
  created_by?: string;
}) => {
  const { data, error } = await supabase.from('events').insert([event]).select().single();
  if (error) throw error;
  return data;
};

export const updateEvent = async (eventId: string, updates: any) => {
  const { data, error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', eventId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteEvent = async (eventId: string) => {
  const { error } = await supabase.from('events').delete().eq('id', eventId);
  if (error) throw error;
};

// ===== Podcast Episodes & Reviews =====

export const getPodcastEpisodes = async () => {
  const { data, error } = await supabase
    .from('podcast_episodes')
    .select('*, podcast_reviews(*)')
    .order('published_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getPodcastEpisodeById = async (episodeId: string) => {
  const { data, error } = await supabase
    .from('podcast_episodes')
    .select('*, podcast_reviews(*)')
    .eq('id', episodeId)
    .single();
  if (error) throw error;
  return data;
};

export const createPodcastEpisode = async (episode: {
  title: string;
  description?: string;
  audio_url?: string;
  duration_seconds?: number;
  published_at?: string;
  created_by?: string;
}) => {
  const { data, error } = await supabase
    .from('podcast_episodes')
    .insert([episode])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const createPodcastReview = async (review: {
  episode_id: string;
  user_id: string;
  rating: number;
  comment?: string;
}) => {
  const { data, error } = await supabase
    .from('podcast_reviews')
    .insert([review])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateReviewHelpful = async (reviewId: string, increment: number = 1) => {
  const { data, error } = await supabase
    .from('podcast_reviews')
    .select('helpful_count')
    .eq('id', reviewId)
    .single();
  if (error) throw error;
  
  const newCount = (data.helpful_count || 0) + increment;
  const { error: updateError } = await supabase
    .from('podcast_reviews')
    .update({ helpful_count: newCount })
    .eq('id', reviewId);
  if (updateError) throw updateError;
};

// ===== Gallery =====

export const getGalleryImages = async (category?: string) => {
  let query = supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
  if (category) {
    query = query.eq('category', category);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const createGalleryImage = async (image: {
  title?: string;
  description?: string;
  image_url: string;
  category?: string;
  uploaded_by?: string;
}) => {
  const { data, error } = await supabase
    .from('gallery_images')
    .insert([image])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteGalleryImage = async (imageId: string) => {
  const { error } = await supabase.from('gallery_images').delete().eq('id', imageId);
  if (error) throw error;
};

// ===== Mentorship Sessions =====

export const getMentorshipSessions = async (userId: string, role: 'mentor' | 'mentee') => {
  const column = role === 'mentor' ? 'mentor_id' : 'mentee_id';
  const { data, error } = await supabase
    .from('mentorship_sessions')
    .select('*')
    .eq(column, userId)
    .order('scheduled_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const createMentorshipSession = async (session: {
  mentor_id: string;
  mentee_id: string;
  scheduled_at?: string;
  duration_minutes?: number;
  notes?: string;
}) => {
  const { data, error } = await supabase
    .from('mentorship_sessions')
    .insert([session])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateMentorshipSession = async (sessionId: string, updates: any) => {
  const { data, error } = await supabase
    .from('mentorship_sessions')
    .update(updates)
    .eq('id', sessionId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

// ===== Learning Progress =====

export const getLearningProgress = async (userId: string) => {
  const { data, error } = await supabase
    .from('learning_progress')
    .select('*')
    .eq('user_id', userId)
    .order('last_updated', { ascending: false });
  if (error) throw error;
  return data;
};

export const updateLearningProgress = async (
  userId: string,
  moduleKey: string,
  progress: { progress_percent?: number; completed?: boolean }
) => {
  const { data, error } = await supabase
    .from('learning_progress')
    .upsert(
      {
        user_id: userId,
        module_key: moduleKey,
        ...progress,
        last_updated: new Date().toISOString(),
      },
      { onConflict: 'user_id, module_key' }
    )
    .select()
    .single();
  if (error) throw error;
  return data;
};

// ===== Messages =====

export const getConversation = async (conversationId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const sendMessage = async (message: {
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single();

    if (error) {
      // Provide clearer error details for callers while preserving original error
      // eslint-disable-next-line no-console
      console.error('sendMessage supabase error:', error);
      throw new Error(error.message || JSON.stringify(error));
    }

    return data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('sendMessage failed:', err);
    if (err instanceof Error) throw err;
    throw new Error('Unknown error sending message');
  }
};

export const getMessages = async (conversationId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
};

// Get all messages where the user is sender or receiver (most recent first)
export const getMessagesByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
};

export const markMessagesAsRead = async (conversationId: string, userId: string) => {
  const { error } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('conversation_id', conversationId)
    .eq('receiver_id', userId)
    .eq('is_read', false);
  if (error) throw error;
};

// ===== User helpers =====
export const getUserByEmail = async (email: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
  if (error) {
    // If not found return null
    if ((error as any).code === 'PGRST116') return null;
    throw error;
  }
  return data;
};

// ===== Mentor / Mentee helpers =====
export const getMenteesForMentor = async (mentorId: string) => {
  const { data: sessions, error: sError } = await supabase
    .from('mentorship_sessions')
    .select('mentee_id')
    .eq('mentor_id', mentorId);
  if (sError) throw sError;
  const menteeIds = Array.from(new Set((sessions || []).map((s: any) => s.mentee_id).filter(Boolean)));
  if (menteeIds.length === 0) return [];
  const { data, error } = await supabase.from('users').select('*').in('id', menteeIds);
  if (error) throw error;
  return data;
};

export const getAvailableMentees = async () => {
  const { data, error } = await supabase.from('users').select('*').eq('role', 'mentee').order('name', { ascending: true });
  if (error) throw error;
  return data;
};

// ===== Resources =====
export const getResources = async () => {
  const { data, error } = await supabase.from('resources').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getResourcesByUser = async (userId: string) => {
  const { data, error } = await supabase.from('resources').select('*').eq('uploaded_by', userId).order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createResource = async (resource: {
  title: string;
  url: string;
  type?: string;
  size?: string;
  uploaded_by?: string;
}) => {
  const { data, error } = await supabase.from('resources').insert([resource]).select().single();
  if (error) throw error;
  return data;
};

// ===== Mentor stats =====
export const getMentorStats = async (mentorId: string) => {
  const { data: allSessions, error } = await supabase.from('mentorship_sessions').select('*').eq('mentor_id', mentorId);
  if (error) throw error;

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

  const sessionsThisMonth = (allSessions || []).filter((s: any) => s.scheduled_at && s.scheduled_at >= monthStart && s.scheduled_at < monthEnd).length;
  const hoursMentored = (allSessions || []).filter((s: any) => s.status === 'completed' && s.duration_minutes).reduce((sum: number, s: any) => sum + (s.duration_minutes || 0), 0) / 60;
  const activeMentees = new Set((allSessions || []).map((s: any) => s.mentee_id)).size;

  // Calculate impact score from ratings
  const { data: ratings } = await supabase.from('session_ratings').select('rating').eq('mentor_id', mentorId);
  const impactScore = ratings && ratings.length > 0 ? Math.round((ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / ratings.length) * 10) / 10 : 0;

  return { sessionsThisMonth, hoursMentored, activeMentees, impactScore };
};

// ===== Mentor/Mentee Profiles =====
export const getProfileByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('mentor_mentee_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) {
    if ((error as any).code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data;
};

export const createOrUpdateProfile = async (userId: string, profile: {
  profile_picture_url?: string;
  about_bio?: string;
  expertise_topics?: string[];
}) => {
  const { data, error } = await supabase
    .from('mentor_mentee_profiles')
    .upsert(
      {
        user_id: userId,
        ...profile,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const getMenteeProfiles = async (limit?: number) => {
  let query = supabase
    .from('mentor_mentee_profiles')
    .select('*, users!user_id(id, name, email, avatar_url)')
    .order('updated_at', { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const getMentorProfiles = async (limit?: number) => {
  let query = supabase
    .from('mentor_mentee_profiles')
    .select('*, users!user_id(id, name, email, avatar_url, role)')
    .eq('users.role', 'mentor')
    .order('updated_at', { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const getAvailableMenteesForMentor = async (mentorId: string) => {
  // Returns mentees that this mentor has not yet matched with (those with is_open_for_mentorship = true and no mentor_id assigned by this mentor)
  const { data, error } = await supabase
    .from('mentor_mentee_profiles')
    .select('*, users!user_id(id, name, email, avatar_url)')
    .eq('is_open_for_mentorship', true)
    .is('mentor_id', null)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const assignMentorToMentee = async (menteeId: string, mentorId: string) => {
  // When a mentee is matched with a mentor
  const { data, error } = await supabase
    .from('mentor_mentee_profiles')
    .update({
      mentor_id: mentorId,
      is_open_for_mentorship: false,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', menteeId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const releaseMenteeFromMentor = async (menteeId: string) => {
  // When mentorship ends, mark mentee as open again
  const { data, error } = await supabase
    .from('mentor_mentee_profiles')
    .update({
      mentor_id: null,
      is_open_for_mentorship: true,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', menteeId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const getMenteesByMentor = async (mentorId: string) => {
  // Get all mentees assigned to this mentor
  const { data, error } = await supabase
    .from('mentor_mentee_profiles')
    .select('*, users!user_id(id, name, email, avatar_url)')
    .eq('mentor_id', mentorId)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data;
};
// ===== Session Ratings =====

export const submitSessionRating = async (
  sessionId: string,
  menteeId: string,
  mentorId: string,
  rating: number,
  comment?: string
) => {
  const { data, error } = await supabase
    .from('session_ratings')
    .upsert(
      {
        session_id: sessionId,
        mentee_id: menteeId,
        mentor_id: mentorId,
        rating,
        comment,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'session_id' }
    )
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const getSessionRating = async (sessionId: string) => {
  const { data, error } = await supabase
    .from('session_ratings')
    .select('*')
    .eq('session_id', sessionId)
    .maybeSingle();
  if (error) throw error;
  return data;
};

export const getMentorRatings = async (mentorId: string) => {
  const { data, error } = await supabase
    .from('session_ratings')
    .select('*')
    .eq('mentor_id', mentorId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getMentorAverageRating = async (mentorId: string) => {
  const { data, error } = await supabase
    .from('session_ratings')
    .select('rating')
    .eq('mentor_id', mentorId);
  if (error) throw error;
  
  if (!data || data.length === 0) return 0;
  const avg = data.reduce((sum: number, r: any) => sum + r.rating, 0) / data.length;
  return Math.round(avg * 10) / 10; // Round to 1 decimal place
};