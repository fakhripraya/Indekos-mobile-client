import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { AppStyle } from '../../config/app.config';
import CheckBox from '@react-native-community/checkbox';
import { TouchableOpacity, ScrollView, Dimensions, StyleSheet, Text, View, TextInput } from 'react-native'

export default function MemberDetails() {

    // member gender 0 is male
    // member gender 1 is female
    // Function states
    const [loopingInput, setLoopingInput] = useState([
        {
            memberName: "",
            memberPhone: "",
            memberGender: 0,
        },
    ])

    const [maxMember, setMaxMember] = useState(null)
    const [toggleCheckMe, setToggleCheckMe] = useState(true)
    const [toggleCheckOther, setToggleCheckOther] = useState(false)

    function increaseMember() {

        if (loopingInput.length < maxMember) {

            const newArr = [...loopingInput];

            newArr[newArr.length] = {
                memberName: "",
                memberPhone: "",
                memberGender: 0,
            }

            setLoopingInput(newArr);

        }

    }

    function decreaseMember() {

        if (loopingInput.length > 1) {

            const newArr = [...loopingInput];

            newArr.pop();

            setLoopingInput(newArr);

        }

    }

    function checkMe() {

        if (toggleCheckMe !== true) {
            setToggleCheckMe(true)
            setToggleCheckOther(false)
        } else {
            setToggleCheckMe(false)
            setToggleCheckOther(false)
        }

    }

    function checkOther() {

        if (toggleCheckOther !== true) {
            setToggleCheckOther(true)
            setToggleCheckMe(false)
        } else {
            setToggleCheckOther(false)
            setToggleCheckMe(false)
        }

    }

    // Renders the elements of the member detail input
    function MemberDetailInput({ children }) {

        const [name, setName] = useState(children.item.memberName)
        const [phone, setPhone] = useState(children.item.memberPhone)

        const txtColorMale = children.item.memberGender === 0 ? "white" : AppStyle.fourt_main_color
        const bgColorMale = children.item.memberGender === 0 ? AppStyle.fourt_main_color : "white"
        const txtColorFemale = children.item.memberGender === 1 ? "white" : AppStyle.fourt_main_color
        const bgColorFemale = children.item.memberGender === 1 ? AppStyle.fourt_main_color : "white"

        function toggleGender(gender, index) {

            let newArr = [...loopingInput]

            if (gender === 1)
                newArr[index].memberGender = 1;
            else
                newArr[index].memberGender = 0;

            setLoopingInput(newArr);
        }

        function handleName(name, index) {

            let newArr = [...loopingInput]

            newArr[index].memberName = name

            setLoopingInput(newArr);

        }

        function handlePhone(phone, index) {

            let newArr = [...loopingInput]

            newArr[index].memberPhone = phone

            setLoopingInput(newArr);

        }

        return (
            <View style={styles.mappedContainer}>
                <View style={styles.detailHeader}>
                    <View style={{ position: 'absolute', alignSelf: 'flex-start' }}><Text style={{ fontWeight: 'bold', fontSize: 14 / Dimensions.get("screen").fontScale }}>Details</Text></View>
                    <View style={{ position: 'absolute', alignSelf: 'flex-end' }}><Text style={{ fontWeight: 'bold', fontSize: 14 / Dimensions.get("screen").fontScale }}>Member {children.index + 1}</Text></View>
                </View>
                <View style={styles.nameInput}>
                    <Text style={{ alignSelf: 'flex-start', paddingBottom: 10, fontWeight: 'bold', fontSize: 14 / Dimensions.get("screen").fontScale }}>Member Name</Text>
                    <View style={styles.nameInputBox}>
                        <TextInput
                            textAlign="left"
                            value={name}
                            onChangeText={(newVal) => setName(newVal)}
                            onEndEditing={() => { handleName(name, children.index) }}
                            style={{ flex: 1, paddingLeft: 10, fontSize: 16 / Dimensions.get("screen").fontScale }} />
                    </View>
                </View>
                <View style={styles.phoneInput}>
                    <Text style={{ alignSelf: 'flex-start', paddingBottom: 10, fontWeight: 'bold', fontSize: 14 / Dimensions.get("screen").fontScale }}>Phone</Text>
                    <View style={styles.phoneInputBox}>
                        <TextInput
                            textAlign="left"
                            value={phone}
                            onChangeText={(newVal) => setPhone(newVal)}
                            onEndEditing={() => { handlePhone(phone, children.index) }}
                            style={{ flex: 1, paddingLeft: 10, fontSize: 16 / Dimensions.get("screen").fontScale }} />
                    </View>
                </View>
                <View style={styles.genderInput}>
                    <Text style={{ alignSelf: 'flex-start', paddingBottom: 10, fontWeight: 'bold', fontSize: 14 / Dimensions.get("screen").fontScale }}>Gender</Text>
                    <View style={styles.genderWrapper}>
                        <TouchableOpacity onPress={() => { toggleGender(0, children.index) }} style={[styles.buttonGender, { position: 'absolute', alignSelf: 'flex-start', backgroundColor: bgColorMale, borderColor: txtColorMale }]}>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 14 / Dimensions.get("screen").fontScale, color: txtColorMale }}>{'  '}Male</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { toggleGender(1, children.index) }} style={[styles.buttonGender, { position: 'absolute', alignSelf: 'flex-end', backgroundColor: bgColorFemale, borderColor: txtColorFemale }]}>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 14 / Dimensions.get("screen").fontScale, color: txtColorFemale }}>Female</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    useEffect(() => {

        setMaxMember(4)

        return () => {
        }
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, width: '100%', height: AppStyle.screenSize.height }}>
                <ScrollView style={{ flex: 1 }}>
                    {/* <View style={[styles.headerWrapper]}>
                        <TouchableOpacity style={{ height: '100%', position: 'absolute', alignSelf: 'flex-start', justifyContent: 'center', left: 20 }}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={[styles.title, { height: '100%', position: 'absolute', alignSelf: 'center', justifyContent: 'center' }]}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 / Dimensions.get("screen").fontScale, }}>Member Details</Text>
                        </View>
                    </View> */}
                    <Text style={styles.title}>Member Details</Text>
                    <View style={styles.absoluteContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 / Dimensions.get("screen").fontScale }}>This Room For</Text>
                        <View style={styles.checkboxWrapper}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    value={toggleCheckMe}
                                    onChange={() => checkMe()}
                                    disabled={false}
                                />
                                <Text onPress={() => checkMe()} style={{ alignSelf: 'center', fontWeight: 'bold' }}>Me</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    value={toggleCheckOther}
                                    onChange={() => checkOther()}
                                    disabled={false}
                                />
                                <Text onPress={() => checkOther()} style={{ alignSelf: 'center', fontWeight: 'bold' }}>Other</Text>
                            </View>
                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 / Dimensions.get("screen").fontScale }}>Person</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 12 / Dimensions.get("screen").fontScale }}>This room maximum is {maxMember} persons</Text>
                        <View style={{ flexDirection: 'row', marginTop: '15%' }}>
                            <View>
                                <TouchableOpacity style={[styles.icon, { marginRight: 30, marginLeft: 10 }]} >
                                    <MaterialIcons name="person-add-alt" size={36} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => { decreaseMember() }} style={styles.plus} >
                                    <AntDesign name="minus" size={24} color={AppStyle.fourt_main_color} />
                                </TouchableOpacity>
                                <View style={[styles.icon, { marginRight: 10, marginLeft: 0 }]}>
                                    <Text style={{ fontSize: 18 / Dimensions.get("screen").fontScale }}>
                                        {loopingInput.length}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => { increaseMember() }} style={styles.plus} >
                                    <MaterialIcons name="add" size={24} color={AppStyle.fourt_main_color} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {loopingInput.map((item, index) => {
                        return (
                            <MemberDetailInput key={index}>
                                {{ item: item, index: index }}
                            </MemberDetailInput>
                        )
                    })}
                    <View style={styles.container_3}>
                        <TouchableOpacity style={[styles.nextBtn, { backgroundColor: AppStyle.sub_main_color }]}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 / Dimensions.get("screen").fontScale }}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    // headerWrapper: {
    //     marginTop: AppStyle.screenSize.height * 0.075,
    //     marginBottom: AppStyle.screenSize.height * 0.075,
    // },
    // title: {
    //     fontWeight: 'bold',
    //     fontSize: 20 / Dimensions.get("screen").fontScale,
    // },
    title: {
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: AppStyle.screenSize.height * 0.05,
        marginBottom: AppStyle.screenSize.height * 0.05,
        fontSize: 20 / Dimensions.get("screen").fontScale,
    },
    absoluteContainer: {
        elevation: 5,
        paddingTop: '5%',
        borderRadius: 15,
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '5%',
        alignSelf: 'center',
        backgroundColor: 'white',
        width: AppStyle.screenSize.width * 0.9,
        height: AppStyle.screenSize.height * 0.45,
        marginBottom: AppStyle.screenSize.height * 0.025,
    },
    mappedContainer: {
        paddingLeft: '5%',
        paddingRight: '5%',
        alignSelf: 'center',
        width: AppStyle.screenSize.width * 0.9,
        height: AppStyle.screenSize.height * 0.425,
        marginBottom: 25
    },
    checkboxWrapper: {
        marginTop: '10%',
        marginBottom: '10%',
    },
    checkboxContainer: {
        flexDirection: 'row',
    },
    detailHeader: {
        height: '20%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    nameInput: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginBottom: AppStyle.screenSize.height * 0.025,
    },
    phoneInput: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginBottom: AppStyle.screenSize.height * 0.025,
    },
    nameInputBox: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 7.5,
        borderColor: 'gray',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        height: AppStyle.screenSize.height * 0.06,
    },
    phoneInputBox: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 7.5,
        borderColor: 'gray',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        height: AppStyle.screenSize.height * 0.06,
    },
    genderInput: {
        width: '100%',
        flexDirection: 'column',
    },
    buttonGender: {
        borderWidth: 1,
        width: '49%',
        paddingLeft: AppStyle.screenSize.width * 0.125,
        borderColor: 'gray',
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 10,
        paddingRight: AppStyle.screenSize.width * 0.125,
    },
    icon: {
        alignItems: 'center',
        borderRadius: 100 / 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        width: AppStyle.screenSize.width * 0.1,
        height: AppStyle.screenSize.height * 0.05,
    },
    plus: {
        marginRight: 10,
        alignItems: 'center',
        borderRadius: 100 / 2,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: AppStyle.fourt_main_color,
        justifyContent: 'center',
        width: AppStyle.screenSize.width * 0.1,
        height: AppStyle.screenSize.height * 0.05,
    },
    container_3: {
        justifyContent: 'center',
        width: AppStyle.screenSize.width,
        height: AppStyle.screenSize.height * 0.15,
        paddingRight: AppStyle.screenSize.width * 0.05,
    },
    nextBtn: {
        paddingTop: 10,
        borderWidth: 1,
        paddingBottom: 10,
        alignItems: 'center',
        borderRadius: 100 / 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        borderColor: 'rgba(0, 0, 0, 0.15)',
        width: AppStyle.screenSize.width * 0.275,
    },
})
