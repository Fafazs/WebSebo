// File: src/components/profile/SellerPromoBox.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../screens/main/styles/ProfileStyles';

export default function SellerPromoBox({ isSeller, onPress }) {
  if (isSeller) return null; // Se já é vendedor, não mostra a promo

  return (
    <View style={styles.promoBox}>
      <View style={styles.promoHeader}>
        <Text style={styles.promoContext}>ESPAÇO DO VENDEDOR</Text>
        <Text style={{fontSize: 20}}>📖</Text>
      </View>
      <Text style={styles.promoTitle}>Dê uma nova história aos seus livros.</Text>
      <Text style={styles.promoDescription}>
        Ative sua conta de vendedor, publique anúncios e encontre leitores na sua região.
      </Text>
      <TouchableOpacity style={styles.promoBtn} onPress={onPress}>
        <Text style={styles.promoBtnText}>Quero vender / Ativar conta</Text>
        <Text style={styles.promoBtnArrow}>→</Text>
      </TouchableOpacity>
    </View>
  );
}