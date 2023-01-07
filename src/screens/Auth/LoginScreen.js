import React from 'react';
import { StyleSheet } from 'react-native';

import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input';
import { FilledButton } from '../../components/FilledButton';
import { TextButton } from '../../components/TextButton';
import { Error } from '../../components/Error';
import { AuthContainer } from '../../components/AuthContainer';
import { Loading } from '../../components/Loding';
import CheckLogin from '../../firebase/CheckLogin';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    return (
        <AuthContainer>
            <Heading style={styles.title}>LOGIN</Heading>
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
                placeholder={'Password'}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <FilledButton
                title={'Login'}
                style={styles.loginButton}
                onPress={async () => {
                    try {
                        setLoading(true);
                        await CheckLogin({ email, password, navigation, setLoading, setError });
                    } catch (e) {
                        setError(e.message);
                        setLoading(false);
                    }
                }}
            />
            <TextButton
                title={'Have u an account? Create one'}
                onPress={() => {
                    navigation.navigate('Register');
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
});