import React, { useState, useEffect } from 'react'
import { Icon } from 'react-native-elements'
import { dev_URL, session_token } from '@env'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'

import { TEXT } from '../Component/Text'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SavedCandidates = (props) => {

    const [loader, setLoader] = useState(false);
    const [savedCandidates, setSavedCandidates] = useState([]);

    const projectData = useSelector((state) => state.projectInfo.selectedProjectDetails);

    useEffect(() => {
        getSavededCandidates();
    }, []);

    useEffect(() => {
        getSavededCandidates();
    }, [projectData]);

    getSavededCandidates = async () => {
        setLoader(true);
        var myHeaders = new Headers();
        myHeaders.append("X-Parse-Session-Token", session_token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let projectId;
        projectId = projectData.project_id;

        let candidates = await fetch(`${dev_URL}v1/candidates?project_id=${projectId}&status=approved`, requestOptions)
        let fetchedCandidates = await candidates.text();
        setSavedCandidates(JSON.parse(fetchedCandidates));
        setLoader(false);
    }

    const renderSavedCandidate = (saveCand, index) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => props.navigation.navigate('LaterReview', { reviewCandidate: savedCandidates[index] })}
                style={{ ...styles.rejCandidateBox, borderColor: saveCand.msgError ? '#FE5555' : '', borderWidth: saveCand.msgError ? 0.5 : 0, height: saveCand.msgError ? 115 : 95, }}>
                <View style={styles.rejCont}>
                    <View style={{ width: '25%', }}>
                        <Image source={{ uri: saveCand.picture_url }} style={styles.candImg} />
                    </View>
                    <View style={styles.candInfoContainer}>
                        <View>
                            <Text style={styles.candName}>{saveCand.name}</Text>
                        </View>
                        <View>
                            <Text numberOfLines={1} style={styles.candPost}>{saveCand.current_job_title}</Text>
                        </View>
                        <View>
                            <Text numberOfLines={1} style={styles.candLocation}>{saveCand.location}</Text>
                        </View>
                    </View>
                    <View style={styles.rateContainer}>
                        <View style={styles.ratingBox}>
                            <Icon name="star"
                                type="antdesign"
                                color="#17A2F3"
                                size={11} />

                            <TEXT title={saveCand.score.toFixed(1)}
                                size={11}
                                weight="600"
                                color="#17A2F3" />
                        </View>
                    </View>
                </View>
                {saveCand.msgError && <View style={styles.dateContainer}>
                    <Text style={styles.errorStyle}>Message failed to send on 7/28</Text>
                </View>}
            </TouchableOpacity>
        )
    }

    if (loader) {
        return (
            <View style={styles.loaderContainer}>
                <View>
                    <View>
                        <Text style={styles.loaderTitle}>Loading the Saved Candidates</Text>
                    </View>
                    <View>
                        <ActivityIndicator size="small" color="#0000ff" />
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.screenTitleContainer}>
                <Text style={styles.screenTitle}>Saved for Later Candidates</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.rejList}>
                    {
                        savedCandidates.length > 0 ? savedCandidates.map((save, index) => (renderSavedCandidate(save, index))) : <ActivityIndicator size="small" color="#0000ff" />
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { backgroundColor: "#FFFFFF", flex: 1 },
    loaderContainer: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loaderTitle: {
        fontSize: 17,
        fontWeight: '500',
    },
    screenTitleContainer: { justifyContent: 'flex-start', marginLeft: 30, marginTop: 20 },
    screenTitle: { fontWeight: '700', fontSize: 17, lineHeight: 24.5, color: '#212325' },
    rejList: { justifyContent: 'center', marginTop: 20, },
    rejCandidateBox: {
        width: '85%',
        padding: 15,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#F4F4F4',
        borderRadius: 20,
    },
    rejCont: { marginTop: 3, flexDirection: 'row', height: '80%', },
    candImg: { width: 60, height: 60, borderRadius: 10 },
    candInfoContainer: {
        width: '75%',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: 5,
    },
    candName: { color: '#212325', fontWeight: '600', fontSize: hp('2%') < 15 ? hp('1.9%') : 14, lineHeight: 20 },
    candPost: { color: '#212325', fontWeight: 'bold', fontSize: hp('1.8%') < 13 ? hp('1.8%') : 12, lineHeight: 18, opacity: 0.5 },
    candLocation: { color: '#212325', fontWeight: '500', fontSize: hp('1.8%') < 13 ? hp('1.9%') : 12, lineHeight: 22, opacity: 0.5 },
    rateContainer: { position: 'absolute', right: 0, top: -10 },
    ratingBox: {
        flexDirection: "row",
        width: 42,
        height: 22,
        borderRadius: 16,
        backgroundColor: "rgba(23,162,243, 0.3)",
        alignItems: "center", justifyContent: "space-evenly"
    },
    dateContainer: { height: '20%', top: 5 },
    errorStyle: { color: '#FE5555', fontSize: 13 }
})

export default SavedCandidates