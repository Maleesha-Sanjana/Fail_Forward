import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  where 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import Navbar from '../components/Navbar';

function Dashboard() {
  const { currentUser, userProfile } = useAuth();
  const [failures, setFailures] = useState([]);
  const [feed, setFeed] = useState([]);
  const [futureGoals, setFutureGoals] = useState([]);
  const [newFailure, setNewFailure] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debug logging
  useEffect(() => {
    console.log('Dashboard - currentUser:', currentUser);
    console.log('Dashboard - userProfile:', userProfile);
  }, [currentUser, userProfile]);

  // Fetch user's failures
  useEffect(() => {
    if (!currentUser) return;

    const failuresQuery = query(
      collection(db, 'failures'),
      where('authorId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(failuresQuery, (snapshot) => {
      const failuresData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort by createdAt in JavaScript instead of Firestore
      failuresData.sort((a, b) => {
        const aTime = a.createdAt?.toDate?.() || new Date(0);
        const bTime = b.createdAt?.toDate?.() || new Date(0);
        return bTime - aTime;
      });
      setFailures(failuresData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching failures:', error);
      setError('Failed to load failures: ' + error.message);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  // Fetch community feed
  useEffect(() => {
    const feedQuery = query(collection(db, 'failures'));

    const unsubscribe = onSnapshot(feedQuery, (snapshot) => {
      const feedData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort by createdAt in JavaScript instead of Firestore
      feedData.sort((a, b) => {
        const aTime = a.createdAt?.toDate?.() || new Date(0);
        const bTime = b.createdAt?.toDate?.() || new Date(0);
        return bTime - aTime;
      });
      setFeed(feedData.slice(0, 10)); // Show latest 10
    }, (error) => {
      console.error('Error fetching feed:', error);
    });

    return unsubscribe;
  }, []);

  // Fetch user's future goals
  useEffect(() => {
    if (!currentUser) return;

    const goalsQuery = query(
      collection(db, 'futureGoals'),
      where('authorId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(goalsQuery, (snapshot) => {
      const goalsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort by createdAt in JavaScript instead of Firestore
      goalsData.sort((a, b) => {
        const aTime = a.createdAt?.toDate?.() || new Date(0);
        const bTime = b.createdAt?.toDate?.() || new Date(0);
        return bTime - aTime;
      });
      setFutureGoals(goalsData);
    }, (error) => {
      console.error('Error fetching goals:', error);
    });

    return unsubscribe;
  }, [currentUser]);

  const handleAddFailure = async (e) => {
    e.preventDefault();
    if (!newFailure.trim()) return;

    try {
      await addDoc(collection(db, 'failures'), {
        title: newFailure,
        description: '',
        authorId: currentUser.uid,
        authorName: userProfile?.displayName || 'Anonymous',
        authorAvatar: userProfile?.avatarUrl || '',
        tags: [],
        votes: 0,
        comments: 0,
        status: 'open',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setNewFailure('');
    } catch (error) {
      console.error('Error adding failure:', error);
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!newGoal.trim()) return;

    try {
      await addDoc(collection(db, 'futureGoals'), {
        title: newGoal,
        description: '',
        authorId: currentUser.uid,
        authorName: userProfile?.displayName || 'Anonymous',
        targetDate: null,
        status: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setNewGoal('');
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '18px', color: 'var(--linkedin-text-secondary)', marginBottom: '8px'}}>
            Loading your dashboard...
          </div>
          <div style={{fontSize: '14px', color: 'var(--linkedin-text-secondary)'}}>
            {currentUser ? `Welcome, ${userProfile?.displayName || currentUser.email}!` : 'Please wait...'}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div style={{textAlign: 'center', maxWidth: '400px'}}>
          <div style={{fontSize: '18px', color: 'var(--linkedin-warning)', marginBottom: '16px'}}>
            ⚠️ Error Loading Dashboard
          </div>
          <div style={{fontSize: '14px', color: 'var(--linkedin-text-secondary)', marginBottom: '16px'}}>
            {error}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="dashboard">
        <div className="dashboard-grid">
          {/* Left Section - My Failures */}
          <div className="dashboard-section">
            <h2 className="section-title">My Failures</h2>
            
            <form onSubmit={handleAddFailure} style={{marginBottom: '16px'}}>
              <input
                type="text"
                className="input"
                placeholder="What went wrong today?"
                value={newFailure}
                onChange={(e) => setNewFailure(e.target.value)}
                style={{marginBottom: '8px'}}
              />
              <button type="submit" className="btn btn-primary w-full">
                Share Failure
              </button>
            </form>

            <div style={{maxHeight: '400px', overflowY: 'auto'}}>
              {failures.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  color: 'var(--linkedin-text-secondary)',
                  padding: '20px'
                }}>
                  <div style={{fontSize: '48px', marginBottom: '8px'}}>💭</div>
                  <p>No failures shared yet.</p>
                  <p style={{fontSize: '14px'}}>Share your first learning experience!</p>
                </div>
              ) : (
                failures.map((failure) => (
                  <div key={failure.id} className="card" style={{marginBottom: '12px'}}>
                    <h4 style={{fontSize: '16px', marginBottom: '8px'}}>
                      {failure.title}
                    </h4>
                    <div style={{
                      fontSize: '12px',
                      color: 'var(--linkedin-text-secondary)',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <span>{failure.votes || 0} votes</span>
                      <span>{failure.comments || 0} comments</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Center Section - Community Feed */}
          <div className="dashboard-section">
            <h2 className="section-title">Community Feed</h2>
            
            <div style={{maxHeight: '600px', overflowY: 'auto'}}>
              {feed.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  color: 'var(--linkedin-text-secondary)',
                  padding: '40px'
                }}>
                  <div style={{fontSize: '48px', marginBottom: '8px'}}>🌱</div>
                  <p>No posts yet.</p>
                  <p style={{fontSize: '14px'}}>Be the first to share!</p>
                </div>
              ) : (
                feed.map((post) => (
                  <div key={post.id} className="card" style={{marginBottom: '16px'}}>
                    <div className="card-header">
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--linkedin-blue)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        marginRight: '12px'
                      }}>
                        {post.authorName?.charAt(0) || 'A'}
                      </div>
                      <div>
                        <div style={{fontWeight: '600'}}>
                          {post.authorName || 'Anonymous'}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: 'var(--linkedin-text-secondary)'
                        }}>
                          {post.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}
                        </div>
                      </div>
                    </div>
                    
                    <h4 style={{fontSize: '16px', marginBottom: '8px'}}>
                      {post.title}
                    </h4>
                    
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      fontSize: '14px',
                      color: 'var(--linkedin-text-secondary)'
                    }}>
                      <button style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        👍 {post.votes || 0}
                      </button>
                      <button style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        💬 {post.comments || 0}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Section - Future Goals */}
          <div className="dashboard-section">
            <h2 className="section-title">Future Goals</h2>
            
            <form onSubmit={handleAddGoal} style={{marginBottom: '16px'}}>
              <input
                type="text"
                className="input"
                placeholder="What's your next goal?"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                style={{marginBottom: '8px'}}
              />
              <button type="submit" className="btn btn-primary w-full">
                Add Goal
              </button>
            </form>

            <div style={{maxHeight: '400px', overflowY: 'auto'}}>
              {futureGoals.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  color: 'var(--linkedin-text-secondary)',
                  padding: '20px'
                }}>
                  <div style={{fontSize: '48px', marginBottom: '8px'}}>🎯</div>
                  <p>No goals set yet.</p>
                  <p style={{fontSize: '14px'}}>Start planning your future!</p>
                </div>
              ) : (
                futureGoals.map((goal) => (
                  <div key={goal.id} className="card" style={{marginBottom: '12px'}}>
                    <h4 style={{fontSize: '16px', marginBottom: '8px'}}>
                      {goal.title}
                    </h4>
                    <div style={{
                      fontSize: '12px',
                      color: 'var(--linkedin-text-secondary)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '12px',
                        backgroundColor: goal.status === 'active' ? '#e3f2fd' : '#f3e5f5',
                        color: goal.status === 'active' ? '#1976d2' : '#7b1fa2',
                        fontSize: '10px',
                        fontWeight: '600'
                      }}>
                        {goal.status}
                      </span>
                      <span>{goal.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
