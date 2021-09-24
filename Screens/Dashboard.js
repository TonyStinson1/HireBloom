import React, { useEffect, useState } from 'react'
import { dev_URL, session_token } from '@env'
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Dimensions, Pressable, ActivityIndicator, FlatList } from 'react-native';
//component
import { Card } from '../Component/Card'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const Dashboard = (props) => {

    const [projectList, setProjectList] = useState([]);

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userInfo.userData);

    useEffect(() => {
        getCompany();
        getUserInfo();
    }, []);

    getCompany = async () => {
        var myHeaders = new Headers();
        myHeaders.append("X-Parse-Session-Token", session_token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let projectGroup = await fetch(`${dev_URL}v1/projects`, requestOptions)
        let projects = await projectGroup.text();
        setProjectList(JSON.parse(projects));
        getCurrentProjectInfo(JSON.parse(projects)[0]);
    }

    getUserInfo = async () => {
        var myHeaders = new Headers();
        myHeaders.append("X-Parse-Session-Token", session_token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let userData = await fetch(`${dev_URL}v1/users/settings`, requestOptions)
        let userInfo = await userData.json();
        dispatch({
            type: 'SET_USER',
            payload: userInfo
        });
    }

    getCurrentProjectInfo = async (project) => {
        let projectInfo = await AsyncStorage.getItem('project_details');
        if (projectInfo == null) {
            dispatch({
                type: 'SET_PROJECT',
                payload: project
            });
        } else {
            dispatch({
                type: 'SET_PROJECT',
                payload: JSON.parse(projectInfo)
            });
        }
    }

    selectProject = async (project) => {
        dispatch({
            type: 'SET_PROJECT',
            payload: project
        });
        await AsyncStorage.setItem('project_details', JSON.stringify(project))
        props.navigation.navigate('Review', { selectedProjectId: project.project_id })
    }

    renderCompanyCard = (item, i, type) => {
        if (type == 'my_projects') {
            if (item.is_owner) {
                return (
                    <Pressable onPress={() => selectProject(item)} style={styles.boxContainer} key={i}>
                        <Card name={item.project_name}
                            icon={item.in_auto_swipe_mode} />
                    </Pressable>
                )
            }
        } else {
            if (!item.is_owner) {
                return (
                    <Pressable onPress={() => selectProject(item)} style={styles.boxContainer} key={i}>
                        <Card name={item.project_name}
                            icon={item.in_auto_swipe_mode} />
                    </Pressable>
                )
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome Back,</Text>
            <View style={styles.nameContainer}>
                {Object.keys(userData).length > 0 && <Text style={styles.heading}>{userData.first_name}</Text>}
            </View>

            <View style={styles.cardInfo}>
                <View>
                    <Text style={styles.title}>My Projects</Text>
                </View>
                {
                    projectList.length > 0 ?
                        <FlatList
                            horizontal
                            style={styles.scrollerView}
                            data={projectList}
                            renderItem={({ item, index }) => renderCompanyCard(item, index, 'my_projects')}
                        />
                        :
                        <ActivityIndicator size="small" color="#0000ff" />
                }
            </View>

            <View style={styles.cardInfo}>
                <View >
                    <Text style={styles.title}>Shared with me</Text>
                </View>
                {
                    projectList.length > 0 ?
                        <FlatList
                            horizontal
                            style={styles.scrollerView}
                            data={projectList}
                            renderItem={({ item, index }) => renderCompanyCard(item, index, 'shared_wth_me')}
                        />
                        :
                        <ActivityIndicator size="small" color="#0000ff" />
                }
            </View>
        </View>
    );
}

export default Dashboard;

const styles = StyleSheet.create({
    heading: {
        fontSize: 32,
        fontWeight: "700",
        color: "#212325",
        alignSelf: "center",
        flexWrap: 'wrap',
    },
    nameContainer: { marginTop: 5, height: "8%" },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#212325",
        marginTop: '6%'
    },
    scrollerView: { marginTop: 8, maxHeight: 152 },
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: Math.round(WIDTH * 0.05),
        paddingTop: 0
    },
    cardContainer: {
        flexDirection: "row",
        marginTop: Math.round(HEIGHT * 0.04) > 15 ? 20 : Math.round(WIDTH * 0.4),
        backgroundColor: "pink"
    },
    boxContainer: { width: WIDTH * 0.42, marginRight: 15, height: "100%", },
    cardInfo: {
        height: '40%',
        maxHeight: 225,
    }
})