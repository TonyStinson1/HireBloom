import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Image, Text, TouchableOpacity, Dimensions } from 'react-native';

import { Icon } from 'react-native-elements';

const drawerOptions = [
    { screenName: 'Review', navigateTo: 'Review', },
    { screenName: 'Reject', navigateTo: 'RejectedCandidates', },
    { screenName: 'Saved for Later', navigateTo: 'SavedCandidates', },
    { screenName: 'Contacted', navigateTo: 'ContactedCandidates', },
]

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export function DrawerContent(props) {

    const dispatch = useDispatch();
    const [screensVisible, setScreensVisible] = useState(false);

    const userData = useSelector((state) => state.userInfo.userData);
    const projectData = useSelector((state) => state.projectInfo.selectedProjectDetails);

    const renderDrawerOptions = (opt, index, projectData) => {

        renderProcessingValues = (index, projectData) => {
            let selIndex = index + '';
            switch (selIndex) {
                case '0':
                    if (projectData != null) {
                        return projectData.candidates_review_count;
                    }
                    return 0;
                    break;
                case '1':
                    if (projectData != null) {
                        return projectData.candidates_rejected_count;
                    }
                    return 0;
                    break;
                case '2':
                    if (projectData != null) {
                        return projectData.candidates_approved_count;
                    }
                    return 0;
                    break;
                case '3':
                    if (projectData != null) {
                        return projectData.candidates_contacted_count;
                    }
                    return 0;
                    break;
                default: return 0;
            }
        }

        return (
            <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate(opt.navigateTo)} style={styles.borderStyle}>
                <View style={styles.fillContent}>
                    <View style={styles.profilePicContainer}>
                        <Text style={styles.screenNameStyle}>{opt.screenName}</Text>
                    </View>
                    <View style={styles.associatedContainer}>
                        <Text style={styles.associatedText}>{renderProcessingValues(index, projectData)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const signOut = async () => {
        await AsyncStorage.clear();
        dispatch({
            type: 'SET_TOKEN',
            payload: ''
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <View style={styles.drawerContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{
                                    uri: userData.profile_picture
                                }}
                                style={styles.imageStyle}
                            />
                        </View>
                        <View style={styles.centeredProfile}>
                            <View>
                                <Text style={styles.usernameText}>{userData.first_name} {userData.last_name}</Text>
                                <Text style={styles.userEmailText}>{userData.email}</Text>
                            </View>
                            <View style={styles.signOutPosition}>
                                <TouchableOpacity activeOpacity={1} onPress={() => signOut()} style={styles.signOutContainer}>
                                    <Text style={styles.btnText}>Sign out</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.closeDrawer()} style={styles.iconContainer}>
                            <Icon name="close" type="material" size={40} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.drawerSection}>
                    <TouchableOpacity activeOpacity={1} onPress={() => setScreensVisible(!screensVisible)} style={{ ...styles.screenOptContainer, ...styles.sideBorders }}>
                        <View>
                            <Text style={styles.optTitle}>{projectData.project_name}</Text>
                        </View>
                        <View style={styles.iconBox}>
                            <View>
                                <Icon
                                    name={screensVisible ? "chevron-up" : "chevron-down"}
                                    type='font-awesome'
                                    color='#212325'
                                    size={22}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    {
                        screensVisible &&
                        <View>
                            {
                                drawerOptions.map((opt, index) => (
                                    renderDrawerOptions(opt, index, projectData)
                                ))
                            }
                        </View>
                    }
                    <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('Dashboard')} style={{ ...styles.screenOptContainer, ...styles.optLockedTitle }}>
                        <View>
                            <Text style={styles.homeTitle}>My Projects</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('OutreachTemplates')} style={{ ...styles.screenOptContainer, ...styles.optLockedTitle }}>
                        <View>
                            <Text style={styles.homeTitle}>Outreach Templates</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: '4%',
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    drawerSection: {
        top: 40,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    borderStyle: { borderBottomWidth: 1, borderBottomColor: '#E6E6E6' },
    fillContent: { flexDirection: 'row', padding: 25, marginLeft: '10%' },
    profilePicContainer: { width: '80%', alignSelf: 'flex-start' },
    screenNameStyle: { color: '#8E8E93', fontSize: 18, fontWeight: '600', },
    associatedContainer: { width: '20%', alignItems: 'flex-end' },
    associatedText: { color: '#8E8E93', fontSize: 18, fontWeight: '600', },
    drawerContainer: { flexDirection: 'row', marginTop: 35 },
    imageContainer: { width: WIDTH * 0.3, maxWidth: 109, height: WIDTH * 0.3, maxHeight: 109 },
    imageStyle: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: Math.round((WIDTH * 0.3) + (HEIGHT * 0.3)) / 2,
    },
    centeredProfile: { justifyContent: 'center', marginLeft: 15 },
    usernameText: { color: '#212325', fontWeight: '600', lineHeight: 17, fontSize: 15 },
    userEmailText: { color: '#212325', opacity: 0.5, fontWeight: '700', lineHeight: 24.5, fontSize: 13, flexWrap: 'wrap' },
    signOutPosition: { position: 'absolute', bottom: -15 },
    signOutContainer: {
        width: 138,
        height: 25,
        backgroundColor: '#17A2F3',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: { textAlign: 'center', color: '#fff', fontWeight: '600', lineHeight: 22, },
    iconContainer: { position: 'absolute', right: '5%', top: -15 },
    screenOptContainer: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        borderColor: '#E6E6E6',
        padding: 25,
        alignItems: 'center'
    },
    sideBorders: { borderLeftWidth: 0, borderRightWidth: 0, },
    optTitle: { color: '#212325', fontSize: 18, fontWeight: '600', },
    iconBox: { position: 'absolute', right: 20, },
    optLockedTitle: {
        borderBottomWidth: 1,
        borderWidth: 0,
    },
    homeTitle: { color: '#212325', fontSize: 18, fontWeight: '600', }
});