import React, { useState, useEffect } from 'react';
import KeyboardScreen from '../../components/KeyboardScreen';
import { 
  View, Text, TouchableOpacity, ScrollView, TextInput, 
  ActivityIndicator, Alert, SafeAreaView, StyleSheet
} from 'react-native';
import { styles } from './styles/KycStyles';

// Importa os serviços
import { activateSellerKyc, getUserProfile } from '../../services/authService';

// Lista de Estados do Brasil para o seletor rápido (mesmo do registro)
const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export default function KycVerificationScreen({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState('');
  
  // Estados preenchidos pelo Firebase (se existirem)
  const [city, setCity] = useState('');
  const [state, setState] = useState('CE'); // Valor padrão igual ao registro
  const [whatsappPhone, setWhatsappPhone] = useState(''); 
  
  const [showStatePicker, setShowStatePicker] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Busca os dados do utilizador ao abrir a tela
  useEffect(() => {
    async function loadUserData() {
      try {
        const data = await getUserProfile();
        if (data) {
          if (data.location) {
            setCity(data.location.city || '');
            if (data.location.state) setState(data.location.state);
          }
          // Recupera o WhatsApp já salvo para não perder
          if (data.storeProfile && data.storeProfile.whatsappPhone) {
            // Reaplica a máscara no número vindo do banco caso venha sem formatação
            handleWhatsappChange(data.storeProfile.whatsappPhone);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados para KYC:", error);
      } finally {
        setLoadingData(false);
      }
    }
    
    loadUserData();
  }, []);

  // Máscara para o WhatsApp: (85) 99999-9999 (Exatamente igual ao registro)
  function handleWhatsappChange(text) {
    let value = text.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 7) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{4})/, "($1) $2-");
    } else if (value.length > 0) {
      value = value.replace(/(\d{2})/, "($1) ");
    }
    setWhatsappPhone(value);
  }

  // Máscara simples para CPF
  const handleCpfChange = (text) => {
    let value = text.replace(/\D/g, '');
    
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }
    
    setCpf(value);
  };

  const handleSubmit = async () => {
    if (!cpf || !address || !city || !state || !whatsappPhone) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos do formulário.');
      return;
    }

    if (!termsAccepted) {
      Alert.alert('Termos Legais', 'Você precisa aceitar os termos de responsabilidade para ativar a conta.');
      return;
    }

    try {
      setLoading(true);
      
      await activateSellerKyc({
        cpf: cpf,
        address: address,
        city: city,
        state: state,
        whatsappPhone: whatsappPhone, // O Service já remove a máscara com o replace(/\D/g, '')
        neighborhood: '', 
        storeName: '', 
        storeDescription: '', 
        termsAccepted: true
      });
      
      Alert.alert(
        'Sucesso!', 
        'Sua conta de vendedor foi ativada. Você já pode cadastrar seus livros.',
        [
          { text: 'OK', onPress: () => navigation.navigate('MainTabs') }
        ]
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível ativar sua conta. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardScreen>
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Voltar ao perfil</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
        
        <View style={styles.cardContainer}>
          
          <View style={styles.headerIcon}>
            <Text style={{ fontSize: 20 }}>🛡️</Text>
          </View>
          
          <Text style={styles.pageContext}>ETAPA ÚNICA</Text>
          <Text style={styles.pageTitle}>Ative sua conta de vendedor</Text>
          <Text style={styles.pageDescription}>
            Precisamos de alguns dados para manter nossa comunidade segura. Suas informações ficam protegidas e não serão exibidas nos anúncios.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>CPF</Text>
            <TextInput 
              style={styles.inputField} 
              placeholder="000.000.000-00" 
              placeholderTextColor="#999"
              value={cpf}
              onChangeText={handleCpfChange}
              keyboardType="numeric"
              maxLength={14}
            />
          </View>

          {/* WHATSAPP COM A MÁSCARA DO REGISTRO */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>WHATSAPP DE CONTATO</Text>
            <TextInput 
              style={styles.inputField} 
              placeholder="(85) 99999-9999" 
              placeholderTextColor="#999"
              value={whatsappPhone}
              onChangeText={handleWhatsappChange}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>ENDEREÇO DE ATUAÇÃO</Text>
            <TextInput 
              style={styles.inputField} 
              placeholder="Rua, número e bairro" 
              placeholderTextColor="#999"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          {/* CIDADE E ESTADO COM DROPDOWN (Igual ao Registro) */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <View style={{ flex: 2, marginRight: 10 }}>
              <Text style={styles.inputLabel}>CIDADE</Text>
              <TextInput 
                style={styles.inputField} 
                placeholder="Ex: Fortaleza"
                placeholderTextColor="#999"
                value={city}
                onChangeText={setCity}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>ESTADO</Text>
              <TouchableOpacity 
                style={localStyles.stateSelector}
                onPress={() => setShowStatePicker(!showStatePicker)}
              >
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#111' }}>{state}</Text>
                <Text style={{ fontSize: 10, color: '#666' }}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dropdown de Estados */}
          {showStatePicker && (
            <View style={localStyles.stateDropdown}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 6 }}>
                {ESTADOS_BRASIL.map(uf => (
                  <TouchableOpacity 
                    key={uf} 
                    style={[localStyles.stateChip, state === uf && localStyles.stateChipActive]}
                    onPress={() => {
                      setState(uf);
                      setShowStatePicker(false);
                    }}
                  >
                    <Text style={[localStyles.stateChipText, state === uf && { color: '#FFF' }]}>{uf}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <TouchableOpacity 
            style={styles.termsBox} 
            activeOpacity={0.9} 
            onPress={() => setTermsAccepted(!termsAccepted)}
          >
            <View style={[styles.checkbox, termsAccepted && styles.checkboxActive]}>
              {termsAccepted && <Text style={{ color: '#000', fontSize: 12, fontWeight: 'bold' }}>✓</Text>}
            </View>
            <Text style={styles.termsText}>
              Li e aceito os <Text style={styles.boldLink}>Termos de Responsabilidade Legal</Text> e declaro que os dados informados são verdadeiros.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.submitBtn, (!termsAccepted || loading) && styles.submitBtnDisabled]} 
            onPress={handleSubmit} 
            disabled={!termsAccepted || loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <>
                <Text style={styles.submitBtnText}>Ativar conta de vendedor</Text>
                <Text style={styles.arrowIcon}>→</Text>
              </>
            )}
          </TouchableOpacity>

        </View>

      </ScrollView>
      </KeyboardScreen>
    </SafeAreaView>
  );
}

// Estilos locais auxiliares para o seletor de estado (Os mesmos do Registro)
const localStyles = StyleSheet.create({
  stateSelector: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    height: 52, // Altura padrão do inputField que deve estar no seu KycStyles
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  stateDropdown: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 20,
    marginTop: -8,
  },
  stateChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#F0F0F0',
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stateChipActive: {
    backgroundColor: '#111',
  },
  stateChipText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  }
});
