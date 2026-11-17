// File: src/screens/main/AddBookScreen.js
import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, 
  SafeAreaView, Alert, ActivityIndicator 
} from 'react-native';
import { styles } from './styles/AddBookStyles';

// Importar serviços
import { createBookAd } from '../../services/bookService';
import { generateSynopsisWithGemini } from '../../services/geminiService';

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
  const [coverColor, setCoverColor] = useState('4A4A4A'); // Cor base simulando upload
  
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

  // Simula a escolha de uma foto alterando a cor de fundo da capa baseada no tempo
  const handleSimulatePhotoUpload = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    setCoverColor(randomColor);
    Alert.alert('Foto anexada', 'Uma capa temporária foi gerada com sucesso.');
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
      Alert.alert('Erro na IA', 'Não foi possível gerar a sinopse agora. Você pode preencher manualmente.');
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
      
      // Gera URL de placeholder com a cor simulada
      const coverUrl = `https://via.placeholder.com/300x450/${coverColor}/FFFFFF.png?text=${title.replace(/ /g, '+')}`;
      
      // Formata o preço convertendo de string com vírgula para número (ex: "32,50" -> 32.50)
      const numericPrice = parseFloat(price.replace(',', '.'));

      // Chama o serviço para criar no Firebase
      await createBookAd({ 
        title, 
        author, 
        price: isNaN(numericPrice) ? 0 : numericPrice, 
        condition, 
        synopsis,
        categories: selectedCategories,
        coverUrl
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
    <SafeAreaView style={styles.container}>
      
      {/* Top Header */}
      <View style={styles.topHeaderBackground}>
        <View style={styles.logoGroup}>
          <View style={styles.logoIcon} />
          <View>
            <Text style={styles.logoTitle}>sebo perto</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.avatarSmall}>
          <Text style={styles.avatarSmallText}>AM</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Voltar aos anúncios</Text>
        </TouchableOpacity>

        <Text style={styles.pageContext}>NOVO ANÚNCIO</Text>
        <Text style={styles.pageTitle}>Cadastrar livro</Text>
        <Text style={styles.pageDescription}>Capriche nos detalhes para ajudar o leitor a decidir.</Text>

        {/* --- ÁREA DE FOTO (Mock Simulado)[cite: 13] --- */}
        <View style={styles.photoCard}>
          <Text style={styles.photoTitle}>Foto do livro</Text>
          <TouchableOpacity 
            style={[styles.photoUploadBox, coverColor !== '4A4A4A' && { backgroundColor: `#${coverColor}20`, borderColor: `#${coverColor}` }]} 
            activeOpacity={0.7}
            onPress={handleSimulatePhotoUpload}
          >
            <View style={styles.photoUploadIcon}>
              <Text style={{ fontSize: 18 }}>📷</Text>
            </View>
            <Text style={styles.photoUploadText}>
              {coverColor !== '4A4A4A' ? 'Foto adicionada!' : 'Clique para adicionar uma foto'}
            </Text>
            <Text style={styles.photoUploadSub}>Simulação: Altera a cor da capa</Text>
          </TouchableOpacity>
        </View>

        {/* --- FORMULÁRIO DE DETALHES[cite: 14] --- */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Detalhes do livro</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.standardLabel}>TÍTULO</Text>
            <TextInput 
              style={styles.input} placeholder="Ex.: Torto Arado" placeholderTextColor="#999"
              value={title} onChangeText={setTitle}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.standardLabel}>AUTOR(A)</Text>
            <TextInput 
              style={styles.input} placeholder="Nome do autor" placeholderTextColor="#999"
              value={author} onChangeText={setAuthor}
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
    </SafeAreaView>
  );
}