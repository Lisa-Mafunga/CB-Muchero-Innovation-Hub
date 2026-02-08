import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/app/components/ui/alert-dialog';
import { MessageSquare, UserPlus, AlertCircle } from 'lucide-react';
import { getMenteeProfiles, assignMentorToMentee } from '@/utils/supabaseDatabase';

interface ProfileBrowserProps {
  currentUserId: string;
  currentUserRole: 'mentor' | 'mentee';
  currentUserProfile?: any;
  onProfileSelected?: (profile: any) => void;
}

export const ProfileBrowser: React.FC<ProfileBrowserProps> = ({
  currentUserId,
  currentUserRole,
  currentUserProfile,
  onProfileSelected,
}) => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [connectingProfileId, setConnectingProfileId] = useState<string | null>(null);
  const [connectingLoading, setConnectingLoading] = useState(false);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const data = await getMenteeProfiles();
        // Filter out current user
        const filtered = data?.filter((p: any) => p.user_id !== currentUserId) || [];
        setProfiles(filtered);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error loading profiles:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, [currentUserId]);

  const handleViewProfile = (profile: any) => {
    setSelectedProfile(profile);
    setShowDetails(true);
  };

  const handleConnectMentor = async (menteProfileId: string, menteeUserId: string) => {
    setConnectingProfileId(menteProfileId);
    setConnectingLoading(true);

    try {
      // Mentor assigns mentee to self
      await assignMentorToMentee(menteeUserId, currentUserId);

      setProfiles(
        profiles.filter((p) => p.id !== menteProfileId)
      );

      setShowDetails(false);

      if (onProfileSelected) {
        onProfileSelected({
          ...selectedProfile,
          mentor_id: currentUserId,
          is_open_for_mentorship: false,
        });
      }

      alert('Mentee connected successfully!');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error connecting mentee:', err);
      alert('Failed to connect mentee');
    } finally {
      setConnectingLoading(false);
      setConnectingProfileId(null);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-600">Loading profiles...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const availableProfiles = profiles.filter((p) => p.is_open_for_mentorship);

  if (availableProfiles.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {currentUserRole === 'mentor' ? 'Browse Mentees' : 'Browse Mentees'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-gray-600 mb-4">
              {availableProfiles.length === 0
                ? `No ${currentUserRole === 'mentor' ? 'available mentees' : 'mentees'} at the moment`
                : 'No profiles available'}
            </p>
            {currentUserId && (
              <div className="flex gap-2">
                <Link to="/profile">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Create Profile</Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            {currentUserRole === 'mentor' ? 'Browse Available Mentees' : 'Browse Mentees'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {availableProfiles.map((profile) => (
              <div
                key={profile.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                {/* Profile Header */}
                <div className="flex gap-3 mb-3">
                  {profile.profile_picture_url && (
                    <img
                      src={profile.profile_picture_url}
                      alt={profile.users?.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">{profile.users?.name || 'Anonymous'}</h3>
                    {profile.about_bio && (
                      <p className="text-sm text-gray-600 line-clamp-2">{profile.about_bio}</p>
                    )}
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-600 mb-2">
                    {currentUserRole === 'mentor' ? 'Learning Topics' : 'Topics'}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {profile.expertise_topics?.map((topic: string) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleViewProfile(profile)}
                  >
                    View Profile
                  </Button>
                  {currentUserRole === 'mentor' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" className="flex-1">
                          <UserPlus className="w-4 h-4 mr-1" />
                          Connect
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>Connect with {profile.users?.name}?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You will be assigned as their mentor. You can create mentorship sessions for them from your dashboard.
                        </AlertDialogDescription>
                        <div className="flex gap-2 justify-end mt-4">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleConnectMentor(profile.id, profile.user_id)
                            }
                            disabled={connectingLoading && connectingProfileId === profile.id}
                          >
                            {connectingLoading && connectingProfileId === profile.id
                              ? 'Connecting...'
                              : 'Connect'}
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profile Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProfile?.users?.name}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {selectedProfile?.profile_picture_url && (
              <img
                src={selectedProfile.profile_picture_url}
                alt={selectedProfile.users?.name}
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
            )}

            <div>
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-gray-700">{selectedProfile?.about_bio}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                {currentUserRole === 'mentor' ? 'Learning Topics' : 'Topics'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProfile?.expertise_topics?.map((topic: string) => (
                  <Badge key={topic} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            {currentUserRole === 'mentor' && (
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  Close
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="flex-1">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Connect as Mentor
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>
                      Connect with {selectedProfile?.users?.name}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be assigned as their mentor. You can create mentorship
                      sessions for them from your dashboard.
                    </AlertDialogDescription>
                    <div className="flex gap-2 justify-end mt-4">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          handleConnectMentor(selectedProfile.id, selectedProfile.user_id)
                        }
                        disabled={connectingLoading}
                      >
                        {connectingLoading ? 'Connecting...' : 'Connect'}
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
