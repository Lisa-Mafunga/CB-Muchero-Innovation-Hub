import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/app/components/ui/alert-dialog';
import { MessageSquare, LogOut } from 'lucide-react';

interface MentorProfileCardProps {
  mentor: any;
  onMessage?: (mentor: any) => void;
  onEndMentorship?: () => void;
}

export const MentorProfileCard: React.FC<MentorProfileCardProps> = ({ mentor, onMessage, onEndMentorship }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Mentor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mentor Info */}
        <div className="flex gap-4">
          {mentor.profile?.profile_picture_url && (
            <img
              src={mentor.profile?.profile_picture_url}
              alt={mentor.name}
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{mentor.name}</h3>
            <p className="text-sm text-gray-600">{mentor.profile?.about_bio}</p>
          </div>
        </div>

        {/* Topics */}
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-2">
            Mentoring Topics
          </label>
          <div className="flex flex-wrap gap-2">
            {mentor.profile?.expertise_topics?.map((topic: string) => (
              <Badge key={topic} variant="secondary">
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          {onMessage && (
            <Button onClick={() => onMessage(mentor)} className="w-full">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message Mentor
            </Button>
          )}
          {onEndMentorship && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                  <LogOut className="w-4 h-4 mr-2" />
                  End Mentorship
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>End Mentorship?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will end your mentorship with {mentor.name}. You will be marked as available for new mentors.
                </AlertDialogDescription>
                <div className="flex gap-2 justify-end mt-4">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onEndMentorship} className="bg-red-600 hover:bg-red-700">
                    End Mentorship
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
