import React, { useState } from 'react';
import { Users, Calendar, MessageSquare, BookOpen, Award, TrendingUp, Video } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const MentorDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAuthenticated || user?.role !== 'mentor') {
    return <Navigate to="/signin" />;
  }

  const mentees = [
    {
      id: '1',
      name: 'Nyasha Takudzwa',
      focus: 'Web Development',
      progress: 65,
      nextSession: 'Feb 10, 2026',
      status: 'active',
    },
    {
      id: '2',
      name: 'Grace Moyo',
      focus: 'Digital Marketing',
      progress: 45,
      nextSession: 'Feb 12, 2026',
      status: 'active',
    },
    {
      id: '3',
      name: 'Tendai Ncube',
      focus: 'Data Analysis',
      progress: 80,
      nextSession: 'Feb 15, 2026',
      status: 'active',
    },
  ];

  const upcomingSessions = [
    {
      id: '1',
      mentee: 'Nyasha Takudzwa',
      date: 'February 10, 2026',
      time: '2:00 PM',
      topic: 'React Hooks & State Management',
      type: 'video',
    },
    {
      id: '2',
      mentee: 'Grace Moyo',
      date: 'February 12, 2026',
      time: '4:00 PM',
      topic: 'Social Media Strategy',
      type: 'video',
    },
  ];

  const resources = [
    { title: 'Mentoring Best Practices Guide', type: 'PDF', downloads: 145 },
    { title: 'Goal Setting Worksheet', type: 'PDF', downloads: 203 },
    { title: 'Progress Tracking Template', type: 'Excel', downloads: 189 },
    { title: 'Effective Communication in Mentorship', type: 'Video', downloads: 156 },
  ];

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
                  <p className="text-3xl font-bold text-gray-900">{mentees.length}</p>
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
                  <p className="text-3xl font-bold text-gray-900">8</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="text-blue-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Hours Mentored</p>
                  <p className="text-3xl font-bold text-gray-900">42</p>
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
                  <p className="text-3xl font-bold text-gray-900">4.8</p>
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
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mentees">My Mentees</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Sessions */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Upcoming Sessions</h3>
                    <Calendar className="text-purple-600" size={20} />
                  </div>
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="border-l-4 border-purple-600 pl-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{session.mentee}</p>
                            <p className="text-sm text-gray-600">{session.topic}</p>
                            <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                              <span>{session.date}</span>
                              <span>•</span>
                              <span>{session.time}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Video size={16} className="mr-1" />
                            Join
                          </Button>
                        </div>
                      </div>
                    ))}
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
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        N
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">Nyasha Takudzwa</p>
                        <p className="text-sm text-gray-600">
                          Thank you for the session! The React concepts are now clear.
                        </p>
                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                        G
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">Grace Moyo</p>
                        <p className="text-sm text-gray-600">
                          Can we schedule an extra session this week?
                        </p>
                        <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Messages
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* My Mentees Tab */}
          <TabsContent value="mentees">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentees.map((mentee) => (
                <Card key={mentee.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {mentee.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{mentee.name}</h3>
                        <p className="text-sm text-gray-600">{mentee.focus}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold text-gray-900">{mentee.progress}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${mentee.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      Next Session: {mentee.nextSession}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Schedule New Session</h3>
                <Button className="bg-purple-600 hover:bg-purple-700 mb-6">
                  <Calendar className="mr-2" size={18} />
                  Create New Session
                </Button>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">All Upcoming Sessions</h4>
                  {upcomingSessions.map((session) => (
                    <Card key={session.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{session.mentee}</p>
                            <p className="text-sm text-gray-600">{session.topic}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {session.date} at {session.time}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm">
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
                  <BookOpen className="text-purple-600" size={24} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <Badge className="mb-2">{resource.type}</Badge>
                            <h4 className="font-semibold text-gray-900 mb-2">{resource.title}</h4>
                            <p className="text-xs text-gray-500">
                              {resource.downloads} downloads
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="w-full mt-3">
                          Download
                        </Button>
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
