import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { startWhatsAppNegotiation } from '../../services/historyService'; 
import { getUserProfile } from '../../services/authService'; // <-- Importado para o Header
import { theme } from '../../theme'; 

import Header from '../../components/Header'; // <-- Importando o Header padrão
import { styles } from './styles/BookDetailsStyles';

export default function BookDetailsScreen({ navigation, route }) {
  const [book, setBook] = useState(null);
  const [userData, setUserData] = useState(null); // <-- Estado para o usuário
  const [loading, setLoading] = useState(true);

  const bookMock = {
    id: 'mock-1',
    title: 'Torto Arado',
    author: 'Itamar Vieira Junior',
    price: 32,
    condition: 'Muito bom',
    format: 'Capa comum',
    synopsis: 'Nas profundezas do sertão baiano, duas irmãs descobrem no vínculo com a terra e com sua ancestralidade a força necessária para enfrentar injustiças. Uma narrativa sobre resistência, afeto e as vozes que o Brasil tentou silenciar.',
    sellerName: 'Sebo Girassol',
    sellerVerified: true,
    location: { city: 'Fortaleza', neighborhood: 'Benfica' },
    sellerWhatsapp: '5585999999999'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca os dados do usuário para o Header
        const profile = await getUserProfile();
        setUserData(profile);

        // Busca os detalhes do livro
        const bookId = route.params?.bookId;
        if (!bookId) {
          setBook(bookMock);
          return;
        }

        const bookRef = doc(db, 'books', bookId);
        const bookSnap = await getDoc(bookRef);

        if (bookSnap.exists()) {
          setBook({ id: bookSnap.id, ...bookSnap.data() });
        } else {
          Alert.alert('Ops!', 'Este livro não foi encontrado ou foi removido.');
          navigation.goBack();
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        Alert.alert('Erro', 'Não foi possível carregar os detalhes.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [route.params?.bookId]);

  const handleWhatsApp = async () => {
    if (!book) return;
    try {
      await startWhatsAppNegotiation(book, true);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível iniciar a negociação no momento. Tente novamente.');
      console.error(error);
    }
  };

  const getInitials = (text) => {
    if (!text) return 'LV';
    const parts = text.trim().split(' ');
    if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
    return text.substring(0, 2).toUpperCase();
  };

  const formatPrice = (value) => {
    if (typeof value === 'number') return value.toFixed(0); 
    return value?.toString().replace('R$', '').trim() || '0';
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={theme.colors.textPrimaryLight} size="large" />
      </View>
    );
  }

  if (!book) return null;

  return (
    <View style={styles.container}>
      
      {/* Header Padronizado */}
      <Header 
        userName={userData?.name || ''} 
        onPressAvatar={() => navigation.navigate('ProfileTab')} 
        isFixed={true} 
      />

      {/* Ajustei o padding top do ScrollView para não ficar embaixo do Header fixo */}
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: 100 }]} showsVerticalScrollIndicator={false}>
        
        {/* Botão Voltar */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{'<'} Voltar para a vitrine</Text>
        </TouchableOpacity>

        {/* Capa do Livro */}
        <View style={styles.imageContainer}>
          <View style={styles.coverPlaceholder}>
            <View style={styles.coverTopRightDot} />
            <View style={styles.coverBottomInfo}>
              <Text style={styles.coverInitials}>{getInitials(book.title)}</Text>
              <Text style={styles.coverAuthor}>{book.author}</Text>
            </View>
          </View>
        </View>

        {/* Título e Coração */}
        <Text style={styles.authorText}>{book.author}</Text>
        <View style={styles.titleRow}>
          <Text style={styles.bookTitle}>{book.title}</Text>
        </View>

        {/* Preço formatado horizontalmente */}
        <View style={styles.priceRow}>
          <Text style={styles.pricePrefix}>R$</Text>
          <Text style={styles.priceText}>{formatPrice(book.price)}</Text>
        </View>
        <Text style={styles.priceSuffix}>à vista</Text>

        {/* Grid de Especificações */}
        <View style={styles.specsRow}>
          <View style={styles.specCard}>
            <Text style={styles.specLabel}>CONSERVAÇÃO</Text>
            <Text style={styles.specValue} numberOfLines={1}>{book.condition || 'Muito bom'}</Text>
          </View>
          <View style={styles.specCard}>
            <Text style={styles.specLabel}>FORMATO</Text>
            <Text style={styles.specValue} numberOfLines={1}>{book.format || 'Capa comum'}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Sinopse (IA) */}
        <View style={styles.synopsisHeader}>
          <Text style={styles.synopsisTitle}>✨ Sinopse</Text>
          <View style={styles.aiBadge}>
            <Text style={styles.aiBadgeText}>GERADA POR IA</Text>
          </View>
        </View>
        <Text style={styles.synopsisText}>{book.synopsis || 'Nenhuma sinopse disponível para este livro.'}</Text>

        <View style={styles.divider} />

        {/* Card do Vendedor (Com mais respiro e tag verde) */}
        <TouchableOpacity style={styles.sellerCard} activeOpacity={0.9}>
          <View style={styles.sellerAvatar}>
            <Text style={styles.sellerAvatarText}>{getInitials(book.sellerName)}</Text>
          </View>
          <View style={styles.sellerInfo}>
            <Text style={styles.sellerName} numberOfLines={1}>{book.sellerName}</Text>
            
            <View style={styles.sellerDetailsRow}>
              {book.sellerVerified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓ Verificado</Text>
                </View>
              )}
              <Text style={styles.sellerLocation}>
                {book.location?.neighborhood || 'Bairro'} · {(Math.random() * 5 + 1).toFixed(1)} km de você
              </Text>
            </View>
            
          </View>
          <Text style={styles.sellerArrow}>{'>'}</Text>
        </TouchableOpacity>

        {/* Botão de Ação WhatsApp */}
        <TouchableOpacity 
          style={styles.whatsappBtn} 
          activeOpacity={0.8}
          onPress={handleWhatsApp}
        >
          <Text style={styles.whatsappIcon}>💬</Text>
          <Text style={styles.whatsappText}>Chamar no WhatsApp</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}