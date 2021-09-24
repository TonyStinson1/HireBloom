import { dev_URL, session_token } from '@env'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

import { Chip } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const reasonsList = [
    { title: 'Don’t like current job title', code: 1, isChecked: false },
    { title: 'Overqualified', code: 5, isChecked: false },
    { title: 'Want higher degrees', code: 9, isChecked: false },
    { title: 'Unlikely to respond', code: 7, isChecked: false },
    { title: 'Don’t like current company', code: 13, isChecked: false },
    { title: 'Other', code: 11, isChecked: false },
]

const RejectedReview = (props) => {

    const [selectedReasons, setSelectedReasons] = useState([]);

    const dispatch = useDispatch();
    const projectData = useSelector((state) => state.projectInfo.selectedProjectDetails);

    useEffect(() => {
        setSelectedReasons([...reasonsList])
    }, []);

    const { candidate_name, candidate_pic, candidate_id } = props.route.params;

    const addReasons = (item) => {

        let reasons = [...selectedReasons]
        let index1 = reasons.findIndex(x => x.title === item.title);
        let obj = { ...reasons[index1] };
        obj.isChecked = !obj.isChecked
        reasons[index1] = obj

        setSelectedReasons(reasons)
    }

    const isSelectedReasons = () => {
        let isSelected = selectedReasons.filter((res) => res.isChecked == true)
        return isSelected.length
    }

    const submitReason = async () => {
        let selectedCodes = selectedReasons.filter((res) => res.isChecked == true)
        let rej_codes = selectedCodes.map((sel) => sel.code)
        var myHeaders = new Headers();
        myHeaders.append("X-Parse-Session-Token", session_token);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
        };

        let candidateResponse = await fetch(`${dev_URL}v1/candidates?candidate_id=${candidate_id}&status=rejected&rejection_code=${rej_codes}`, requestOptions)
        let status = await JSON.parse(candidateResponse.status);
        status = status + '';
        if(status == '200'){
            dispatch({
                type: 'SET_PROJECT',
                payload: {...projectData}
            });
            props.navigation.goBack()
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.picContainer}>
                    <Image source={{ uri: candidate_pic }}
                        style={styles.profile} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.profileTitle}>{candidate_name}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.notify}>Tell us why you are rejecting the candidate to improve your search:</Text>
                </View>
            </View>
            <View style={styles.reasonContainer}>
                <View style={styles.reasonBox}>
                    <Text style={styles.reasonTitle}>Choose Reasons</Text>
                </View>
                <ScrollView style={{ height: '78%' }} showsVerticalScrollIndicator={true}>
                    <View style={styles.chipWrapper}>
                        {
                            selectedReasons.map((reason) => (
                                <View style={styles.chipContainer}>
                                    <Chip
                                        title={reason.title}
                                        buttonStyle={{ ...styles.btnStyle, backgroundColor: reason.isChecked ? '#17A2F3' : '#fff', }}
                                        titleStyle={styles.chipTitleStyle}
                                        activeOpacity={1}
                                        onPress={() => addReasons(reason)}
                                    />
                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>
            <View style={{ ...styles.submitContainer, opacity: isSelectedReasons() > 0 ? 1 : 0.34 }}>
                <TouchableOpacity activeOpacity={1} onPress={() => submitReason()} style={styles.submitBox}>
                    <Text style={styles.submitTitle}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { backgroundColor: "#FFFFFF", flex: 1 },
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '30%',
    },
    picContainer: {
        width: "25%",
        alignItems: "center", justifyContent: "flex-start",
        shadowColor: "#BABECC",
        shadowOffset: { width: 5, height: 8 },
        // shadowOpacity: 0.20,
        //  shadowRadius: 1.41,
        shadowRadius: 8,
        shadowOpacity: 0.6,
        elevation: 20,
        marginTop: '20%'
    },
    profile: { width: 85, height: 85, borderRadius: 42.5, resizeMode: "stretch" },
    profileTitle: { color: '#17A2F3', fontSize: 14, fontWeight: '700' },
    detailContainer: { marginTop: 30, width: '80%', justifyContent: 'center' },
    notify: {
        color: '#212325',
        fontSize: 14,
        fontWeight: '700',
        flexWrap: 'wrap',
        lineHeight: 24.5
    },
    reasonContainer: {
        top: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        height: '35%',
        width: '80%',
        backgroundColor: 'rgba(23,162,243, .3)',
        borderWidth: 0,
        borderRadius: 16
    },
    reasonBox: {
        height: '22%',
        borderWidth: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '99%',
        marginTop: 2,
        borderWidth: 0,
        backgroundColor: '#fff',
        borderRadius: 16
    },
    reasonTitle: {
        textAlign: 'center',
        color: '#17A2F3',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24.5
    },
    chipWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginTop: hp('2.5%') > 15 ? 15 : hp('1.6%')
    },
    chipContainer: { marginTop: hp('2.5%') > 15 ? hp('2.0%') > 15 ? 15 : hp('1.5%') : hp('1%'), },
    btnStyle: {
        opacity: 0.8,
        padding: 8,
        borderRadius: 18
    },
    chipTitleStyle: { color: '#000000', fontSize: 11, fontWeight: '400' },
    submitContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 110,
    },
    submitBox: {
        width: 111,
        height: 34,
        backgroundColor: '#17A2F3',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitTitle: { textAlign: 'center', color: '#fff', fontWeight: '600', lineHeight: 22, }
})

export default RejectedReview;