import React from 'react';
import { StyleSheet } from 'react-native';

import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input';
import { FilledButton } from '../../components/FilledButton';
import { Error } from '../../components/Error';
import { IconButton } from '../../components/IconButton';
import { Loading } from '../../components/Loding';
import { AuthContainer } from '../../components/AuthContainer';
import CreateUser from '../../firebase/CreateUser';

export default function RegistrationScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm_password, confirmPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [valid, setvalidate] = React.useState(false);

  function check_value(data) {
    const { email, username, name, password, confirm_password, setvalidate, setError, setLoading } = data;
    if (!String(email).includes("@gmail.com")) {
      setError("Email Must Be Valid");
      setLoading(false);
    }
    else if (String(username).length <= 4) {
      setError("Username must be 4 charachter")
      setLoading(false);
    }
    else if (String(password).length <= 6) {
      setError("Password must be 6 charachter")
      setLoading(false);
    }
    else if (!password === confirm_password) {
      setError("Password Don't Match")
      setLoading(false);
    }
    else {
      console.log("All clear")
      setvalidate(true)
    }
  }
  return (
    <AuthContainer>
      <IconButton
        style={styles.closeIcon}
        name={'close-circle'}
        onPress={() => {
          navigation.pop();
        }}
      />
      <Heading style={styles.title}>REGISTRATION</Heading>
      <Error error={error} />
      <Input
        style={styles.input}
        placeholder={'Email'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        style={styles.input}
        placeholder={'Username'}
        keyboardType={'user-name'}
        value={username}
        onChangeText={setUsername}
      />
      <Input
        style={styles.input}
        placeholder={'Name'}
        keyboardType={'name'}
        value={name}
        onChangeText={setName}
      />
      <Input
        style={styles.input}
        placeholder={'Password'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Input
        style={styles.input}
        placeholder={'Confirm Password'}
        secureTextEntry
        value={confirm_password}
        onChangeText={confirmPassword}
      />
      <FilledButton
        title={'Register'}
        style={styles.loginButton}
        onPress={async () => {
          try {
            setLoading(true);
            await check_value({ email, username, name, password, confirm_password, setvalidate, setError, setLoading });
            await CreateUser({ email, username, name, password, setError, setLoading, navigation });
          } catch (e) {
            setError(e.message);
            setLoading(false);
          }
        }}
      />
      <Loading loading={loading} />
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 48,
  },
  input: {
    marginVertical: 8,
  },
  loginButton: {
    marginVertical: 32,
  },
  closeIcon: {
    position: 'absolute',
    top: 60,
    right: 16,
    fontSize: 40
  },
});