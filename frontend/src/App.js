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
import EditProfileModal from './components/EditProfileModal';

export default function App() {
  // --- ESTADOS ---
  const [activeTab, setActiveTab] = useState('posts');
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // SEU LINK DO PYTHONANYWHERE
  const API_URL = 'https://vngatosocialmedia.pythonanywhere.com';

  // --- CARREGAR DADOS INICIAIS ---
  useEffect(() => {
    fetch(`${API_URL}/user`).then(res => res.json()).then(data => setUser(data));
    fetch(`${API_URL}/posts`).then(res => res.json()).then(data => setPosts(data));
    fetch(`${API_URL}/photos`).then(res => res.json()).then(data => setPhotos(data));
    fetch(`${API_URL}/suggestions`).then(res => res.json()).then(data => setSuggestions(data));
  }, []);

  // --- FUNÇÕES DE AÇÃO ---

  // 1. Criar Post
  const handleNewPost = (text) => {
    fetch(`${API_URL}/posts`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text })
    }).then(res => res.json()).then(newPost => setPosts([newPost, ...posts]));
  };

  // 2. Deletar Post (NOVO!)
  const handleDeletePost = (id) => {
    // Remove da tela visualmente
    setPosts(posts.filter(post => post.id !== id));
    // Remove do banco de dados
    fetch(`${API_URL}/posts/${id}`, { method: 'DELETE' })
      .catch(err => console.error("Erro ao deletar:", err));
  };

  // 3. Adicionar Amigo
  const handleAddFriend = (id) => {
    setSuggestions(suggestions.map(person => person.id === id ? { ...person, status: person.status === 'add' ? 'sent' : 'add' } : person));
    fetch(`${API_URL}/suggestions/${id}/add`, { method: 'POST' });
  };

  // 4. Atualizar Perfil
  const handleUpdateUser = (updatedData) => {
    setUser({ ...user, ...updatedData });
    fetch(`${API_URL}/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    }).catch(err => console.error("Erro ao atualizar:", err));
  };

  // Enquanto carrega...
  if (!user) return <div className="p-10 text-center">Carregando perfil...</div>;

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans text-[#1c1e21]">
      <Header />
      
      {/* MODAL (JANELA) DE EDIÇÃO */}
      <EditProfileModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        currentUser={user}
        onSave={handleUpdateUser}
      />

      <div className="max-w-[875px] mx-auto">
        
        {/* CABEÇALHO DO PERFIL */}
        <ProfileHeader 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          userData={user}
          onEditClick={() => setIsEditOpen(true)}
        />

        {/* --- CONTEÚDO DAS ABAS --- */}

        {activeTab === 'posts' && (
          <div className="flex gap-3 pb-10 flex-col md:flex-row px-2 md:px-0">
            <IntroSidebar userData={user} />
            
            <div className="flex-1 min-w-0">
               <CreatePost onPost={handleNewPost} userAvatar={user.avatar_url} />
               
               <div className="space-y-4">
                 {posts.map((post) => (
                   <Post 
                     key={post.id} 
                     id={post.id}      // Passando ID para deletar
                     time="Recentemente" 
                     text={post.text} 
                     image={post.image}
                     onDelete={handleDeletePost} // Passando a função de deletar
                   />
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