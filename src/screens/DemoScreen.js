import React from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookCover from '../components/BookCover';

const demoBooks = [
  { title: 'Orgulho e Preconceito', author: 'Jane Austen', isbn: '9780141439518', category: 'Romance', price: '24,00', condition: 'Bom', synopsis: 'Elizabeth Bennet enfrenta expectativas sociais e descobre novas perspectivas sobre afeto e família.' },
  { title: '1984', author: 'George Orwell', isbn: '9780451524935', category: 'Distopia', price: '29,00', condition: 'Muito bom', synopsis: 'Em uma sociedade vigiada, Winston busca preservar seus pensamentos e sua individualidade.' },
  { title: 'O Hobbit', author: 'J. R. R. Tolkien', isbn: '9780547928227', category: 'Fantasia', price: '35,00', condition: 'Bom', synopsis: 'Bilbo embarca em uma jornada inesperada ao lado de um grupo de anões.' },
  { title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', isbn: '9780156012195', category: 'Infantil', price: '18,00', condition: 'Muito bom', synopsis: 'Um viajante de outro planeta compartilha encontros e reflexões sobre amizade.' },
  { title: 'O Sol é para Todos', author: 'Harper Lee', isbn: '9780061120084', category: 'Literatura', price: '28,00', condition: 'Bom', synopsis: 'Scout observa questões de justiça e preconceito em sua comunidade no sul dos Estados Unidos.' },
  { title: 'O Grande Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', category: 'Clássico', price: '22,00', condition: 'Usado', synopsis: 'Um narrador acompanha festas e ambições na Nova York dos anos 1920.' },
  { title: 'Duna', author: 'Frank Herbert', isbn: '9780441172719', category: 'Ficção científica', price: '42,00', condition: 'Bom', synopsis: 'Em um planeta desértico, famílias disputam poder e um recurso precioso.' },
  { title: 'Frankenstein', author: 'Mary Shelley', isbn: '9780486282114', category: 'Terror', price: '20,00', condition: 'Muito bom', synopsis: 'Um cientista enfrenta as consequências de sua ambição de criar vida.' },
  { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', category: 'História', price: '38,00', condition: 'Bom', synopsis: 'Uma introdução à trajetória humana e às mudanças nas sociedades ao longo do tempo.' },
  { title: 'O Diário de Anne Frank', author: 'Anne Frank', isbn: '9780553296983', category: 'Memórias', price: '25,00', condition: 'Bom', synopsis: 'Os escritos de uma jovem que viveu escondida durante a Segunda Guerra Mundial.' },
  { title: 'Alice no País das Maravilhas', author: 'Lewis Carroll', isbn: '9780141439761', category: 'Infantil', price: '19,00', condition: 'Usado', synopsis: 'Alice atravessa um mundo imaginário repleto de encontros curiosos.' },
  { title: 'As Aventuras de Sherlock Holmes', author: 'Arthur Conan Doyle', isbn: '9780553212419', category: 'Mistério', price: '26,00', condition: 'Bom', synopsis: 'Sherlock Holmes e Dr. Watson investigam casos enigmáticos em Londres.' },
];

export default function DemoScreen({ navigation }) {
  return <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }} edges={['top']}>
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 36 }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ minHeight: 44, justifyContent: 'center' }}><Text>← Voltar</Text></TouchableOpacity>
      <Text style={{ color: '#4B5940', fontWeight: 'bold', fontSize: 12 }}>CATÁLOGO DE DEMONSTRAÇÃO</Text>
      <Text style={{ fontSize: 29, fontWeight: 'bold', color: '#111', marginVertical: 10 }}>Livros para explorar</Text>
      <Text style={{ color: '#555', marginBottom: 18 }}>Exemplos sem vendedores ou negociação. Preços e conservação são fictícios. Capas ilustrativas da Open Library precisam de internet; sem conexão, aparece uma ilustração local.</Text>
      {demoBooks.map(book => <View key={book.isbn} style={{ flexDirection: 'row', padding: 14, borderRadius: 16, backgroundColor: '#fff', marginBottom: 12, elevation: 2 }}>
        <BookCover uri={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg?default=false`} title={book.title} style={{ width: 90, height: 136, borderRadius: 8, marginRight: 14 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#587044', fontSize: 11, fontWeight: 'bold' }}>DEMONSTRAÇÃO · {book.category.toUpperCase()}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#111', marginTop: 4 }}>{book.title}</Text>
          <Text style={{ color: '#666', marginTop: 2 }}>{book.author}</Text>
          <Text style={{ color: '#333', marginTop: 6, fontSize: 12 }}>{book.synopsis}</Text>
          <Text style={{ fontWeight: 'bold', marginTop: 6 }}>R$ {book.price} · {book.condition}</Text>
        </View>
      </View>)}
      <Text onPress={() => Linking.openURL('https://openlibrary.org/')} style={{ color: '#555', textDecorationLine: 'underline', marginTop: 8 }}>Capas ilustrativas: Open Library</Text>
    </ScrollView>
  </SafeAreaView>;
}
