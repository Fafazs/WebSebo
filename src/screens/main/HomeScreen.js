// File: src/screens/main/HomeScreen.js
import React, { useState, useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

// Serviços reais
import { getFeedBooks } from '../../services/bookService';
import { getUserProfile } from '../../services/authService'; // <-- Importado para pegar os dados do usuário

import { styles } from './styles/HomeStyles';

import BookCover from '../../components/BookCover';
import Header from '../../components/Header';
import HeroSearch from '../../components/home/HeroSearch';
import CategoryBar from '../../components/home/CategoryBar';
import BottomNavbar from '../../components/BottomNavbar';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [books, setBooks] = useState([]);
  const [userData, setUserData] = useState(null); // <-- Estado para o usuário real
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_LIMIT = 4;

  useFocusEffect(useCallback(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // 1. Busca os dados do usuário real no Firebase
        const profile = await getUserProfile();
        setUserData(profile);

        // 2. Busca os livros no Firebase
        const feed = await getFeedBooks({ searchQuery: '' });
        
        setBooks(feed);
      } catch (error) {
        console.error("Erro ao carregar dados da Home:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []));

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const query = searchQuery.toLowerCase();
      
      const matchesSearch = 
        (book.title && book.title.toLowerCase().includes(query)) || 
        (book.author && book.author.toLowerCase().includes(query)) ||
        (book.categories && Array.isArray(book.categories) && book.categories.some(cat => cat.toLowerCase().includes(query)));
      
      let matchesCategory = true;
      if (selectedCategory !== 'Todos') {
        matchesCategory = book.categories && Array.isArray(book.categories) 
          ? book.categories.some(cat => cat.toLowerCase().includes(selectedCategory.toLowerCase()))
          : false;
      }
      
      return matchesSearch && matchesCategory;
    });
  }, [books, searchQuery, selectedCategory]);

  const displayedBooks = showAll ? filteredBooks : filteredBooks.slice(0, INITIAL_LIMIT);

  let sectionTitle = "Achados na sua região";
  let sectionSubtitle = "Livros disponíveis na vitrine.";

  if (searchQuery.length > 0) {
    sectionTitle = `Pesquisando por "${searchQuery}"`;
    sectionSubtitle = `${filteredBooks.length} resultado(s) encontrado(s).`;
  } else if (selectedCategory !== 'Todos') {
    sectionTitle = `Categoria: ${selectedCategory}`;
    sectionSubtitle = `Explorando livros de ${selectedCategory}.`;
  }

  const handleTabPress = (tabId) => {
    if (tabId === 'Home') return;
    if (tabId === 'Activity') navigation.navigate('ChatHistoryTab');
    if (tabId === 'Ads') navigation.navigate('MyAdsTab');
    if (tabId === 'Profile') navigation.navigate('ProfileTab');
  };

  // Prepara as variáveis de interface com os dados reais ou um fallback enquanto carrega
  const userName = userData?.name || '';
  const userLocationString = userData 
    ? `${userData.location?.city || 'Cidade'} - ${userData.location?.state || 'UF'}`
    : 'Buscando localização...';

  return (
    <View style={styles.container}> 
      
      <Header 
        userName={userName} 
        onPressAvatar={() => navigation.navigate('ProfileTab')} 
        isFixed={true} 
      />

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: 20, paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >
        
        <HeroSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          userLocation={userLocationString}
        />

        <CategoryBar 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Demo')} style={{ backgroundColor: '#EAF4D7', borderRadius: 12, padding: 14, marginBottom: 20 }}>
          <Text style={{ color: '#25351C', fontWeight: 'bold' }}>Explorar catálogo de demonstração →</Text>
          <Text style={{ color: '#52634A', marginTop: 3, fontSize: 12 }}>Exemplos separados dos anúncios reais</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
        <Text style={styles.sectionSubtitle}>{sectionSubtitle}</Text>
        
        {!showAll && filteredBooks.length > INITIAL_LIMIT && (
          <TouchableOpacity onPress={() => setShowAll(true)}>
            <Text style={styles.seeAll}>Ver todos →</Text>
          </TouchableOpacity>
        )}

        {loading ? (
          <ActivityIndicator color="#000000" size="large" style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.booksGrid}>
            {displayedBooks.length === 0 ? (
              <Text style={{ color: '#777', marginTop: 20 }}>Nenhum livro encontrado.</Text>
            ) : (
              displayedBooks.map((book, index) => (
                <TouchableOpacity 
                  key={book.id || index.toString()} 
                  style={styles.bookCard}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('BookDetails', { bookId: book.id })}
                >
                  <BookCover uri={book.coverUrl} title={book.title} style={styles.bookImageContainer} />

                  <View style={styles.bookInfoRow}>
                    <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
                    <Text style={styles.bookPrice}>
                      {typeof book.price === 'number' ? `R$ ${book.price.toFixed(2).replace('.', ',')}` : book.price}
                    </Text>
                  </View>
                  <Text style={styles.bookStore}>{book.sellerName || book.store}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
      </ScrollView>

      <BottomNavbar activeTab="Home" onTabPress={handleTabPress} />
      
    </View>
  );
}
