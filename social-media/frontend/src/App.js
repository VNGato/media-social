import React, { useState, useEffect } from 'react';
// ... mantenha seus imports de componentes (Header, ProfileHeader, etc) ...
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
  const [posts, setPosts] = useState([]); // Começa vazio

  // 1. CARREGAR POSTS DO SERVIDOR AO INICIAR
  useEffect(() => {
    fetch('https://vngatosocialmedia.pythonanywhere.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(err => console.error("Erro ao buscar posts:", err));
  }, []);

  // 2. ENVIAR NOVO POST PARA O SERVIDOR
  const handleNewPost = (text) => {
    fetch('https://vngatosocialmedia.pythonanywhere.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(newPost => {
      // Adiciona na tela assim que o servidor confirmar que salvou
      setPosts([newPost, ...posts]);
    });
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans text-[#1c1e21]">
      <Header />
      <div className="max-w-[875px] mx-auto">
        <ProfileHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'posts' && (
          <div className="flex gap-3 pb-10 flex-col md:flex-row px-2 md:px-0">
            <IntroSidebar />
            <div className="flex-1 min-w-0">
               {/* Passa a função que conecta com a API */}
               <CreatePost onPost={handleNewPost} />
               
               <div className="space-y-4">
                 {posts.map((post) => (
                   <Post 
                     key={post.id} 
                     // O banco retorna created_at, mas vamos simplificar a exibição da hora
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

        {/* ... Mantenha as outras abas iguais ... */}
        {activeTab === 'about' && <div className="pb-10 px-2 md:px-0"><AboutTab /></div>}
        {activeTab === 'friends' && <div className="pb-10 px-2 md:px-0"><FriendsTab /></div>}
        {activeTab === 'photos' && <div className="pb-10 px-2 md:px-0"><PhotosTab /></div>}
        
      </div>
    </div>
  );
}
