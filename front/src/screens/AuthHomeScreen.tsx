import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, StyleSheet, Button, SafeAreaView} from 'react-native';
import {AuthStackParamList} from './navigation/AuthStackNavigator';
import {authNavigations} from '../constants';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList, 'AuthHome'>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="로그인화면으로 이동"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
