"use client"

import { useState } from "react"
import Image from "next/image"
import {
  BookOpen,
  Code,
  Database,
  FileSpreadsheet,
  Github,
  Globe,
  GraduationCap,
  LineChart,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Terminal,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AboutMe() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div
          className="text-center mb-12 transition-all duration-500 ease-in-out"
          style={{ opacity: 1, transform: "translateY(0)" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">Data Science Student & Aspiring Data Engineer</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div
            className="lg:col-span-1 transition-all duration-500 ease-in-out"
            style={{ opacity: 1, transform: "translateX(0)" }}
          >
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <div className="relative h-40 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="rounded-full border-4 border-gray-800 overflow-hidden h-32 w-32">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      alt="Profile"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <CardContent className="pt-20 pb-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white">John Doe</h2>
                  <p className="text-gray-400 flex items-center justify-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    Paris, France
                  </p>
                </div>

                <div className="flex justify-center space-x-3 mb-6">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-300">Data Analysis</span>
                      <span className="text-gray-400">90%</span>
                    </div>
                    <Progress value={90} className="h-2 bg-gray-700" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-300">Data Visualization</span>
                      <span className="text-gray-400">85%</span>
                    </div>
                    <Progress value={85} className="h-2 bg-gray-700" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-300">Machine Learning</span>
                      <span className="text-gray-400">75%</span>
                    </div>
                    <Progress value={75} className="h-2 bg-gray-700" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-300">Data Engineering</span>
                      <span className="text-gray-400">80%</span>
                    </div>
                    <Progress value={80} className="h-2 bg-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technologies Card */}
            <Card className="bg-gray-800 border-gray-700 mt-6">
              <CardHeader>
                <CardTitle className="text-white">Technologies</CardTitle>
                <CardDescription className="text-gray-400">Tools and languages I work with</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-900/50 text-blue-200 hover:bg-blue-900">Python</Badge>
                  <Badge className="bg-green-900/50 text-green-200 hover:bg-green-900">R</Badge>
                  <Badge className="bg-yellow-900/50 text-yellow-200 hover:bg-yellow-900">SQL</Badge>
                  <Badge className="bg-purple-900/50 text-purple-200 hover:bg-purple-900">Tableau</Badge>
                  <Badge className="bg-red-900/50 text-red-200 hover:bg-red-900">Power BI</Badge>
                  <Badge className="bg-blue-900/50 text-blue-200 hover:bg-blue-900">Pandas</Badge>
                  <Badge className="bg-green-900/50 text-green-200 hover:bg-green-900">NumPy</Badge>
                  <Badge className="bg-yellow-900/50 text-yellow-200 hover:bg-yellow-900">Scikit-learn</Badge>
                  <Badge className="bg-purple-900/50 text-purple-200 hover:bg-purple-900">TensorFlow</Badge>
                  <Badge className="bg-red-900/50 text-red-200 hover:bg-red-900">PyTorch</Badge>
                  <Badge className="bg-blue-900/50 text-blue-200 hover:bg-blue-900">Spark</Badge>
                  <Badge className="bg-green-900/50 text-green-200 hover:bg-green-900">Hadoop</Badge>
                  <Badge className="bg-yellow-900/50 text-yellow-200 hover:bg-yellow-900">Git</Badge>
                  <Badge className="bg-purple-900/50 text-purple-200 hover:bg-purple-900">Docker</Badge>
                  <Badge className="bg-red-900/50 text-red-200 hover:bg-red-900">AWS</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tabs Content */}
          <div
            className="lg:col-span-2 transition-all duration-500 ease-in-out"
            style={{ opacity: 1, transform: "translateX(0)" }}
          >
            <Tabs defaultValue="profile" onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-gray-800 p-1 mb-6">
                <TabsTrigger value="profile" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
                >
                  Education
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
                >
                  Projects
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <div className="space-y-4 transition-all duration-300 ease-in-out">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">About Me</CardTitle>
                      <CardDescription className="text-gray-400">My journey in data science</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300">
                        I am a passionate data science student with a strong interest in transforming raw data into
                        meaningful insights. My journey in the world of data began during my undergraduate studies when
                        I discovered the power of data-driven decision making.
                      </p>
                      <p className="text-gray-300">
                        Currently pursuing a Master's degree in Data Science, I am focused on developing my skills in
                        machine learning, statistical analysis, and data engineering. I am particularly interested in
                        how data can be used to solve real-world problems and drive innovation across various
                        industries.
                      </p>
                      <p className="text-gray-300">
                        Outside of academics, I enjoy participating in data science competitions, contributing to
                        open-source projects, and exploring new technologies. I believe in the power of community and
                        knowledge sharing, which is why I actively participate in data science forums and meetups.
                      </p>

                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-white mb-3">Areas of Interest</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start">
                            <div className="bg-blue-900/30 p-2 rounded-lg mr-3">
                              <LineChart className="h-5 w-5 text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">Predictive Analytics</h4>
                              <p className="text-sm text-gray-400">Building models to forecast trends and behaviors</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="bg-green-900/30 p-2 rounded-lg mr-3">
                              <Database className="h-5 w-5 text-green-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">Big Data Processing</h4>
                              <p className="text-sm text-gray-400">Working with large-scale data systems</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="bg-purple-900/30 p-2 rounded-lg mr-3">
                              <Sparkles className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">Machine Learning</h4>
                              <p className="text-sm text-gray-400">Developing algorithms that learn from data</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="bg-yellow-900/30 p-2 rounded-lg mr-3">
                              <FileSpreadsheet className="h-5 w-5 text-yellow-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">Data Visualization</h4>
                              <p className="text-sm text-gray-400">
                                Creating compelling visual representations of data
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education">
                <div className="space-y-4 transition-all duration-300 ease-in-out">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Education</CardTitle>
                      <CardDescription className="text-gray-400">My academic journey</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        <div className="relative pl-8 border-l border-gray-700">
                          <div className="absolute -left-3 top-0 bg-blue-600 rounded-full p-1.5">
                            <GraduationCap className="h-4 w-4 text-white" />
                          </div>
                          <div className="mb-1">
                            <span className="bg-blue-900/30 text-blue-300 text-xs px-2 py-1 rounded">
                              2022 - Present
                            </span>
                          </div>
                          <h3 className="text-lg font-medium text-white mt-2">Master of Science in Data Science</h3>
                          <p className="text-gray-400">University of Paris</p>
                          <p className="text-gray-300 mt-2">
                            Specializing in machine learning and big data technologies. Coursework includes advanced
                            statistics, deep learning, natural language processing, and distributed computing systems.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Badge className="bg-blue-900/50 text-blue-200">Machine Learning</Badge>
                            <Badge className="bg-blue-900/50 text-blue-200">Deep Learning</Badge>
                            <Badge className="bg-blue-900/50 text-blue-200">Big Data</Badge>
                            <Badge className="bg-blue-900/50 text-blue-200">NLP</Badge>
                          </div>
                        </div>

                        <div className="relative pl-8 border-l border-gray-700">
                          <div className="absolute -left-3 top-0 bg-green-600 rounded-full p-1.5">
                            <BookOpen className="h-4 w-4 text-white" />
                          </div>
                          <div className="mb-1">
                            <span className="bg-green-900/30 text-green-300 text-xs px-2 py-1 rounded">
                              2018 - 2022
                            </span>
                          </div>
                          <h3 className="text-lg font-medium text-white mt-2">
                            Bachelor of Science in Computer Science
                          </h3>
                          <p className="text-gray-400">University of Lyon</p>
                          <p className="text-gray-300 mt-2">
                            Focused on programming fundamentals, algorithms, and data structures. Developed a strong
                            foundation in software development and database management. Minor in Mathematics.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Badge className="bg-green-900/50 text-green-200">Algorithms</Badge>
                            <Badge className="bg-green-900/50 text-green-200">Database Systems</Badge>
                            <Badge className="bg-green-900/50 text-green-200">Software Engineering</Badge>
                            <Badge className="bg-green-900/50 text-green-200">Mathematics</Badge>
                          </div>
                        </div>

                        <div className="relative pl-8 border-l border-gray-700">
                          <div className="absolute -left-3 top-0 bg-purple-600 rounded-full p-1.5">
                            <Terminal className="h-4 w-4 text-white" />
                          </div>
                          <div className="mb-1">
                            <span className="bg-purple-900/30 text-purple-300 text-xs px-2 py-1 rounded">2023</span>
                          </div>
                          <h3 className="text-lg font-medium text-white mt-2">Data Engineering Certification</h3>
                          <p className="text-gray-400">DataCamp</p>
                          <p className="text-gray-300 mt-2">
                            Comprehensive certification covering data pipeline development, ETL processes, and
                            cloud-based data solutions.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Badge className="bg-purple-900/50 text-purple-200">ETL</Badge>
                            <Badge className="bg-purple-900/50 text-purple-200">Data Pipelines</Badge>
                            <Badge className="bg-purple-900/50 text-purple-200">Cloud Solutions</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience">
                <div className="space-y-4 transition-all duration-300 ease-in-out">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Professional Experience</CardTitle>
                      <CardDescription className="text-gray-400">My work and internship history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        <div className="relative pl-8 border-l border-gray-700">
                          <div className="absolute -left-3 top-0 bg-blue-600 rounded-full p-1.5">
                            <Database className="h-4 w-4 text-white" />
                          </div>
                          <div className="mb-1">
                            <span className="bg-blue-900/30 text-blue-300 text-xs px-2 py-1 rounded">Summer 2023</span>
                          </div>
                          <h3 className="text-lg font-medium text-white mt-2">Data Science Intern</h3>
                          <p className="text-gray-400">TechCorp, Paris</p>
                          <p className="text-gray-300 mt-2">
                            Worked on developing predictive models for customer churn analysis. Implemented data
                            pipelines for automated data processing and model training. Collaborated with
                            cross-functional teams to integrate machine learning solutions into existing products.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Badge className="bg-blue-900/50 text-blue-200">Python</Badge>
                            <Badge className="bg-blue-900/50 text-blue-200">Scikit-learn</Badge>
                            <Badge className="bg-blue-900/50 text-blue-200">SQL</Badge>
                            <Badge className="bg-blue-900/50 text-blue-200">Airflow</Badge>
                          </div>
                        </div>

                        <div className="relative pl-8 border-l border-gray-700">
                          <div className="absolute -left-3 top-0 bg-green-600 rounded-full p-1.5">
                            <LineChart className="h-4 w-4 text-white" />
                          </div>
                          <div className="mb-1">
                            <span className="bg-green-900/30 text-green-300 text-xs px-2 py-1 rounded">
                              2022 - 2023
                            </span>
                          </div>
                          <h3 className="text-lg font-medium text-white mt-2">Research Assistant</h3>
                          <p className="text-gray-400">University of Paris, Data Science Lab</p>
                          <p className="text-gray-300 mt-2">
                            Assisted in research projects focused on natural language processing and sentiment analysis.
                            Developed and evaluated machine learning models for text classification. Co-authored a
                            research paper on sentiment analysis techniques for social media data.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Badge className="bg-green-900/50 text-green-200">NLP</Badge>
                            <Badge className="bg-green-900/50 text-green-200">PyTorch</Badge>
                            <Badge className="bg-green-900/50 text-green-200">BERT</Badge>
                            <Badge className="bg-green-900/50 text-green-200">Research</Badge>
                          </div>
                        </div>

                        <div className="relative pl-8 border-l border-gray-700">
                          <div className="absolute -left-3 top-0 bg-purple-600 rounded-full p-1.5">
                            <Code className="h-4 w-4 text-white" />
                          </div>
                          <div className="mb-1">
                            <span className="bg-purple-900/30 text-purple-300 text-xs px-2 py-1 rounded">
                              2021 - 2022
                            </span>
                          </div>
                          <h3 className="text-lg font-medium text-white mt-2">Software Developer (Part-time)</h3>
                          <p className="text-gray-400">StartupX, Lyon</p>
                          <p className="text-gray-300 mt-2">
                            Developed and maintained web applications using React and Node.js. Implemented data
                            visualization dashboards using D3.js. Worked on integrating third-party APIs and optimizing
                            database queries.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Badge className="bg-purple-900/50 text-purple-200">JavaScript</Badge>
                            <Badge className="bg-purple-900/50 text-purple-200">React</Badge>
                            <Badge className="bg-purple-900/50 text-purple-200">Node.js</Badge>
                            <Badge className="bg-purple-900/50 text-purple-200">D3.js</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects">
                <div className="space-y-4 transition-all duration-300 ease-in-out">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Projects</CardTitle>
                      <CardDescription className="text-gray-400">Showcasing my data science work</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-700/50 rounded-lg overflow-hidden">
                          <div className="h-40 bg-gradient-to-r from-blue-600 to-purple-600 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <LineChart className="h-12 w-12 text-white" />
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-medium text-white">Predictive Analytics Dashboard</h3>
                            <p className="text-gray-400 text-sm mt-1">
                              A comprehensive dashboard for sales forecasting and trend analysis using machine learning
                              algorithms.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Badge className="bg-blue-900/50 text-blue-200">Python</Badge>
                              <Badge className="bg-blue-900/50 text-blue-200">Streamlit</Badge>
                              <Badge className="bg-blue-900/50 text-blue-200">Prophet</Badge>
                            </div>
                            <div className="mt-4">
                              <Button variant="outline" size="sm" className="w-full">
                                View Project
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-700/50 rounded-lg overflow-hidden">
                          <div className="h-40 bg-gradient-to-r from-green-600 to-teal-600 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Database className="h-12 w-12 text-white" />
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-medium text-white">Data Pipeline Automation</h3>
                            <p className="text-gray-400 text-sm mt-1">
                              An ETL pipeline for processing and analyzing large datasets from multiple sources.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Badge className="bg-green-900/50 text-green-200">Apache Airflow</Badge>
                              <Badge className="bg-green-900/50 text-green-200">AWS</Badge>
                              <Badge className="bg-green-900/50 text-green-200">Spark</Badge>
                            </div>
                            <div className="mt-4">
                              <Button variant="outline" size="sm" className="w-full">
                                View Project
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-700/50 rounded-lg overflow-hidden">
                          <div className="h-40 bg-gradient-to-r from-yellow-600 to-orange-600 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Sparkles className="h-12 w-12 text-white" />
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-medium text-white">Sentiment Analysis Tool</h3>
                            <p className="text-gray-400 text-sm mt-1">
                              A machine learning model for analyzing sentiment in customer reviews and social media
                              posts.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Badge className="bg-yellow-900/50 text-yellow-200">BERT</Badge>
                              <Badge className="bg-yellow-900/50 text-yellow-200">PyTorch</Badge>
                              <Badge className="bg-yellow-900/50 text-yellow-200">Flask</Badge>
                            </div>
                            <div className="mt-4">
                              <Button variant="outline" size="sm" className="w-full">
                                View Project
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-700/50 rounded-lg overflow-hidden">
                          <div className="h-40 bg-gradient-to-r from-purple-600 to-pink-600 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <FileSpreadsheet className="h-12 w-12 text-white" />
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-medium text-white">Interactive Data Visualization</h3>
                            <p className="text-gray-400 text-sm mt-1">
                              A web-based platform for creating interactive and customizable data visualizations.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Badge className="bg-purple-900/50 text-purple-200">D3.js</Badge>
                              <Badge className="bg-purple-900/50 text-purple-200">React</Badge>
                              <Badge className="bg-purple-900/50 text-purple-200">Node.js</Badge>
                            </div>
                            <div className="mt-4">
                              <Button variant="outline" size="sm" className="w-full">
                                View Project
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
