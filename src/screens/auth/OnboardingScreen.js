// File: src/screens/auth/OnboardingScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { styles } from './styles/OnboardingStyles';

export default function OnboardingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <View>
        {/* Header - Logo e Subtítulo */}
        <View style={styles.headerContainer}>
          <View style={styles.logoPlaceholder}>
            {/* Simulação do ícone de livro do design */}
            <View style={styles.logoIconInner} />
          </View>
          <View>
            <Text style={styles.logoText}>sebo perto</Text>
            <Text style={styles.logoSubText}>LIVROS QUE CIRCULAM</Text>
          </View>
        </View>

        {/* Localização (Badge / Pill) */}
        <View style={styles.locationContainer}>
          <Text style={styles.locationPin}>📍</Text>
          <Text style={styles.locationText}>Fortaleza, CE</Text>
        </View>

        {/* Título Principal */}
        <View style={styles.mainTitleContainer}>
          <Text style={styles.mainTitle}>Livros perto.</Text>
          <Text style={styles.mainTitle}>
            Histórias <Text style={styles.highlightText}>sem</Text>
          </Text>
          <Text style={[styles.mainTitle, styles.highlightText]}>fim.</Text>
        </View>

        {/* Descrição */}
        <Text style={styles.description}>
          Encontre sebos e livros na sua{'\n'}região com segurança.
        </Text>
      </View>

      {/* Card Inferior (Sebos Verificados) */}
      <View>
        <View style={styles.bottomCard}>
          
          <View style={styles.cardHeader}>
            <View style={styles.cardIconPlaceholder}>
               <Text style={styles.cardIconText}>🛡️</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Sebos verificados</Text>
              <Text style={styles.cardSubtitle}>Negocie direto e com tranquilidade</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.cardButton} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.cardButtonText}>Começar agora</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
          
          <Text style={styles.cardFooterText}>Leva menos de um minuto</Text>
          
        </View>

        {/* Acesso oculto de dev para o Painel Firebase */}
        <TouchableOpacity style={styles.devBtn} onPress={() => navigation.navigate('DevTest')}>
          <Text style={styles.devText}>Painel Firebase</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}