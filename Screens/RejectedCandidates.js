import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements'
import { dev_URL, session_token } from '@env'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'

import { TEXT } from '../Component/Text'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RejectedCandidates = () => {

    const [loader, setLoader] = useState(false);
    const [rejCandidates, setRejCandidates] = useState([]);

    const projectData = useSelector((state) => state.projectInfo.selectedProjectDetails);

    useEffect(() => {
        getRejectedCandidates();
    }, [])

    useEffect(() => {
        getRejectedCandidates();
    }, [projectData]);

    getRejectedCandidates = async () => {
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

        let candidates = await fetch(`${dev_URL}v1/candidates?project_id=${projectId}&status=rejected`, requestOptions)
        let fetchedCandidates = await candidates.text();
        setRejCandidates(JSON.parse(fetchedCandidates));
        setLoader(false);
    }

    const renderRejCandidate = (rejCand) => {
        return (
            <TouchableOpacity activeOpacity={1} style={styles.candidateContainer}>
                <View style={styles.candBox}>
                    <View style={{ width: '25%', }}>
                        <Image source={{ uri: rejCand.picture_url }} style={styles.candImg} />
                    </View>
                    <View style={styles.candInfoContainer}>
                        <View>
                            <Text style={styles.candName}>{rejCand.name}</Text>
                        </View>
                        <View>
                            <Text numberOfLines={1} style={styles.candPost}>{rejCand.current_job_title}</Text>
                        </View>
                        <View>
                            <Text numberOfLines={1} style={styles.candLocation}>{rejCand.location}</Text>
                        </View>
                    </View>
                    <View style={styles.rateContainer}>
                        <View style={styles.ratingBox}>
                            <Icon name="star"
                                type="antdesign"
                                color="#BABECC"
                                size={11} />

                            <TEXT title={rejCand.score.toFixed(1)}
                                size={11}
                                weight="600"
                                color="#BABECC" />
                        </View>
                    </View>
                </View>
                {
                    rejCand.rejection_reason.length > 0 && <View style={styles.dateContainer}>
                        <Text style={styles.dateStyle}>Reason for rejection: <Text style={{ fontWeight: '600', fontSize: 12 }}>{rejCand.rejection_reason_formatted}</Text></Text>
                    </View>
                }
            </TouchableOpacity>
        )
    }

    if (loader) {
        return (
            <View style={styles.loaderContainer}>
                <View>
                    <View>
                        <Text style={styles.loaderTitle}>Loading the Rejected Candidates</Text>
                    </View>
                    <View>
                        <ActivityIndicator size="small" color="#0000ff" />
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
            <View style={{ justifyContent: 'flex-start', marginLeft: 30, marginTop: 20 }}>
                <Text style={{ fontWeight: '700', fontSize: 17, lineHeight: 24.5, color: '#212325' }}>Rejected Candidates</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ justifyContent: 'center', marginTop: 20, }}>
                    {
                        rejCandidates.length > 0 ? rejCandidates.map((rej) => (renderRejCandidate(rej))) : <ActivityIndicator size="small" color="#0000ff" />
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
    rejContainer: { justifyContent: 'flex-start', marginLeft: 30, marginTop: 20 },
    rejTitle: { fontWeight: '700', fontSize: 17, lineHeight: 24.5, color: '#212325' },
    rejCandidateContainer: { justifyContent: 'center', marginTop: 20, },
    candidateContainer: {
        width: '85%',
        padding: 15,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        height: 117,
        backgroundColor: '#F4F4F4',
        borderRadius: 20,
    },
    candBox: { marginTop: 3, flexDirection: 'row', height: '72%' },
    candImg: { width: 60, height: 60, borderRadius: 10 },
    candInfoContainer: {
        width: '75%',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: 5
    },
    candName: { color: '#212325', fontWeight: '600', fontSize: hp('2%') < 15 ? hp('1.9%') : 14, lineHeight: 20 },
    candPost: { color: '#212325', fontWeight: 'bold', fontSize: hp('1.8%') < 13 ? hp('1.8%') : 12, lineHeight: 18, opacity: 0.5 },
    candLocation: { color: '#212325', fontWeight: '500', fontSize: hp('1.8%') < 13 ? hp('1.9%') : 12, lineHeight: 22, opacity: 0.5 },
    rateContainer: { position: 'absolute', right: 0, top: -10 },
    ratingBox: {
        flexDirection: "row",
        width: 42,
        height: 25,
        borderRadius: 16,
        backgroundColor: "rgba(186,190,204, 0.3)",
        alignItems: "center", justifyContent: "space-evenly"
    },
    dateContainer: { height: '28%', top: 8, flexDirection: 'row', flexWrap: 'wrap', },
    dateStyle: { flex: 1, color: '#2F2E41', opacity: 0.5, fontSize: 13, lineHeight: 13  }
})

export default RejectedCandidates