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
  
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [suggestions, setSuggestions] = useState([]); // ESTADO NOVO: Lista de Sugestões

  // Mude para o seu link se necessário
  const API_URL = 'https://vngatosocialmedia.pythonanywhere.com';

  useEffect(() => {
    // Carregar Usuário
    fetch(`${API_URL}/user`).then(res => res.json()).then(data => setUser(data));
    // Carregar Posts
    fetch(`${API_URL}/posts`).then(res => res.json()).then(data => setPosts(data));
    // Carregar Fotos
    fetch(`${API_URL}/photos`).then(res => res.json()).then(data => setPhotos(data));
    
    // NOVO: Carregar Sugestões de Amigos
    fetch(`${API_URL}/suggestions`)
      .then(res => res.json())
      .then(data => setSuggestions(data))
      .catch(err => console.error("Erro suggestions:", err));

  }, []);

  // Função para criar Post
  const handleNewPost = (text) => {
    fetch(`${API_URL}/posts`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text })
    }).then(res => res.json()).then(newPost => setPosts([newPost, ...posts]));
  };

  // NOVO: Função para Adicionar Amigo
  const handleAddFriend = (id) => {
    // 1. Atualiza visualmente na hora (Otimista)
    setSuggestions(suggestions.map(person => {
      if (person.id === id) {
        return { ...person, status: person.status === 'add' ? 'sent' : 'add' };
      }
      return person;
    }));

    // 2. Avisa o servidor para salvar no banco
    fetch(`${API_URL}/suggestions/${id}/add`, { method: 'POST' });
  };

  if (!user) return <div className="p-10 text-center">Carregando perfil...</div>;

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans text-[#1c1e21]">
      <Header />
      <div className="max-w-[875px] mx-auto">
        
        <ProfileHeader activeTab={activeTab} setActiveTab={setActiveTab} userData={user} />

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
               
               {/* AGORA PASSAMOS AS PROPS REAIS */}
               <div className="mt-4">
                 <FriendList 
                    suggestions={suggestions} 
                    onAddFriend={handleAddFriend} 
                 />
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