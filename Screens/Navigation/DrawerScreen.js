import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements'
import { getHeaderTitle } from '@react-navigation/elements';

//Screens
import Dashboard from '../Dashboard';
import Review from '../Review/Review';
import { DrawerContent } from './DrawerContent';
import SavedCandidates from '../SavedCandidates';
import OutReachTemplates from '../OutreachTemplates';
import RejectedCandidates from '../RejectedCandidates';
import ContactedCandidates from '../ContactedCandidates';


const Drawer = createDrawerNavigator();


export default function DrawerScreen() {

  function MyHeader(props) {
    return (
      <View style={{ backgroundColor: '#fff', padding: 15, height: 80, flexDirection: 'row', }}>
        <View style={{ width: '65%' }}>
          <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.openDrawer()} style={{ alignItems: 'flex-start', flexDirection: 'row', marginLeft: 17, }}>
            <View style={{ justifyContent: 'center', top: 7 }}>
              <Icon name="menu-sharp"
                type="ionicon"
                size={32} />
            </View>
          </TouchableOpacity>
        </View>
        {
          props.right &&
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '35%' }}>
            <TouchableOpacity activeOpacity={1} style={{ justifyContent: 'center' }} >
              <View style={{ justifyContent: 'center', }}>
                <Icon name="search"
                  type="feather"
                  size={22} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={{ justifyContent: 'center' }} >
              <View style={{ justifyContent: 'center', }}>
                <Icon name="equalizer"
                  type="simple-line-icon"
                  size={22}
                  style={{ transform: [{ rotate: '90deg' }] }} />
              </View>
            </TouchableOpacity>
          </View>
        }
      </View>
    );
  }

  return (

    <Drawer.Navigator initialRouteName="Dashboard"
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        drawerStyle: {
          width: '90%'
        },
        header: ({ navigation, route, options }) => {
          let rightSide = false;
          const title = getHeaderTitle(options, route.name);
          if ((title == 'RejectedCandidates') || (title == 'SavedCandidates') || (title == 'ContactedCandidates')) {
            rightSide = true
          }
          return <MyHeader navigation={navigation} title={title} style={options.headerStyle} right={rightSide} />;
        }
      })}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Review" component={Review} />
      <Drawer.Screen name="RejectedCandidates" component={RejectedCandidates} />
      <Drawer.Screen name="SavedCandidates" component={SavedCandidates} />
      <Drawer.Screen name="ContactedCandidates" component={ContactedCandidates} />
      <Drawer.Screen name="OutreachTemplates" component={OutReachTemplates} />
    </Drawer.Navigator>

  );
}