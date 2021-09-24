import React, { useState } from 'react'
import { Icon } from 'react-native-elements'
import { dev_URL, session_token } from '@env'
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//Components
import { TEXT } from './Text'

//React native element Components
import { Chip } from 'react-native-elements';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const navOptions = (icName, icType, title, index, selectedIndex) => {
    return (
        <View>
            <Icon name={icName}
                type={icType}
                color={selectedIndex == index ? "#17A2F3" : '#AEAEB2'}
                size={23} />

            <TEXT title={title}
                size={10}
                weight="600"
                color={selectedIndex == index ? "#17A2F3" : '#AEAEB2'} />
        </View>
    )
}

export const renderExperienceList = (exp, showExp, expList) => {

    showTheData = (exp) => {
        let changedList = [...expList];
        let indexer = changedList.findIndex(x => x.company === exp.company)
        let temp_element = { ...changedList[indexer] };
        temp_element.isOpen = !temp_element.isOpen;
        changedList[indexer] = temp_element;
        showExp(changedList)
    }

    return (
        <View>
            <TouchableOpacity activeOpacity={1} onPress={() => showTheData(exp)} style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15, justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={{ uri: exp.companyLogo }}
                        style={{ width: 25, height: 25, resizeMode: 'contain' }} />
                </View>
                <View style={{ width: '60%' }}>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={{ color: '#212325', fontSize: 14, fontWeight: '700' }}>{exp.title} | {exp.company}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{ color: '#212325', fontSize: 12, fontWeight: '400' }}>{exp.start_date} - {exp.end_date} | </Text>
                        <Text style={{ color: '#AEAEB2', fontSize: 12, fontWeight: '300', }}>{exp.location}</Text>
                    </View>
                </View>
                <View style={{ width: '20%' }}>
                    {
                        exp.description &&
                        <Icon name={exp.isOpen ? 'chevron-up' : 'chevron-down'}
                            type='evilicon'
                            color="#8E8E93"
                            size={40}
                        />
                    }
                </View>
            </TouchableOpacity>
            {exp.isOpen && <View style={{ width: '75%', alignSelf: 'center', marginLeft: '2.5%' }}>
                <Text style={{ fontSize: 12, lineHeight: 21, color: '#808080', flexWrap: 'wrap' }}>
                    {exp.description}
                </Text>
            </View>}
        </View>
    )
}

export const renderEducationList = (edu) => {
    return (
        <View style={{ width: '82%', alignSelf: 'center', marginTop: 15, marginBottom: 15 }}>
            <View>
                <Text style={{ fontWeight: '700', fontSize: 16, color: '#212325', }}>{edu.school}</Text>
            </View>
            <View style={{ flex: 1, marginTop: 5, }}>
                <Text style={{ flexShrink: 1, lineHeight: 20 }}>{edu.degree}, {edu.major} | <Text style={{ flexShrink: 1, color: '#AEAEB2', }}>{edu.grad_year}</Text></Text>
            </View>
        </View>
    )
}

export const renderSkillset = (skills) => {
    return (
        <View style={{ width: '90%', alignSelf: 'center', marginTop: 5, marginBottom: 5 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                {
                    skills.map((skill) => (
                        <View style={{ marginTop: 15, marginLeft: 5, marginRight: 5, }}>
                            <Chip
                                title={skill.name}
                                buttonStyle={{ backgroundColor: '#17A2F3', opacity: 0.8, color: '#000', padding: 10, borderRadius: 12, }}
                                titleStyle={{ color: '#000', fontSize: 12 }}
                            />
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export const renderSummary = (summary) => {
    return (
        <View style={{ width: '80%', justifyContent: 'center', alignSelf: 'center' }}>
            <Text style={{ flexWrap: 'wrap', fontWeight: '400', fontSize: 14, lineHeight: 22 }}>
                {summary}
            </Text>
        </View>
    )
}

export const renderRecs = (recs) => {
    return (
        <View style={{ width: '80%', justifyContent: 'center', alignSelf: 'center' }}>
            {recs.map((rec) => (
                <View style={{ marginBottom: 10 }}>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 24.5 }} >{rec.recommendor_name}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 24.5, marginTop: 5 }} >{rec.recommendor_position}</Text>
                    </View>
                    <View style={{ marginTop: 20 }} >
                        <Text style={{ flexWrap: 'wrap', fontWeight: '400', fontSize: 14, lineHeight: 24.5 }}>
                            {rec.recommendor_content}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    )
}

export const RenderSelectedView = (props) => {
    let sel = props.selectedIndex + '';
    const { showExp, selectedExp, selectEdu, selectSkills, selectSummary, selectRec } = props;
    switch (sel) {
        case '0':
            return selectedExp.map((exp) => (
                renderExperienceList(exp, showExp, selectedExp)
            ))
            break;
        case '1':
            return selectEdu.map((edu) => (
                renderEducationList(edu)
            ))
            break;
        case '2':
            return renderSkillset(selectSkills)
            break;
        case '3':
            return renderSummary(selectSummary)
            break;
        case '4':
            return renderRecs(selectRec)
            break;
        default:
            return props.selectedExp.map((exp) => (
                renderExperienceList(exp)
            ))
    }
}

const footerOpt1 = [
    { navigateTo: 'RejectedReview', icName: 'close', icType: 'antdesign', size: 25, style: 1 },
    { navigateTo: 'MessageCandidate', icName: 'local-post-office', icType: 'material', size: 30, style: 1 },
    { navigateTo: 'SavedCandidates', icName: 'bookmark-outline', icType: 'ionicon', size: 25, style: 1 }
]

const footerOpt2 = [
    { navigateTo: 'MessageCandidate', icName: 'local-post-office', icType: 'material', size: 40, style: 2 },
]

export const FooterOptions = (props) => {

    const { type, candidateId, setStatus, candidateName, candidatePic } = props;

    let footSelected = type + '';

    const navigation = useNavigation();

    approveTheCandidate = async () => {
        var myHeaders = new Headers();
        myHeaders.append("X-Parse-Session-Token", session_token);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
        };
        let candidateResponse = await fetch(`${dev_URL}v1/candidates?candidate_id=${candidateId}&status=approved`, requestOptions)
        let status = await JSON.parse(candidateResponse.status);
        status = status + '';
        setStatus(status)
    }

    optSelect = (opt) => {
        switch (opt) {
            case 'SavedCandidates':
                approveTheCandidate();
                break;
            case 'RejectedReview':
                navigation.navigate(opt, { candidate_name: candidateName, candidate_pic: candidatePic, candidate_id: candidateId })
                break;
            default: console.log("Hello");
        }
    }

    renderFooterOpt = (footOpt) => {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => optSelect(footOpt.navigateTo)} style={footOpt.style == 2 ? styles.footerIcons2 : styles.footerIcons1}>
                <Icon name={footOpt.icName}
                    type={footOpt.icType}
                    color={footOpt.style == 2 ? '#17A2F3' : '#AEAEB2'}
                    size={footOpt.size} />
            </TouchableOpacity>
        )
    }

    const switchSelector = (footSelected) => {
        switch (footSelected) {
            case '1':
                return (
                    footerOpt1.map((item) => (
                        renderFooterOpt(item, props)
                    ))
                )
                break;
            case '2':
                return (
                    footerOpt2.map((item) => (
                        renderFooterOpt(item, props)
                    ))
                )
                break;
            default:
                return (
                    footerOpt1.map((item) => (
                        renderFooterOpt(item, props)
                    ))
                )
        }
    }

    return (
        <View style={{ justifyContent: 'center', alignSelf: 'center', width: '70%', bottom: footSelected == 2 ? '3%' : '1%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {
                    switchSelector(footSelected)
                }
            </View>
        </View>
    )
}

export const ProfileView = (props) => {
    return (
        <View style={{ flexDirection: "row", paddingLeft: wp('3%'), height: 180 }}>
            <View style={{
                width: "25%",
                alignItems: "center", justifyContent: "flex-start",
                shadowColor: "#BABECC",
                shadowOffset: { width: 5, height: 8 },
                shadowRadius: 8,
                shadowOpacity: 0.6,
                elevation: 20,
            }}>
                <View style={{ width: Dimensions.get('window').width * 0.18, maxWidth: 70, height: Dimensions.get('window').width * 0.18, maxHeight: 70 }}>
                    <Image source={{ uri: props.img }}
                        style={{ width: '100%', height: '100%', borderRadius: Math.round((Dimensions.get('window').width * 0.2) + (Dimensions.get('window').height * 0.2)) / 2, resizeMode: "stretch" }} />
                </View>
            </View>

            <View style={{ width: '75%' }}>
                <TEXT title={props.name}
                    size={16}
                    weight="bold"
                    color="#212325"
                    lineHeight={24} />

                <TEXT title={props.designation}
                    size={16}
                    weight="600"
                    color="#212325"
                    lineHeight={24} />

                <View style={{ flexDirection: "row", marginTop: hp("1%") }}>
                    <Icon name="location-pin"
                        type="material"
                        color="rgba(128, 128, 128, 0.57)"
                        size={19} />
                    <View style={{ marginLeft: 5 }}>
                        <TEXT title={props.location}
                            size={14}
                            color="#8E8E8E" />
                    </View>
                </View>
                <TEXT title={`Years of Experience: ${props.totalExperience}`}
                    size={14}
                    weight="600"
                    color="#AEAEB2"
                    lineHeight={24} />

                <TEXT title={`Relevant Experience: ${props.relevantExperience}`}
                    size={14}
                    weight="600"
                    color="#AEAEB2"
                    lineHeight={24} />

                <View style={{ flexDirection: "row", justifyContent: 'flex-start', marginTop: hp("2%") }}>
                    <View style={{
                        flexDirection: "row",
                        width: '20%',
                        height: '40%',
                        borderRadius: 16,
                        backgroundColor: "rgba(23, 162, 243, 0.3)",
                        alignItems: "center", justifyContent: "space-evenly"
                    }}>
                        <Icon name="star"
                            type="antdesign"
                            color="#17A2F3"
                            size={16} />

                        <TEXT title={props.rating}
                            size={16}
                            weight="600"
                            color="#17A2F3" />

                    </View>

                    <View style={{
                        width: '55%',
                        height: '40%',
                        borderRadius: 16,
                        borderWidth: 1,
                        borderColor: "#17A2F3",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        marginLeft: 20
                    }}>
                        <TEXT title={`Est. $${props.min_range}K-$${props.max_range}K`}
                            size={13}
                            weight="bold"
                            color="#AEAEB2" />

                    </View>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    footerIcons1: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignContent: 'center',
        zIndex: 1000,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    footerIcons2: {
        width: 74,
        height: 74,
        borderRadius: 37,
        justifyContent: 'center',
        alignContent: 'center',
        zIndex: 1000,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
})