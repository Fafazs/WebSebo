import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { theme } from '../theme';

export default function BottomNavbar({ activeTab, onTabPress }) {
  // Configuração das Tabs usando as imagens locais
  const tabs = [
    { 
      id: 'Home', 
      label: 'Início', 
      // Requer a imagem usando o caminho relativo correto para os seus assets
      iconSource: require('../../assets/home.png') 
    },
    { 
      id: 'Activity', 
      label: 'Atividade', 
      iconSource: require('../../assets/chat.png') 
    },
    { 
      id: 'Ads', 
      label: 'Meus anúncios', 
      iconSource: require('../../assets/anuncions.png') 
    },
    { 
      id: 'Profile', 
      label: 'Perfil', 
      iconSource: require('../../assets/profile.png') 
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity 
              key={tab.id} 
              style={styles.tabItem}
              onPress={() => onTabPress(tab.id)}
            >
              {/* O componente Image renderiza o PNG. 
                  A cor (tintColor) muda dependendo se a tab está ativa ou não */}
              <Image 
                source={tab.iconSource} 
                style={[
                  styles.iconImage, 
                  isActive ? styles.iconImageActive : styles.iconImageInactive
                ]} 
                resizeMode="contain"
              />
              {/* O texto por baixo do ícone */}
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  // Estilos para o ícone PNG
  iconImage: {
    width: 24, // Tamanho do ícone
    height: 24,
    marginBottom: 4,
  },
  iconImageInactive: {
    tintColor: '#999999', // Aplica a cor cinza à imagem inativa (funciona bem em ícones transparentes)
  },
  iconImageActive: {
    tintColor: theme.colors.textPrimaryLight, // Aplica a cor do tema à imagem ativa
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999999',
  },
  labelActive: {
    color: theme.colors.textPrimaryLight,
    fontWeight: 'bold',
  },
});