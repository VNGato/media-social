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

export default function App() {
  const [activeTab, setActiveTab] = useState('posts');
  
  // ESTADOS (Dados que vêm do banco)
  const [user, setUser] = useState(null);       // Dados do Vilson
  const [posts, setPosts] = useState([]);       // Lista de Posts
  const [photos, setPhotos] = useState([]);     // Galeria de Fotos

  // URL da sua API (Troque pelo seu link real se necessário)
  const API_URL = 'https://vngatosocialmedia.pythonanywhere.com';

  // Carregar tudo ao abrir o site
  useEffect(() => {
    // 1. Pega os dados do Usuário
    fetch(`${API_URL}/user`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("Erro user:", err));

    // 2. Pega os posts
    fetch(`${API_URL}/posts`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error("Erro posts:", err));

    // 3. Pega as fotos da galeria
    fetch(`${API_URL}/photos`)
      .then(res => res.json())
      .then(data => setPhotos(data))
      .catch(err => console.error("Erro fotos:", err));
  }, []);

  const handleNewPost = (text) => {
    fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text })
    })
    .then(res => res.json())
    .then(newPost => setPosts([newPost, ...posts]));
  };

  // Enquanto carrega o usuário, mostra um "Carregando..."
  if (!user) return <div className="p-10 text-center">Carregando perfil...</div>;

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans text-[#1c1e21]">
      <Header />
      <div className="max-w-[875px] mx-auto">
        
        {/* Passamos os dados do 'user' para o cabeçalho */}
        <ProfileHeader 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          userData={user} 
        />

        {activeTab === 'posts' && (
          <div className="flex gap-3 pb-10 flex-col md:flex-row px-2 md:px-0">
            {/* Passamos os dados do 'user' para a sidebar também */}
            <IntroSidebar userData={user} />
            
            <div className="flex-1 min-w-0">
               <CreatePost onPost={handleNewPost} userAvatar={user.avatar_url} />
               <div className="space-y-4">
                 {posts.map((post) => (
                   <Post 
                     key={post.id} 
                     time="Recentemente" 
                     text={post.text} 
                     image={post.image} 
                   />
                 ))}
               </div>
               <div className="mt-4"><FriendList /></div>
            </div>
          </div>
        )}

        {/* Passamos a lista de fotos real para a aba de fotos */}
        {activeTab === 'photos' && (
            <div className="pb-10 px-2 md:px-0">
                <PhotosTab photos={photos} />
            </div>
        )}

        {activeTab === 'about' && <div className="pb-10 px-2 md:px-0"><AboutTab /></div>}
        {activeTab === 'friends' && <div className="pb-10 px-2 md:px-0"><FriendsTab /></div>}
        
      </div>
    </div>
  );
}