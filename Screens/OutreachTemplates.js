import React, { useState, useEffect } from 'react'
import { dev_URL, session_token } from '@env'
import { useSelector, useDispatch } from 'react-redux';

import {
    View,
    Text,
    Keyboard,
    TextInput,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'

import { Icon } from 'react-native-elements'

const OutReachTemplates = () => {

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [projectList, setProjectList] = useState([]);
    const [value, setValue] = useState("Please Select");
    const [outReachInfo, setOutReachInfo] = useState({});
    const [loader, setLoader] = useState(false);

    const projectData = useSelector((state) => state.projectInfo.selectedProjectDetails);

    useEffect(() => {
        getOutReachInfo();
        getCompany();
    }, [])

    useEffect(() => {
        getOutReachInfo();
    }, [projectData]);

    getOutReachInfo = async () => {
        setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append("X-Parse-Session-Token", session_token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let projectId = projectData.project_id

        let info = await fetch(`${dev_URL}v1/projects/settings?project_id=${projectId}`, requestOptions)
        let fetchedInfo = await info.text();
        fetchedInfo = JSON.parse(fetchedInfo)
        setInput(fetchedInfo.initial_outreach_template);
        setOutReachInfo(fetchedInfo);
        setLoader(false)
    }

    getCompany = async () => {
        setLoader(true)
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
        setLoader(false)
    }

    if (loader) {
        return (
            <View style={styles.loaderContainer}>
                <View>
                    <View>
                        <Text style={styles.loaderTitle}>Loading OutReach Templates</Text>
                    </View>
                    <View>
                        <ActivityIndicator size="small" color="#0000ff" />
                    </View>
                </View>
            </View>
        )
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAwareScrollView
                scrollEnabled={false}
                style={styles.container}
            >
                <View>
                    <View style={styles.screenTitleContainer}>
                        <Text style={styles.screenTitle}>Outreach Templates</Text>
                    </View>

                    <View style={styles.templateContainer}>
                        <View style={{ width: '75%' }}>
                            <TouchableOpacity style={styles.dropDown}
                                activeOpacity={1}
                                onPress={() => setOpen(!open)}>
                                <Text style={{ width: "85%" }}>{value}</Text>
                                <Icon name="keyboard-arrow-down"
                                    type="material"
                                    size={15} />
                            </TouchableOpacity>

                            {open &&
                                <ScrollView style={styles.dropDownMenu}>
                                    {projectList.map((item, i) => {
                                        return (
                                            <TouchableOpacity style={{ ...styles.dropDownMenuItem, borderBottomWidth: i !== projectList.length - 1 ? 1 : 0, }}
                                                onPress={() => { setOpen(false), setValue(item.project_name) }}>
                                                <Text style={{ ...styles.menuLabel, color: value == item.label ? "#212325" : "#C4C4C4", }}>{item.project_name}</Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </ScrollView>
                            }
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput onChangeText={text => setInput(text)} numberOfLines={20} multiline={true} style={styles.input} value={input} />
                    </View>

                    <View style={styles.btnContainer}>
                        <View style={styles.btnBox}>
                            <TouchableOpacity activeOpacity={1} onPress={() => console.log("Pressed")} style={styles.btnArea}>
                                <Text style={styles.btnText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback >
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
    screenTitleContainer: { justifyContent: 'flex-start', marginLeft: 40, marginTop: 20 },
    screenTitle: { fontWeight: '700', fontSize: 17, lineHeight: 24.5, color: '#212325' },
    templateContainer: { marginTop: 50, flexDirection: 'row', width: '80%', justifyContent: 'center', },
    dropDown: {
        width: "80%",
        height: 38,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
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
        paddingLeft: 15
    },
    dropDownMenu: {
        width: "80%",
        height: 120,
        marginTop: 4,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2.62,
        elevation: 6,
        borderWidth: 0,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 40,
    },
    dropDownMenuItem: {
        height: 40,
        paddingLeft: 15,
        borderBottomColor: "#E5E5E5",
        justifyContent: "center",
    },
    menuLabel: { fontSize: 14 },
    inputContainer: {
        top: 30,
        width: '80%',
        height: '60%',
        justifyContent: 'center',
        alignSelf: 'center',
        zIndex: -999
    },
    input: {
        width: '100%',
        height: '100%',
        color: '#000000',
        textAlignVertical: 'top',
        backgroundColor: '#F4F4F4',
        borderRadius: 16,
        padding: 25,
        paddingTop: 20
    },
    btnContainer: {
        top: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    btnBox: { justifyContent: 'center', width: 110 },
    btnArea: { height: 35, backgroundColor: '#17A2F3', borderRadius: 12, justifyContent: 'center', alignItems: 'center', },
    btnText: { textAlign: 'center', color: '#fff', fontWeight: '600', lineHeight: 22, }
})

export default OutReachTemplates;