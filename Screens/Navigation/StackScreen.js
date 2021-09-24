import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

// Screens
import LaterReview from '../LaterReview';
import DrawerScreen from './DrawerScreen'
import Onboarding from '../Onboarding /Onboarding'
import RejectedReview from '../Review/RejectedReview';
import MessageCandidate from '../Review/MessageCandidate';

import { Icon } from 'react-native-elements'
import { getHeaderTitle } from '@react-navigation/elements';

const Stack = createNativeStackNavigator();

function MyHeader(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.row}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()} style={styles.headerSize} >
          <Icon name='chevron-thin-left'
            type='entypo'
            color='#212325'
            size={23} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
      </View>
    </View>
  );
}

const PreAuthNavigator = () => {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator initialRouteName="Home">
      <Screen
        name="Home"
        component={Onboarding}
        options={{ headerShown: false }}
      />
    </Navigator>
  )
}

const PostAuthNavigator = () => {
  const { Navigator, Screen } = createNativeStackNavigator();
  return (
    <Navigator initialRouteName="Drawer" screenOptions={({ navigation }) => ({
      headerStyle: {
        shadowOpacity: 0,
        elevation: 0,
      },
      header: ({ navigation, route, options }) => {
        const title = getHeaderTitle(options, route.name);

        return <MyHeader title={title} />;
      }
    })}>
      <Screen name="Drawer" options={{ headerShown: false }} component={DrawerScreen} />
      <Screen name="RejectedReview" component={RejectedReview} options={{ title: 'Review' }} />
      <Screen name="MessageCandidate" component={MessageCandidate} options={{ title: 'Review' }} />
      <Screen name="LaterReview" component={LaterReview} options={{ title: 'Save for Later' }} />
    </Navigator>
  )
}

export default function StackScreen() {

  useEffect(() => {
    AuthChecker()
  }, [])

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.userInfo.userToken);

  const AuthChecker = async () => {
    try {
      let accessToken = await AsyncStorage.getItem('accessToken')
      if (accessToken !== null) {
        dispatch({
          type: 'SET_TOKEN',
          payload: accessToken
        });
      }
    } catch (e) {
      console.log("Error", e);
    }
  }

  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <Navigator>
        {
          authToken == '' ? (
            <Screen
              name="PreAuth"
              component={PreAuthNavigator}
              options={{ header: () => null }}
            />
          ) :
            <Screen
              name="PostAuth"
              component={PostAuthNavigator}
              options={{ headerShown: false }}
            />
        }
      </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: { backgroundColor: '#fff', height: 70, justifyContent: 'center', padding: 20 },
  row: { flexDirection: 'row', },
  headerSize: { width: 30, height: 30 },
  headerTitleContainer: { justifyContent: 'center', height: 25 },
  headerTitle: { fontWeight: '500', color: '#212325', fontSize: 15, },
});