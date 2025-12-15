import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProfileHeader from './components/ProfileHeader';
import IntroSidebar from './components/IntroSidebar';
import FriendList from './components/FriendList';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import PhotosTab from './components/PhotosTab';
import AboutTab from './components/AboutTab';
import FriendsTab from './components/FriendsTab';
import EditProfileModal from './components/EditProfileModal'; // Importando o Modal

export default function App() {
  const [activeTab, setActiveTab] = useState('posts');
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  
  // ESTADO PARA ABRIR/FECHAR MODAL
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Mude para o seu link se necessário
  const API_URL = 'https://vngatosocialmedia.pythonanywhere.com';

  useEffect(() => {
    fetch(`${API_URL}/user`).then(res => res.json()).then(data => setUser(data));
    fetch(`${API_URL}/posts`).then(res => res.json()).then(data => setPosts(data));
    fetch(`${API_URL}/photos`).then(res => res.json()).then(data => setPhotos(data));
    fetch(`${API_URL}/suggestions`).then(res => res.json()).then(data => setSuggestions(data));
  }, []);

  const handleNewPost = (text) => {
    fetch(`${API_URL}/posts`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text })
    }).then(res => res.json()).then(newPost => setPosts([newPost, ...posts]));
  };

  const handleAddFriend = (id) => {
    setSuggestions(suggestions.map(person => person.id === id ? { ...person, status: person.status === 'add' ? 'sent' : 'add' } : person));
    fetch(`${API_URL}/suggestions/${id}/add`, { method: 'POST' });
  };

  // NOVA FUNÇÃO: ATUALIZAR USUÁRIO
  const handleUpdateUser = (updatedData) => {
    // 1. Atualiza visualmente na hora
    setUser({ ...user, ...updatedData });

    // 2. Manda para o Backend
    fetch(`${API_URL}/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    })
    .then(res => res.json())
    .catch(err => console.error("Erro ao atualizar:", err));
  };

  if (!user) return <div className="p-10 text-center">Carregando perfil...</div>;

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans text-[#1c1e21]">
      <Header />
      
      {/* MODAL DE EDIÇÃO */}
      <EditProfileModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        currentUser={user}
        onSave={handleUpdateUser}
      />

      <div className="max-w-[875px] mx-auto">
        
        {/* Passamos a função para abrir o modal */}
        <ProfileHeader 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          userData={user}
          onEditClick={() => setIsEditOpen(true)}
        />

        {activeTab === 'posts' && (
          <div className="flex gap-3 pb-10 flex-col md:flex-row px-2 md:px-0">
            <IntroSidebar userData={user} />
            <div className="flex-1 min-w-0">
               <CreatePost onPost={handleNewPost} userAvatar={user.avatar_url} />
               <div className="space-y-4">
                 {posts.map((post) => (
                   <Post key={post.id} time="Recentemente" text={post.text} image={post.image} />
                 ))}
               </div>
               <div className="mt-4">
                 <FriendList suggestions={suggestions} onAddFriend={handleAddFriend} />
               </div>
            </div>
          </div>
        )}

        {activeTab === 'photos' && <div className="pb-10 px-2 md:px-0"><PhotosTab photos={photos} /></div>}
        {activeTab === 'about' && <div className="pb-10 px-2 md:px-0"><AboutTab /></div>}
        {activeTab === 'friends' && <div className="pb-10 px-2 md:px-0"><FriendsTab /></div>}
        
      </div>
    </div>
  );
}