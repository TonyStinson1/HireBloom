import { dev_URL, session_token } from '@env'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

//Components
import { navOptions, RenderSelectedView, experienceList, FooterOptions, ProfileView } from '../../Component/ReviewComponents'

const navOpt = [
    { icName: 'briefcase-variant', icType: 'material-community', title: 'Experience' },
    { icName: 'graduation', icType: 'simple-line-icon', title: 'Education' },
    { icName: 'head-cog-outline', icType: 'material-community', title: 'Skills' },
    { icName: 'list-alt', icType: 'material', title: 'Summary' },
    { icName: 'thumb-up-outline', icType: 'material-community', title: 'Recs' },
];

const Review = (props) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [candidates, setCandidates] = useState([])
    const [selectedExp, setSelectedExp] = useState([]);
    const [loader, setLoader] = useState(false);
    const [status, setStatus] = useState('');

    const projectData = useSelector((state) => state.projectInfo.selectedProjectDetails);

    useEffect(() => {
        getCandidate();
    }, []);

    useEffect(() => {
        getCandidate();
    }, [projectData]);

    useEffect(() => {
        if(status == '200'){
            getCandidate();
        }
    }, [status]);

    getCandidate = async () => {
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

        let candidate = await fetch(`${dev_URL}v1/candidates?project_id=${projectId}&status=under_review`, requestOptions)
        let fetchedCandidate = await candidate.text();
        setCandidates(JSON.parse(fetchedCandidate));
        let experiences = [...JSON.parse(fetchedCandidate)[0].experiences].map(exp => ({ ...exp, isOpen: false }))
        setSelectedExp(experiences)
        setLoader(false);
    }

    if (loader) {
        return (
            <View style={styles.loaderContainer}>
                <View>
                    <View>
                        <Text style={styles.loaderTitle}>Loading the Under Review Candidate</Text>
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
            {
                candidates.length > 0 ? <ProfileView
                    name={candidates[0].name}
                    img={candidates[0].picture_url}
                    designation={candidates[0].current_job_title}
                    location={candidates[0].location}
                    totalExperience={candidates[0].years_of_exp}
                    relevantExperience={candidates[0].relevant_yoe.toFixed(0)}
                    rating={candidates[0].score.toFixed(1)}
                    min_range={127}
                    max_range={177}
                />
                    :
                    <ActivityIndicator size="small" color="#0000ff" />
            }

            <View >
                <View style={styles.lineView} />
                <View style={styles.navContainer}>
                    {
                        navOpt.map((item, index) => (
                            <TouchableOpacity activeOpacity={1} onPress={() => setSelectedIndex(index)}>
                                {navOptions(item.icName, item.icType, item.title, index, selectedIndex)}
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>

            <View style={styles.selectedView}>
                <ScrollView showsVerticalScrollIndicator={true} >
                    {
                        candidates.length > 0 ?
                            <RenderSelectedView
                                selectedIndex={selectedIndex}
                                selectedExp={selectedExp}
                                showExp={setSelectedExp}
                                selectEdu={candidates[0].education}
                                selectSkills={candidates[0].skills}
                                selectSummary={candidates[0].summary}
                                selectRec={candidates[0].recommendations}
                            />
                            :
                            <ActivityIndicator size="small" color="#0000ff" />
                    }
                </ScrollView>
            </View>
            <View style={styles.footerContainer}>
                <FooterOptions
                    type={1}
                    setStatus={setStatus}
                    candidateId={candidates.length > 0 ? candidates[0].id : ''}
                    candidateName={candidates.length > 0 ? candidates[0].name : ''}
                    candidatePic={candidates.length > 0 ? candidates[0].picture_url : ''}
                />
            </View>
        </View>
    );
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
    lineView: {
        top: 10,
        height: 1,
        backgroundColor: "#E6E6E6",
        width: "86%",
        alignSelf: "center",
    },
    navContainer: {
        top: 25,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    selectedView: { marginTop: 40, height: '40%' },
    footerContainer: { position: "absolute", bottom: 15, width: "100%" }
})

export default Review;