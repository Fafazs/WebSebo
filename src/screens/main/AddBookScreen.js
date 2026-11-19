// File: src/screens/main/AddBookScreen.js
import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, 
  Alert, ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BookCover from '../../components/BookCover';
import KeyboardScreen from '../../components/KeyboardScreen';
import Header from '../../components/Header';
import { styles } from './styles/AddBookStyles';

// Importar serviços
import { createBookAd, uploadBookCover } from '../../services/bookService';
import { generateSynopsisWithGemini } from '../../services/geminiService';
import { findIllustrativeCover } from '../../services/googleBooksService';

// Todas as categorias disponíveis no sistema
const AVAILABLE_CATEGORIES = [
  'Romance', 'Ficção', 'Fantasia', 'Infantil', 'Biografia', 
  'História', 'Autoajuda', 'Acadêmico', 'HQs e Mangás', 'Literatura Brasileira'
];

export default function AddBookScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [coverUri, setCoverUri] = useState('');
  const [coverIsIllustrative, setCoverIsIllustrative] = useState(false);
  const [loadingCover, setLoadingCover] = useState(false);
  
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Alterna a seleção de categorias
  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      if (selectedCategories.length >= 3) {
        Alert.alert('Limite', 'Selecione no máximo 3 categorias.');
        return;
      }
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const pickCover = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 });
      if (!result.canceled) { setCoverUri(result.assets[0].uri); setCoverIsIllustrative(false); }
    } catch { Alert.alert('Erro', 'Não foi possível selecionar a foto. Verifique as permissões.'); }
  };

  const handleIllustrativeCover = async () => {
    try {
      setLoadingCover(true);
      const url = await findIllustrativeCover(title, author);
      setCoverUri(url);
      setCoverIsIllustrative(true);
    } catch (error) { Alert.alert('Capa ilustrativa', error.message); }
    finally { setLoadingCover(false); }
  };

  const handleGenerateAI = async () => {
    if (!title || !author) {
      Alert.alert('Dados insuficientes', 'Preencha o Título e o Autor para a IA gerar a sinopse e as categorias.');
      return;
    }
    
    try {
      setLoadingAI(true);
      // Chama o teu serviço Gemini
      const generatedData = await generateSynopsisWithGemini(title, author);
      if (generatedData.cached) Alert.alert('Sinopse recuperada', 'Esta sugestão foi recuperada do cache local.');
      
      setSynopsis(generatedData.synopsis);
      
      // Filtra as categorias sugeridas pela IA para garantir que existem no nosso sistema
      if (generatedData.categories && Array.isArray(generatedData.categories)) {
        const validCategories = generatedData.categories.filter(cat => 
          AVAILABLE_CATEGORIES.includes(cat)
        ).slice(0, 3); // Pega no máximo 3
        
        if (validCategories.length > 0) {
          setSelectedCategories(validCategories);
        }
      }
      
    } catch (error) {
      console.error(error);
      Alert.alert('Erro na IA', error.message || 'Você pode preencher a sinopse manualmente.');
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSubmit = async () => {
    if (!title || !author || !price || !condition) {
      Alert.alert('Atenção', 'Preencha Título, Autor, Preço e Estado de Conservação para publicar.');
      return;
    }
    
    if (selectedCategories.length === 0) {
      Alert.alert('Atenção', 'Selecione pelo menos uma categoria.');
      return;
    }

    try {
      setLoadingSubmit(true);
      
      // Formata o preço convertendo de string com vírgula para número (ex: "32,50" -> 32.50)
      const numericPrice = parseFloat(price.replace(',', '.'));
      if (!title.trim() || !author.trim() || !Number.isFinite(numericPrice) || numericPrice <= 0) {
        Alert.alert('Atenção', 'Informe título, autor e preço válido maior que zero.');
        return;
      }

      const coverUrl = coverUri ? (coverIsIllustrative ? coverUri : await uploadBookCover(coverUri)) : '';

      // Chama o serviço para criar no Firebase
      await createBookAd({ 
        title, 
        author, 
        price: numericPrice,
        condition, 
        synopsis,
        categories: selectedCategories,
        coverUrl,
        coverIllustrative: coverIsIllustrative
      });
      
      Alert.alert('Sucesso!', 'Livro publicado com sucesso na sua vitrine.');
      navigation.goBack(); // Volta para a tela Meus Anúncios onde vai ver a lista atualizada
      
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao publicar', error.message || 'Tente novamente mais tarde.');
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardScreen>
      
      <Header onPressAvatar={() => navigation.navigate('MainTabs', { screen: 'ProfileTab' })} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
        
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Voltar aos anúncios</Text>
        </TouchableOpacity>

        <Text style={styles.pageContext}>NOVO ANÚNCIO</Text>
        <Text style={styles.pageTitle}>Cadastrar livro</Text>
        <Text style={styles.pageDescription}>Capriche nos detalhes para ajudar o leitor a decidir.</Text>

        <View style={styles.photoCard}>
          <Text style={styles.photoTitle}>Foto do livro</Text>
          <TouchableOpacity style={styles.photoUploadBox} onPress={pickCover}>
            {coverUri ? <BookCover uri={coverUri} title={title} style={{ width: 100, height: 140 }} /> : <Text style={styles.photoUploadText}>Selecionar foto da galeria</Text>}
            <Text style={styles.photoUploadSub}>Toque para selecionar ou alterar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleIllustrativeCover} disabled={loadingCover} style={{ minHeight: 48, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{loadingCover ? 'Buscando capa...' : 'Buscar capa ilustrativa'}</Text>
          </TouchableOpacity>
          {coverIsIllustrative ? <Text style={{ color: '#666', textAlign: 'center' }}>Capa ilustrativa; a edição pode ser diferente da foto real.</Text> : null}
          {coverUri ? <TouchableOpacity onPress={() => { setCoverUri(''); setCoverIsIllustrative(false); }} style={{ minHeight: 44, alignItems: 'center', justifyContent: 'center' }}><Text>Remover capa e publicar sem foto</Text></TouchableOpacity> : null}
        </View>

        {/* --- FORMULÁRIO DE DETALHES[cite: 14] --- */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Detalhes do livro</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.standardLabel}>TÍTULO</Text>
            <TextInput 
              style={styles.input} placeholder="Ex.: Torto Arado" placeholderTextColor="#999"
              value={title} onChangeText={value => { setTitle(value); if (coverIsIllustrative) { setCoverUri(''); setCoverIsIllustrative(false); } }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.standardLabel}>AUTOR(A)</Text>
            <TextInput 
              style={styles.input} placeholder="Nome do autor" placeholderTextColor="#999"
              value={author} onChangeText={value => { setAuthor(value); if (coverIsIllustrative) { setCoverUri(''); setCoverIsIllustrative(false); } }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.standardLabel}>PREÇO</Text>
            <TextInput 
              style={styles.input} placeholder="R$ 0,00" placeholderTextColor="#999" keyboardType="numeric"
              value={price} onChangeText={setPrice}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.standardLabel}>ESTADO DE CONSERVAÇÃO</Text>
            <TextInput 
              style={styles.input} placeholder="Ex.: Muito bom" placeholderTextColor="#999"
              value={condition} onChangeText={setCondition}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.standardLabel}>SINOPSE</Text>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="Descreva brevemente a história e o estado do exemplar..." 
              placeholderTextColor="#999"
              multiline={true}
              value={synopsis} onChangeText={setSynopsis}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.standardLabel}>CATEGORIAS (MÁX: 3)</Text>
            <View style={styles.categoriesContainer}>
              {AVAILABLE_CATEGORIES.map(cat => (
                <TouchableOpacity 
                  key={cat} 
                  style={[styles.categoryChip, selectedCategories.includes(cat) && styles.categoryChipActive]}
                  onPress={() => toggleCategory(cat)}
                >
                  <Text style={[styles.categoryChipText, selectedCategories.includes(cat) && styles.categoryChipTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* --- BOTÕES FINAIS[cite: 15] --- */}
        <TouchableOpacity style={styles.aiBtn} onPress={handleGenerateAI} disabled={loadingAI || (!title && !author)}>
          {loadingAI ? <ActivityIndicator color="#000" /> : <Text style={styles.aiBtnText}>✨ Gerar sinopse e tags com IA</Text>}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.submitBtn, loadingSubmit && styles.submitBtnDisabled]} 
          onPress={handleSubmit} 
          disabled={loadingSubmit}
        >
          {loadingSubmit ? <ActivityIndicator color="#000" /> : (
            <>
              <Text style={styles.submitBtnText}>Publicar anúncio</Text>
              <Text style={styles.arrowIcon}>→</Text>
            </>
          )}
        </TouchableOpacity>

      </ScrollView>
      </KeyboardScreen>
    </View>
  );
}
