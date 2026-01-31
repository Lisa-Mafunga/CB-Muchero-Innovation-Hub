import React, { useState } from 'react';
import { Target, Calendar, BookOpen, Award, TrendingUp, Video, Download, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Progress } from '@/app/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const MenteeDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAuthenticated || user?.role !== 'mentee') {
    return <Navigate to="/signin" />;
  }

  const learningPath = [
    { title: 'Basic Computer Skills', progress: 100, status: 'completed' },
    { title: 'Microsoft Office Suite', progress: 85, status: 'in-progress' },
    { title: 'Internet & Email', progress: 60, status: 'in-progress' },
    { title: 'Digital Marketing Basics', progress: 30, status: 'in-progress' },
    { title: 'Introduction to Coding', progress: 0, status: 'not-started' },
  ];

  const upcomingSessions = [
    {
      id: '1',
      mentor: 'Sarah Chikwanha',
      date: 'February 10, 2026',
      time: '2:00 PM',
      topic: 'Excel Advanced Functions',
      type: 'video',
    },
    {
      id: '2',
      mentor: 'Sarah Chikwanha',
      date: 'February 17, 2026',
      time: '2:00 PM',
      topic: 'Email Communication Best Practices',
      type: 'video',
    },
  ];

  const availableResources = [
    { title: 'Computer Basics Handbook', type: 'PDF', size: '2.5 MB' },
    { title: 'Microsoft Excel Tutorial', type: 'Video', duration: '45 min' },
    { title: 'Digital Marketing Guide', type: 'PDF', size: '3.2 MB' },
    { title: 'Career Development Worksheet', type: 'PDF', size: '1.1 MB' },
  ];

  const achievements = [
    { title: 'First Session Completed', icon: Award, earned: true },
    { title: 'Module Master', icon: BookOpen, earned: true },
    { title: '10 Hours of Learning', icon: TrendingUp, earned: true },
    { title: 'Perfect Attendance', icon: Calendar, earned: false },
  ];

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
                  <p className="text-3xl font-bold text-gray-900">55%</p>
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
                  <p className="text-3xl font-bold text-gray-900">12</p>
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
                  <p className="text-3xl font-bold text-gray-900">18</p>
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
                  <p className="text-3xl font-bold text-gray-900">3</p>
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
            <TabsTrigger value="learning">My Learning Path</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* My Mentor */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">My Mentor</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      SC
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Sarah Chikwanha</h4>
                      <p className="text-sm text-gray-600">Digital Skills Trainer</p>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-500 text-sm">★★★★★</span>
                        <span className="text-xs text-gray-500 ml-2">5.0 rating</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <MessageSquare size={16} className="mr-1" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Sessions */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Upcoming Sessions</h3>
                    <Calendar className="text-blue-600" size={20} />
                  </div>
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="border-l-4 border-blue-600 pl-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{session.topic}</p>
                            <p className="text-sm text-gray-600">with {session.mentor}</p>
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
            </div>

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
                  {upcomingSessions.map((session) => (
                    <Card key={session.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{session.topic}</p>
                            <p className="text-sm text-gray-600">with {session.mentor}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {session.date} at {session.time}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm">
                              <Video size={16} className="mr-1" />
                              Join
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
                  <h3 className="text-lg font-bold text-gray-900">Learning Resources</h3>
                  <BookOpen className="text-blue-600" size={24} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableResources.map((resource, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <Badge className="mb-2">{resource.type}</Badge>
                            <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {resource.type === 'PDF' ? resource.size : resource.duration}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="w-full">
                          <Download size={16} className="mr-1" />
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

export default MenteeDashboard;
