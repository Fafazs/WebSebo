// File: src/screens/auth/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import InputText from '../../components/InputText';
import { loginUser, resetUserPassword } from '../../services/authService';
import { styles } from './styles/LoginStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
    if (!email.trim()) {
      Alert.alert('Recuperar Senha', 'Digite seu e-mail no campo acima e clique novamente em "Esqueci minha senha".');
      return;
    }
    try {
      await resetUserPassword(email);
      Alert.alert('E-mail enviado!', `Enviamos um link para ${email.trim()}.`);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar o e-mail de recuperação.');
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
      <TouchableOpacity style={styles.forgotContainer} onPress={handleForgotPassword}>
        <Text style={styles.forgotText}>Esqueci minha senha</Text>
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