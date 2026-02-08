import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Upload } from 'lucide-react';
import { getProfileByUserId, createOrUpdateProfile, uploadAvatar } from '@/utils/supabaseDatabase';

interface ProfileEditorProps {
  userId: string;
  userName: string;
  userRole: 'mentor' | 'mentee';
  onProfileUpdated?: (profile: any) => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({
  userId,
  userName,
  userRole,
  onProfileUpdated,
}) => {
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [aboutBio, setAboutBio] = useState('');
  const [expertiseTopics, setExpertiseTopics] = useState<string[]>([]);
  const [topicInput, setTopicInput] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfileByUserId(userId);
        setProfile(data);
        if (data) {
          setAboutBio(data.about_bio || '');
          setExpertiseTopics(data.expertise_topics || []);
          setProfileImageUrl(data.profile_picture_url || '');
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('Image must be smaller than 10MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    setProfileImage(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfileImageUrl(event.target?.result as string);
    };
    reader.onerror = () => {
      alert('Failed to read image file');
    };
    reader.readAsDataURL(file);
  };

  const handleAddTopic = () => {
    if (topicInput.trim() && !expertiseTopics.includes(topicInput.trim())) {
      setExpertiseTopics([...expertiseTopics, topicInput.trim()]);
      setTopicInput('');
    }
  };

  const handleRemoveTopic = (topic: string) => {
    setExpertiseTopics(expertiseTopics.filter((t) => t !== topic));
  };

  const handleSaveProfile = async () => {
    try {
      if (!aboutBio.trim()) {
        alert('Please add an about section');
        return;
      }

      setSaving(true);
      let finalImageUrl = profileImageUrl;

      // Only upload if file was selected
      if (profileImage) {
        try {
          finalImageUrl = await uploadAvatar(userId, profileImage);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Error uploading image:', err);
          alert('Failed to upload image. Profile saved without image.');
        }
      }

      const updatedProfile = await createOrUpdateProfile(userId, {
        profile_picture_url: finalImageUrl,
        about_bio: aboutBio,
        expertise_topics: expertiseTopics.length > 0 ? expertiseTopics : [],
      });

      setProfile(updatedProfile);
      setProfileImage(null);

      if (onProfileUpdated) {
        onProfileUpdated(updatedProfile);
      }

      alert('Profile saved successfully!');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error saving profile:', err);
      alert('Failed to save profile: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">Loading profile...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Side - Profile Picture */}
      <div className="flex justify-center">
        <div className="w-full max-w-md">
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
        </div>
      </div>

      {/* Right Side - Profile Form */}
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Name (read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
              <Input value={userName} disabled className="bg-gray-100" />
            </div>

            {/* About */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">About</label>
              <Textarea
                value={aboutBio}
                onChange={(e) => setAboutBio(e.target.value)}
                placeholder={`Tell ${userRole === 'mentor' ? 'mentees about yourself, your expertise, and experience' : 'mentors about your goals, interests, and what you want to learn'}...`}
                className="h-24 resize-none"
              />
            </div>

            {/* Expertise Topics */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {userRole === 'mentor' ? 'Expertise Topics' : 'Learning Topics'}
              </label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTopic()}
                  placeholder="Add a topic and press Enter"
                />
                <Button onClick={handleAddTopic} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {expertiseTopics.map((topic) => (
                  <div
                    key={topic}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {topic}
                    <button
                      onClick={() => handleRemoveTopic(topic)}
                      className="text-blue-600 hover:text-blue-900 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSaveProfile}
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
