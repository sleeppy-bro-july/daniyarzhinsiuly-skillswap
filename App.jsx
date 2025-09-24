import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SortMenu from './components/SortMenu';
import Feed from './components/Feed';
import Profile from './components/Profile';
import DirectMessages from './components/DirectMessages';
import CreatePostModal from './components/CreatePostModal';
import ProfileEditModal from './components/ProfileEditModal';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import TrendingSidebar from './components/TrendingSidebar';
import Registration from './components/Registration';
import Login from './components/Login';
import './App.css';

function App() {
  // Global state management
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('feed'); // 'feed', 'profile', 'messages', or 'analytics'
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [showAuth, setShowAuth] = useState(false); // Show auth modal
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  // Default avatar for users without profile pictures
  const defaultAvatar = '/default-avatar.svg';

  // Demo data for users with enhanced LinkedIn-style profiles
  const demoUsers = [
    {
      id: 1,
      username: 'alex_dev',
      displayName: 'Alex Developer',
      email: 'alex@example.com',
      bio: 'Full-stack developer passionate about React and Node.js. Building the future of web applications.',
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      joinDate: '2023-01-15',
      skills: ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB'],
      postsCount: 12,
      followersCount: 234,
      followingCount: 89,
      // LinkedIn-style sections
      currentJob: {
        title: 'Senior Full-Stack Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        startDate: '2022-03-01',
        description: 'Leading development of scalable web applications using React and Node.js'
      },
      education: [
        {
          school: 'Stanford University',
          degree: 'Bachelor of Science in Computer Science',
          field: 'Computer Science',
          startDate: '2018-09-01',
          endDate: '2022-06-01',
          description: 'Graduated Magna Cum Laude'
        }
      ],
      experience: [
        {
          title: 'Senior Full-Stack Developer',
          company: 'TechCorp Inc.',
          location: 'San Francisco, CA',
          startDate: '2022-03-01',
          endDate: null,
          description: 'Leading development of scalable web applications'
        },
        {
          title: 'Full-Stack Developer',
          company: 'StartupXYZ',
          location: 'San Francisco, CA',
          startDate: '2021-06-01',
          endDate: '2022-02-28',
          description: 'Developed and maintained web applications using React and Node.js'
        }
      ],
      // Response suggestions
      responseSuggestions: [
        "Great post! I'd love to learn more about this.",
        "This is really helpful, thanks for sharing!",
        "I have experience with this too. Happy to connect!",
        "Interesting perspective! What do you think about...",
        "Thanks for the insights! This is exactly what I needed."
      ]
    },
    {
      id: 2,
      username: 'sarah_designer',
      displayName: 'Sarah Designer',
      email: 'sarah@example.com',
      bio: 'UI/UX Designer creating beautiful digital experiences. Passionate about user-centered design.',
      profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      joinDate: '2023-03-22',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'User Research', 'Prototyping'],
      postsCount: 8,
      followersCount: 156,
      followingCount: 67,
      currentJob: {
        title: 'Senior UI/UX Designer',
        company: 'DesignStudio Pro',
        location: 'New York, NY',
        startDate: '2021-08-01',
        description: 'Creating intuitive and beautiful user experiences for mobile and web applications'
      },
      education: [
        {
          school: 'Art Center College of Design',
          degree: 'Bachelor of Fine Arts',
          field: 'Graphic Design',
          startDate: '2017-09-01',
          endDate: '2021-06-01',
          description: 'Specialized in Digital Design and User Experience'
        }
      ],
      experience: [
        {
          title: 'Senior UI/UX Designer',
          company: 'DesignStudio Pro',
          location: 'New York, NY',
          startDate: '2021-08-01',
          endDate: null,
          description: 'Leading design projects for Fortune 500 companies'
        },
        {
          title: 'UI Designer',
          company: 'Creative Agency',
          location: 'New York, NY',
          startDate: '2020-01-01',
          endDate: '2021-07-31',
          description: 'Designed user interfaces for various client projects'
        }
      ],
      responseSuggestions: [
        "Love your design work! The attention to detail is amazing.",
        "This is such a clean design approach. Well done!",
        "I'd love to collaborate on a project sometime!",
        "Great insights on user experience design!",
        "Your portfolio is inspiring! Keep up the great work."
      ]
    },
    {
      id: 3,
      username: 'mike_analyst',
      displayName: 'Mike Data Analyst',
      email: 'mike@example.com',
      bio: 'Data analyst helping businesses make data-driven decisions. Expert in Python, SQL, and visualization.',
      profilePicture: defaultAvatar, // Using default avatar
      joinDate: '2023-02-10',
      skills: ['Python', 'SQL', 'Tableau', 'Excel', 'Machine Learning', 'Statistics'],
      postsCount: 15,
      followersCount: 189,
      followingCount: 45,
      currentJob: {
        title: 'Senior Data Analyst',
        company: 'DataInsights Corp',
        location: 'Seattle, WA',
        startDate: '2020-05-01',
        description: 'Analyzing complex datasets to provide actionable business insights'
      },
      education: [
        {
          school: 'University of Washington',
          degree: 'Master of Science',
          field: 'Data Science',
          startDate: '2018-09-01',
          endDate: '2020-05-01',
          description: 'Thesis on Machine Learning Applications in Business Analytics'
        },
        {
          school: 'University of California, Berkeley',
          degree: 'Bachelor of Science',
          field: 'Mathematics',
          startDate: '2014-09-01',
          endDate: '2018-06-01',
          description: 'Minor in Computer Science'
        }
      ],
      experience: [
        {
          title: 'Senior Data Analyst',
          company: 'DataInsights Corp',
          location: 'Seattle, WA',
          startDate: '2020-05-01',
          endDate: null,
          description: 'Leading data analysis projects for enterprise clients'
        },
        {
          title: 'Data Analyst',
          company: 'Analytics Solutions',
          location: 'Seattle, WA',
          startDate: '2019-01-01',
          endDate: '2020-04-30',
          description: 'Developed dashboards and reports for business stakeholders'
        }
      ],
      responseSuggestions: [
        "Great analysis! The data visualization is really clear.",
        "This is exactly the kind of insight I was looking for!",
        "I'd love to discuss your methodology sometime.",
        "Excellent work on the statistical analysis!",
        "Thanks for sharing these insights. Very helpful!"
      ]
    },
    // Demo bots for live video
    {
      id: 4,
      username: 'ai_assistant',
      displayName: 'AI Assistant Bot',
      email: 'bot@skillswap.ai',
      bio: 'I\'m an AI assistant here to help you with your questions about SkillSwap!',
      profilePicture: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&h=150&fit=crop&crop=face',
      joinDate: '2023-01-01',
      skills: ['AI', 'Machine Learning', 'Natural Language Processing'],
      postsCount: 0,
      followersCount: 999,
      followingCount: 1,
      isBot: true,
      responseSuggestions: [
        "Hello! How can I help you today?",
        "I'm here to assist with any questions you might have!",
        "Feel free to ask me anything about SkillSwap!",
        "I can help you navigate the platform!",
        "What would you like to know?"
      ]
    },
    {
      id: 5,
      username: 'demo_bot',
      displayName: 'Demo Bot',
      email: 'demo@skillswap.ai',
      bio: 'Demo bot for live presentations. Ask me anything!',
      profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      joinDate: '2023-01-01',
      skills: ['Demo', 'Presentation', 'Live Support'],
      postsCount: 0,
      followersCount: 500,
      followingCount: 1,
      isBot: true,
      responseSuggestions: [
        "Welcome to the demo! This is amazing!",
        "I'm impressed with this SkillSwap platform!",
        "This looks like a great social network!",
        "The features are really well designed!",
        "I love the user interface!"
      ]
    }
  ];

  // Demo posts with enhanced data
  const demoPosts = [
    {
      id: 0,
      title: '🎥 Welcome to SkillSwap - Platform Demo',
      content: 'Welcome to SkillSwap! This is a professional social networking platform that connects students and professionals for knowledge sharing and collaboration. Watch this demo to see all the amazing features in action!',
      category: 'Platform Demo',
      skillLevel: 'beginner',
      author: demoUsers[4], // Demo Bot
      createdAt: new Date(Date.now() - 1 * 60 * 1000).toISOString(), // 1 minute ago
      likes: 42,
      likedBy: [],
      isVideoPost: true,
      videoEmbed: '<div style="position: relative; padding-bottom: 64.5933014354067%; height: 0;"><iframe src="https://www.loom.com/embed/5ccf5c9dd9bd43f0b5d5ea2610d350de?sid=3edb5b6f-8a81-403c-bfce-4ef2994d1df0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
      comments: [
        {
          id: 0,
          content: 'This platform looks incredible! The features are so well designed.',
          author: demoUsers[0],
          createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString()
        },
        {
          id: 1,
          content: 'Amazing demo! I love the professional networking features.',
          author: demoUsers[1],
          createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
        }
      ]
    },
    {
      id: 1,
      title: 'Building a React Component Library',
      content: 'Just finished creating a comprehensive component library for our team. It includes buttons, modals, forms, and more. The key was making it both flexible and consistent. Would love to hear your thoughts on component architecture!',
      category: 'Programming',
      skillLevel: 'advanced',
      author: demoUsers[0],
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: 24,
      likedBy: [],
      comments: [
        {
          id: 2,
          content: 'Great work! Would love to see the documentation.',
          author: demoUsers[1],
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
        }
      ]
    },
    {
      id: 2,
      title: 'Design System Best Practices',
      content: 'After working on multiple projects, I\'ve learned that consistency is key. Here are my top 5 tips for creating maintainable design systems: 1) Start with atomic design principles, 2) Document everything, 3) Version control your components, 4) Test with real users, 5) Iterate based on feedback.',
      category: 'Design',
      skillLevel: 'intermediate',
      author: demoUsers[1],
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      likes: 18,
      likedBy: [],
      comments: []
    },
    {
      id: 3,
      title: 'Data Visualization with Python',
      content: 'Created an interactive dashboard using Plotly and Dash. The insights we discovered were game-changing for our business strategy. The key was asking the right questions and choosing the right visualization types.',
      category: 'Data Science',
      skillLevel: 'advanced',
      author: demoUsers[2],
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      likes: 31,
      likedBy: [],
      comments: [
        {
          id: 2,
          content: 'Amazing insights! What data sources did you use?',
          author: demoUsers[0],
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
        }
      ]
    }
  ];

  // Demo conversations
  const demoConversations = [
    {
      id: 1,
      participants: [demoUsers[0], demoUsers[4]], // Alex and Demo Bot
      messages: [
        {
          id: 1,
          sender: demoUsers[4],
          content: 'Welcome to SkillSwap! I\'m here to help you explore the platform.',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
        },
        {
          id: 2,
          sender: demoUsers[0],
          content: 'Thanks! This looks amazing. Can you tell me about the features?',
          timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString()
        },
        {
          id: 3,
          sender: demoUsers[4],
          content: 'Absolutely! You can create posts, like and comment, view profiles, and send direct messages. The platform supports both light and dark themes too!',
          timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString()
        }
      ],
      lastMessage: new Date(Date.now() - 20 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      participants: [demoUsers[0], demoUsers[1]], // Alex and Sarah
      messages: [
        {
          id: 4,
          sender: demoUsers[1],
          content: 'Hi Alex! I saw your post about the React component library. It looks fantastic!',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 5,
          sender: demoUsers[0],
          content: 'Thank you Sarah! I\'d love to get your design perspective on it.',
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString()
        }
      ],
      lastMessage: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString()
    }
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    const savedUsers = localStorage.getItem('users');
    const savedCurrentUser = localStorage.getItem('currentUser');
    const savedTheme = localStorage.getItem('theme');
    const savedConversations = localStorage.getItem('conversations');
    
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (error) {
        console.error('Error parsing saved posts:', error);
        setPosts(demoPosts);
      }
    } else {
      setPosts(demoPosts);
    }
    
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (error) {
        console.error('Error parsing saved users:', error);
        setUsers(demoUsers);
      }
    } else {
      setUsers(demoUsers);
    }
    
    if (savedCurrentUser) {
      try {
        setCurrentUser(JSON.parse(savedCurrentUser));
      } catch (error) {
        console.error('Error parsing saved current user:', error);
        setCurrentUser(demoUsers[0]);
      }
    } else {
      setCurrentUser(demoUsers[0]);
    }
    
    if (savedConversations) {
      try {
        setConversations(JSON.parse(savedConversations));
      } catch (error) {
        console.error('Error parsing saved conversations:', error);
        setConversations(demoConversations);
      }
    } else {
      setConversations(demoConversations);
    }
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  // Save theme to localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    // Apply theme to document body
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);

  // Post management functions
  const addPost = (newPost) => {
    const post = {
      id: Date.now(),
      ...newPost,
      author: currentUser,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      comments: []
    };
    setPosts(prevPosts => [post, ...prevPosts]);
  };

  const updatePost = (postId, updatedPost) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId ? { ...post, ...updatedPost } : post
      )
    );
  };

  const deletePost = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  const likePost = (postId) => {
    if (!currentUser) return;
    
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const isLiked = post.likedBy.includes(currentUser.id);
          if (isLiked) {
            // Unlike the post
            return {
              ...post,
              likes: post.likes - 1,
              likedBy: post.likedBy.filter(id => id !== currentUser.id)
            };
          } else {
            // Like the post
            return {
              ...post,
              likes: post.likes + 1,
              likedBy: [...post.likedBy, currentUser.id]
            };
          }
        }
        return post;
      })
    );
  };

  const addComment = (postId, comment) => {
    const newComment = {
      id: Date.now(),
      ...comment,
      author: currentUser,
      createdAt: new Date().toISOString()
    };
    
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  // User management functions
  const updateUserProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  // Message management functions
  const sendMessage = (conversationId, content) => {
    const newMessage = {
      id: Date.now(),
      sender: currentUser,
      content,
      timestamp: new Date().toISOString()
    };

    setConversations(prevConversations => 
      prevConversations.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: newMessage.timestamp
          };
        }
        return conv;
      })
    );
  };

  const startConversation = (otherUser) => {
    const existingConv = conversations.find(conv => 
      conv.participants.some(p => p.id === otherUser.id) && 
      conv.participants.some(p => p.id === currentUser.id)
    );

    if (existingConv) {
      setCurrentView('messages');
      setSelectedUser(otherUser);
      return;
    }

    const newConversation = {
      id: Date.now(),
      participants: [currentUser, otherUser],
      messages: [],
      lastMessage: new Date().toISOString()
    };

    setConversations(prev => [...prev, newConversation]);
    setCurrentView('messages');
    setSelectedUser(otherUser);
  };

  // Theme toggle function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Modal management functions
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openProfileEdit = () => {
    setIsProfileEditOpen(true);
  };

  const closeProfileEdit = () => {
    setIsProfileEditOpen(false);
  };

  // Navigation functions
  const goToFeed = () => {
    setCurrentView('feed');
    setSelectedUser(null);
  };

  const goToProfile = (user = null) => {
    setCurrentView('profile');
    setSelectedUser(user || currentUser);
  };

  const goToMessages = () => {
    setCurrentView('messages');
    setSelectedUser(null);
  };

  const goToAnalytics = () => {
    setCurrentView('analytics');
    setSelectedUser(null);
  };

  // Search and filter posts
  const getFilteredPosts = () => {
    if (!searchTerm.trim()) {
      return posts;
    }
    
    const searchLower = searchTerm.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower) ||
      (post.category && post.category.toLowerCase().includes(searchLower)) ||
      (post.skillLevel && post.skillLevel.toLowerCase().includes(searchLower)) ||
      (post.author && post.author.username.toLowerCase().includes(searchLower))
    );
  };

  // Sort posts based on current sort option
  const getSortedPosts = () => {
    const filteredPosts = getFilteredPosts();
    const sortedPosts = [...filteredPosts];
    
    switch (sortBy) {
      case 'newest':
        return sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return sortedPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'most-liked':
        return sortedPosts.sort((a, b) => b.likes - a.likes);
      case 'most-commented':
        return sortedPosts.sort((a, b) => b.comments.length - a.comments.length);
      default:
        return sortedPosts;
    }
  };

  // Handle search input
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Get posts by specific user
  const getUserPosts = (userId) => {
    return posts.filter(post => post.author && post.author.id === userId);
  };

  // Authentication functions
  const handleRegister = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
    setCurrentUser(newUser);
    setShowAuth(false);
    setAuthMode('login');
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setShowAuth(false);
    setAuthMode('login');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('feed');
    setSelectedUser(null);
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const closeAuth = () => {
    setShowAuth(false);
    setAuthMode('login');
  };

  return (
    <div className={`app ${theme}`}>
      <Navbar 
        theme={theme}
        toggleTheme={toggleTheme}
        openModal={openModal}
        onSearch={handleSearch}
        currentUser={currentUser}
        goToFeed={goToFeed}
        goToProfile={goToProfile}
        goToMessages={goToMessages}
        goToAnalytics={goToAnalytics}
        currentView={currentView}
        onLogin={() => openAuth('login')}
        onRegister={() => openAuth('register')}
        onLogout={handleLogout}
      />
      
      <div className="main-content">
        {currentView === 'feed' && (
          <>
            <TrendingSidebar 
              posts={posts}
              users={users}
              theme={theme}
            />
            
            <div className="feed-container">
              <SortMenu 
                sortBy={sortBy}
                setSortBy={setSortBy}
                theme={theme}
              />
              
              <Feed 
                posts={getSortedPosts()}
                updatePost={updatePost}
                deletePost={deletePost}
                likePost={likePost}
                addComment={addComment}
                theme={theme}
                searchTerm={searchTerm}
                currentUser={currentUser}
                defaultAvatar={defaultAvatar}
              />
            </div>

            <div className="right-sidebar">
              <div className="professional-card">
                <h3 className="professional-subheading">Quick Stats</h3>
                <div className="metrics-container">
                  <div className="metric-card">
                    <div className="metric-value">{posts.length}</div>
                    <div className="metric-label">Total Posts</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-value">{users.length}</div>
                    <div className="metric-label">Active Users</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {currentView === 'analytics' && (
          <AnalyticsDashboard 
            posts={posts}
            users={users}
            currentUser={currentUser}
            theme={theme}
          />
        )}

        {currentView === 'profile' && selectedUser && (
          <Profile 
            user={selectedUser}
            posts={getUserPosts(selectedUser.id)}
            currentUser={currentUser}
            theme={theme}
            onUserClick={goToProfile}
            onEditProfile={openProfileEdit}
            onStartConversation={startConversation}
            defaultAvatar={defaultAvatar}
          />
        )}

        {currentView === 'messages' && (
          <DirectMessages 
            conversations={conversations}
            currentUser={currentUser}
            selectedUser={selectedUser}
            onUserSelect={setSelectedUser}
            onSendMessage={sendMessage}
            theme={theme}
            defaultAvatar={defaultAvatar}
          />
        )}
      </div>

      {isModalOpen && (
        <CreatePostModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={addPost}
          theme={theme}
          currentUser={currentUser}
          defaultAvatar={defaultAvatar}
        />
      )}

      {isProfileEditOpen && (
        <ProfileEditModal 
          isOpen={isProfileEditOpen}
          onClose={closeProfileEdit}
          onSubmit={updateUserProfile}
          theme={theme}
          currentUser={currentUser}
          defaultAvatar={defaultAvatar}
        />
      )}

      {showAuth && (
        <div className="auth-overlay">
          <div className="auth-modal">
            <button className="auth-close" onClick={closeAuth}>×</button>
            {authMode === 'login' ? (
              <Login 
                onLogin={handleLogin}
                onRegister={() => setAuthMode('register')}
                theme={theme}
                defaultAvatar={defaultAvatar}
              />
            ) : (
              <Registration 
                onRegister={handleRegister}
                onLogin={() => setAuthMode('login')}
                theme={theme}
                defaultAvatar={defaultAvatar}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
