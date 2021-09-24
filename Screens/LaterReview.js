import React, { useState, useEffect } from 'react'
import { ScrollView, } from 'react-native-gesture-handler'
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'

//Components
import { navOptions, RenderSelectedView, FooterOptions, ProfileView } from '../Component/ReviewComponents'

const navOpt = [
    { icName: 'briefcase-variant', icType: 'material-community', title: 'Experience' },
    { icName: 'graduation', icType: 'simple-line-icon', title: 'Education' },
    { icName: 'head-cog-outline', icType: 'material-community', title: 'Skills' },
    { icName: 'list-alt', icType: 'material', title: 'Summary' },
    { icName: 'thumb-up-outline', icType: 'material-community', title: 'Recs' },
];

const LaterReview = (props) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedExp, setSelectedExp] = useState([]);
    const [candidate, setCandidate] = useState({})
    const { reviewCandidate } = props.route.params;

    useEffect(() => {
        let fetchedInfo = JSON.stringify(reviewCandidate);
        fetchedInfo = JSON.parse(fetchedInfo)
        setCandidate({ ...fetchedInfo });
        let experiences = fetchedInfo.experiences.map(exp => ({ ...exp, isOpen: false }))
        setSelectedExp(experiences)
    }, [])

    return (
        <View style={styles.container}>
            {
                Object.keys(candidate).length > 0 ? <ProfileView
                    name={candidate.name}
                    img={candidate.picture_url}
                    designation={candidate.current_job_title}
                    location={candidate.location}
                    totalExperience={candidate.years_of_exp}
                    relevantExperience={candidate.relevant_yoe.toFixed(0)}
                    rating={candidate.score.toFixed(1)}
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
                        Object.keys(candidate).length > 0 ?
                            <RenderSelectedView
                                selectedIndex={selectedIndex}
                                selectedExp={selectedExp}
                                showExp={setSelectedExp}
                                selectEdu={candidate.education}
                                selectSkills={candidate.skills}
                                selectSummary={candidate.summary}
                                selectRec={candidate.recommendations}
                            />
                            :
                            <ActivityIndicator size="small" color="#0000ff" />
                    }
                </ScrollView>
            </View>
            <View style={styles.footerContainer}>
                <FooterOptions type={2} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: "#FFFFFF", flex: 1 },
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

export default LaterReview;