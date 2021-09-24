import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { ScrollView, } from 'react-native-gesture-handler'

import { Icon } from 'react-native-elements'
import { Shadow } from 'react-native-shadow-2';

const MessageCandidate = () => {

    const [openbd, setOpenbd] = useState(false)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("Select Mode");
    const [items, setItems] = useState([
        { label: 'Email', value: 'email' },
        { label: 'LinkedIn InMail', value: 'linkedIn' }
    ])
    const [linkedInFound, setLinkedInFound] = useState(true);
    const [errorType, setErrorType] = useState('');
    const [errorFound, setErrorFound] = useState(false);

    useEffect(() => {
        setErrorType('Email');
        setErrorFound(true);
        openbd
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.imageContainer}>
                    {/* <Shadow startColor="#f5f6f8" finalColor="#f9fafb" distance="15" getViewStyleRadius={true} radius={{ topLeft: 50, default: 25 }} > */}
                    <View style={styles.imageBox}>
                        <Image source={require("../../assets/user.png")}
                            style={styles.imageStyle} />
                    </View>
                    {/* </Shadow> */}
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.profileName}>John Doe</Text>
                </View>
                <View style={styles.msgTitleContainer}>
                    <Text style={styles.msgTitle}>Send John Doe a message!</Text>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <TextInput numberOfLines={20} multiline={true} style={styles.input} />
            </View>
            {
                linkedInFound ?
                    <View style={styles.dropDownContainer}>
                        <View style={{ width: '55%' }} onTouchStart={(e) => { console.log('touchMove', e.nativeEvent) }}>
                            <TouchableOpacity style={styles.dropDown}
                                onPress={() => setOpen(!open)}
                            >
                                <Text style={{}}>{value}</Text>
                                <View style={{ marginRight: 5 }}>
                                    <Icon name="keyboard-arrow-down"
                                        type="material"
                                        size={15} />
                                </View>
                            </TouchableOpacity>

                            {open &&
                                <View style={styles.dropDownMenu}>
                                    {items.map((item, i) => {
                                        return (
                                            <TouchableOpacity style={{ ...styles.menuItem, borderBottomWidth: i != items.length - 1 ? 1 : 0, }}
                                                onPress={() => { setOpen(false), setValue(item.label) }}>
                                                <Text style={{ ...styles.menuItemText, color: value == item.label ? "#212325" : "#C4C4C4", }}>{item.label}</Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            }
                        </View>


                        <View style={styles.submitContainer}>
                            <TouchableOpacity activeOpacity={1} onPress={() => console.log("Pressed")} style={styles.submitBox}>
                                <Text style={styles.submitText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={styles.differentContainer}>
                        <View style={styles.balancedwidth}>
                            <TouchableOpacity activeOpacity={1} onPress={() => console.log("Pressed")} style={styles.saveLaterContainer}>
                                <Text style={styles.anotherTxt}>Add to Save for Later</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            }

            {
                errorFound && <View style={{ ...styles.errorContainer, width: errorType == 'Email' ? '75%' : '90%',  }}>
                    <View style={styles.row}>
                        <View style={styles.centered}>
                            <Icon name='block-flipped'
                                type='material'
                                color='#fff'
                                size={30} />
                        </View>
                        <View style={{ left: 10, }}>
                            <View>
                                <Text style={styles.errorText}>
                                    {errorType == 'Email' ? 'Email not found' : 'LinkedIn not found'}
                                </Text>
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <Text style={styles.errorDetail}>
                                    {errorType == 'Email' ? 'Select one of the following options' : 'Visit the website to authenticate through LinkedIn'}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.closeIcon}>
                            <TouchableOpacity activeOpacity={1} onPress={() => setErrorFound(false)}>
                                <Icon name='close'
                                    type='evilicon'
                                    color='#fff'
                                    size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: { backgroundColor: "#FFFFFF", flex: 1 },
    profileContainer: { justifyContent: 'center', alignItems: 'center', height: '15%', },
    imageContainer: {
        width: "25%",
        alignItems: "center", justifyContent: "flex-start",
        shadowColor: "#BABECC",
        shadowOffset: { width: 5, height: 8 },
        // shadowOpacity: 0.20,
        //  shadowRadius: 1.41,
        shadowRadius: 8,
        shadowOpacity: 0.6,
        elevation: 2,
        marginTop: '20%',
    },
    imageBox: { borderTopLeftRadius: 5, borderBottomRightRadius: 40, borderTopRightRadius: 40, borderBottomLeftRadius: 40 },
    imageStyle: { width: 85, height: 85, borderRadius: 42.5, resizeMode: "stretch" },
    profileName: { color: '#17A2F3', fontSize: 14, fontWeight: '700' },
    msgTitleContainer: { marginTop: 30, width: '80%', justifyContent: 'center', alignItems: 'center' },
    msgTitle: { color: '#212325', fontSize: 16, fontWeight: '700', flexWrap: 'wrap', lineHeight: 24.5 },
    inputContainer: { top: 90, width: '80%', height: '42%', justifyContent: 'center', alignSelf: 'center', },
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
    dropDownContainer: { 
        top: 90, 
        marginTop: 30, 
        flexDirection: 'row', 
        width: '80%', 
        justifyContent: 'center', 
        alignSelf: 'center' 
    },
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
        paddingLeft: 15,
        justifyContent: 'space-between'
    },
    dropDownMenu: {
        width: "80%",
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
        zIndex: 1000
    },
    menuItem: {
        height: 35,
        paddingLeft: 15,
        borderBottomColor: "#E5E5E5",
        justifyContent: "center"
    },
    menuItemText: { fontSize: 14 },
    submitContainer: { width: '45%', justifyContent: 'center', alignItems: 'flex-end', alignSelf: "flex-start" },
    submitBox: { 
        width: 111, 
        height: 38, 
        backgroundColor: '#17A2F3', 
        borderRadius: 12, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    submitText: { textAlign: 'center', color: '#fff', fontWeight: '600', lineHeight: 22, },
    differentContainer: { 
        top: 90, 
        marginTop: 30, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignSelf: 'center' 
    },
    balancedwidth: { justifyContent: 'center', width: '55%' },
    saveLaterContainer: { 
        height: 35, 
        backgroundColor: '#17A2F3', 
        borderRadius: 12, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    anotherTxt: { textAlign: 'center', color: '#fff', fontWeight: '600', lineHeight: 22, },
    errorContainer: { 
        position: 'absolute', 
        bottom: 15, 
        height: 70, 
        borderRadius: 6, 
        padding: 12, 
        backgroundColor: '#FB5B5B', 
        justifyContent: 'center', 
        alignSelf: 'center' 
    },
    row: { flexDirection: 'row' },
    centered: { justifyContent: 'center', },
    errorText: { 
        color: '#fff', 
        fontSize: 13, 
        lineHeight: 21, 
        fontWeight: '600', 
        flexWrap: 'wrap' 
    },
    errorDetail: { 
        color: '#fff', 
        fontSize: 11, 
        lineHeight: 21, 
        fontWeight: '400', 
        flexWrap: 'wrap' 
    },
    closeIcon: { position: 'absolute', right: 0 }
})

export default MessageCandidate;