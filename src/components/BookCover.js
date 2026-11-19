import React, { useState } from 'react';
import { Image, View, Text } from 'react-native';

export default function BookCover({ uri, title, style }) {
  const [failedUri, setFailedUri] = useState(null);
  const imageUri = typeof uri === 'string' ? uri.trim() : '';
  const isLegacyPlaceholder = /^https?:\/\/via\.placeholder\.com(?:[/:?#]|$)/i.test(imageUri);
  if (imageUri && !isLegacyPlaceholder && imageUri !== failedUri) {
    return <Image source={{ uri: imageUri }} style={style} resizeMode="cover" onError={() => setFailedUri(imageUri)} accessibilityLabel={`Capa de ${title || 'livro'}`} />;
  }
  return (
    <View style={[style, { backgroundColor: '#E9EDE4', alignItems: 'center', justifyContent: 'center', padding: 8, overflow: 'hidden' }]} accessibilityLabel={`Capa indisponível: ${title || 'livro'}`}>
      <View style={{ width: 35, height: 44, backgroundColor: '#C6FF45', borderRadius: 4, borderWidth: 2, borderColor: '#111111', marginBottom: 8, justifyContent: 'center', paddingLeft: 8 }}>
        <View style={{ height: 2, width: 17, backgroundColor: '#111111', marginBottom: 5 }} />
        <View style={{ height: 2, width: 12, backgroundColor: '#111111' }} />
      </View>
      <Text style={{ color: '#414941', textAlign: 'center', fontSize: 11, fontWeight: '600' }} numberOfLines={2}>{title || 'Sem capa'}</Text>
    </View>
  );
}
