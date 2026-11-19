// File: src/screens/auth/RegisterScreen.js
import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, Alert, ActivityIndicator, 
  ScrollView, TextInput, StyleSheet 
} from 'react-native';
import InputText from '../../components/InputText';
import KeyboardScreen from '../../components/KeyboardScreen';
import { registerUser } from '../../services/authService';
import { styles } from './styles/RegisterStyles';
import { theme } from '../../theme';

// Lista de Estados do Brasil para o seletor rápido
const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('CE'); // Estado padrão
  const [showStatePicker, setShowStatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  // Máscara para o WhatsApp: (85) 99999-9999
  const handleWhatsappChange = (text) => {
    let value = text.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 7) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{4})/, "($1) $2-");
    } else if (value.length > 0) {
      value = value.replace(/(\d{2})/, "($1) ");
    }
    setWhatsapp(value);
  };

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || password.length < 6 || !whatsapp.trim() || !city.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios (Nome, E-mail, Senha de 6+ dígitos, WhatsApp e Cidade).');
      return;
    }

    try {
      setLoading(true);
      
      await registerUser({
        fullName: name,
        email: email,
        password: password,
        city: city,
        state: state,
        whatsappPhone: whatsapp
      });

      Alert.alert('Sucesso!', 'A sua conta foi criada com sucesso.');
      navigation.replace('MainTabs');
    } catch (error) {
      Alert.alert('Erro no registo', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardScreen>
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
      
      {/* Botão Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      {/* Títulos Principais */}
      <Text style={styles.greeting}>Bem-vindo de volta</Text>
      <Text style={styles.mainTitle}>Crie sua conta</Text>
      <Text style={styles.description}>Comece a descobrir histórias perto de você.</Text>

      {/* Formulário */}
      <InputText 
        label="NOME COMPLETO" 
        placeholder="Como podemos chamar você?" 
        value={name} 
        onChangeText={setName} 
      />

      <InputText 
        label="E-MAIL" 
        placeholder="voce@email.com" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address" 
        autoCapitalize="none"
      />
      
      <InputText 
        label="SENHA" 
        placeholder="Sua senha (mínimo 6 dígitos)" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />

      {/* NOVO: WHATSAPP */}
      <InputText 
        label="WHATSAPP DE CONTATO" 
        placeholder="(85) 99999-9999" 
        value={whatsapp} 
        onChangeText={handleWhatsappChange} 
        keyboardType="phone-pad" 
      />

      {/* NOVO: CIDADE E ESTADO */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 2, marginRight: 10 }}>
          <InputText 
            label="CIDADE" 
            placeholder="Ex: Fortaleza" 
            value={city} 
            onChangeText={setCity} 
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#666', marginBottom: 6, letterSpacing: 1 }}>ESTADO</Text>
          <TouchableOpacity 
            style={localStyles.stateSelector}
            onPress={() => setShowStatePicker(!showStatePicker)}
          >
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#111' }}>{state}</Text>
            <Text style={{ fontSize: 10, color: '#666' }}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Simples de Estados (Exibe se clicar) */}
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

      {/* Botão Criar Conta */}
      <TouchableOpacity 
        style={styles.registerBtn} 
        onPress={handleRegister} 
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#111111" />
        ) : (
          <>
            <Text style={styles.registerBtnText}>Criar conta</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Divisor "ou" */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>ou</Text>
        <View style={styles.line} />
      </View>

      {/* Botão Já tenho uma conta */}
      <TouchableOpacity 
        style={styles.loginBtn} 
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.loginBtnText}>Já tenho uma conta</Text>
      </TouchableOpacity>

    </ScrollView>
    </KeyboardScreen>
  );
}

// Estilos locais auxiliares para o seletor de estado
const localStyles = StyleSheet.create({
  stateSelector: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    height: 52,
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
    marginBottom: 16,
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
