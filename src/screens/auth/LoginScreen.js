// File: src/screens/auth/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import InputText from '../../components/InputText';
import { loginUser, resetUserPassword } from '../../services/authService';
import { styles } from './styles/LoginStyles';

// Translates Firebase password-reset error codes into friendly messages (RF05)
const getResetErrorMessage = (error) => {
  switch (error?.code) {
    case 'auth/invalid-email':
      return 'O e-mail informado não é válido. Confira e tente novamente.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde alguns minutos e tente novamente.';
    case 'auth/network-request-failed':
      return 'Sem conexão com a internet. Verifique sua rede.';
    default:
      return 'Não foi possível enviar o e-mail de recuperação.';
  }
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false); // password-reset request in progress

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Atenção', 'Preencha seu e-mail e senha.');
      return;
    }
    try {
      setLoading(true);
      await loginUser(email, password);
      navigation.replace('MainTabs');
    } catch (error) {
      Alert.alert('Erro ao entrar', 'E-mail ou senha inválidos. Verifique seus dados.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (resetting) return; // ignore extra taps while the request is running
    if (!email.trim()) {
      Alert.alert('Recuperar Senha', 'Digite seu e-mail no campo acima e clique novamente em "Esqueci minha senha".');
      return;
    }
    try {
      setResetting(true);
      await resetUserPassword(email);
      // Neutral wording: Firebase may not reveal whether the e-mail has an account
      Alert.alert(
        'Verifique seu e-mail',
        `Se ${email.trim()} estiver cadastrado, enviamos um link para redefinir a senha. Confira também a caixa de spam.`
      );
    } catch (error) {
      Alert.alert('Erro', getResetErrorMessage(error));
    } finally {
      setResetting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Botão Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      {/* Header Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoIcon}>
            <View style={styles.logoIconInner} />
        </View>
        <View>
          <Text style={styles.logoTitle}>sebo perto</Text>
          <Text style={styles.logoSubtitle}>LIVROS QUE CIRCULAM</Text>
        </View>
      </View>

      {/* Títulos Principais */}
      <Text style={styles.greeting}>Bem-vindo de volta</Text>
      <Text style={styles.mainTitle}>Entre na sua{'\n'}conta</Text>
      <Text style={styles.description}>Continue garimpando livros na sua região.</Text>

      {/* Formulário (Usando o componente global que criamos antes) */}
      <InputText 
        label="E-MAIL" 
        placeholder="voce@email.com" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address" 
      />
      
      <InputText 
        label="SENHA" 
        placeholder="Sua senha" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />

      {/* Esqueci minha senha */}
      <TouchableOpacity style={styles.forgotContainer} onPress={handleForgotPassword} disabled={resetting}>
        <Text style={styles.forgotText}>{resetting ? 'Enviando...' : 'Esqueci minha senha'}</Text>
      </TouchableOpacity>

      {/* Botão Entrar */}
      <TouchableOpacity 
        style={styles.loginBtn} 
        onPress={handleLogin} 
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#000000" />
        ) : (
          <>
            <Text style={styles.loginBtnText}>Entrar</Text>
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

      {/* Botão Criar Conta */}
      <TouchableOpacity 
        style={styles.createBtn} 
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.createBtnText}>Criar uma nova conta</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}