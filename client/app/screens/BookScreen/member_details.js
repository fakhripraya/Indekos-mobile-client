import {
    View,
    Text,
    ScrollView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { AppStyle } from '../../config/app.config';
import { Normalize, NormalizeFont } from '../../functions/normalize';

export default function MemberDetails({ navigation }) {

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
                    <View style={{ position: 'absolute', alignSelf: 'flex-start' }}><Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(14) }}>Details</Text></View>
                    <View style={{ position: 'absolute', alignSelf: 'flex-end' }}><Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(14) }}>Member {children.index + 1}</Text></View>
                </View>
                <View style={styles.nameInput}>
                    <Text style={{ alignSelf: 'flex-start', paddingBottom: Normalize(10), fontWeight: 'bold', fontSize: NormalizeFont(14) }}>Member Name</Text>
                    <View style={styles.nameInputBox}>
                        <TextInput
                            textAlign="left"
                            value={name}
                            onChangeText={(newVal) => setName(newVal)}
                            onEndEditing={() => { handleName(name, children.index) }}
                            style={{ flex: 1, paddingLeft: Normalize(10), fontSize: NormalizeFont(14) }} />
                    </View>
                </View>
                <View style={styles.phoneInput}>
                    <Text style={{ alignSelf: 'flex-start', paddingBottom: Normalize(10), fontWeight: 'bold', fontSize: NormalizeFont(14) }}>Phone</Text>
                    <View style={styles.phoneInputBox}>
                        <TextInput
                            textAlign="left"
                            value={phone}
                            onChangeText={(newVal) => setPhone(newVal)}
                            onEndEditing={() => { handlePhone(phone, children.index) }}
                            style={{ flex: 1, paddingLeft: Normalize(10), fontSize: NormalizeFont(14) }} />
                    </View>
                </View>
                <View style={styles.genderInput}>
                    <Text style={{ alignSelf: 'flex-start', paddingBottom: Normalize(10), fontWeight: 'bold', fontSize: NormalizeFont(14) }}>Gender</Text>
                    <View style={styles.genderWrapper}>
                        <TouchableOpacity onPress={() => { toggleGender(0, children.index) }} style={[styles.buttonGender, { position: 'absolute', alignSelf: 'flex-start', backgroundColor: bgColorMale, borderColor: txtColorMale }]}>
                            <View>
                                <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: NormalizeFont(14), color: txtColorMale }}>Male</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { toggleGender(1, children.index) }} style={[styles.buttonGender, { position: 'absolute', alignSelf: 'flex-end', backgroundColor: bgColorFemale, borderColor: txtColorFemale }]}>
                            <View>
                                <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: NormalizeFont(14), color: txtColorFemale }}>Female</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    function CustomCheckboxMe() {

        if (toggleCheckMe) {
            return (
                <MaterialIcons onPress={() => checkMe()} name="check-box" size={Normalize(24)} color={AppStyle.success} />
            )
        }
        else {
            return (
                <MaterialIcons onPress={() => checkMe()} name="check-box-outline-blank" size={Normalize(24)} color="gray" />
            )
        }

    }

    function CustomCheckboxOther() {

        if (toggleCheckOther) {
            return (
                <MaterialIcons onPress={() => checkOther()} name="check-box" size={Normalize(24)} color={AppStyle.success} />
            )
        }
        else {
            return (
                <MaterialIcons onPress={() => checkOther()} name="check-box-outline-blank" size={Normalize(24)} color="gray" />
            )
        }

    }

    function handleNext() {
        navigation.push('KTPVerification');
    }

    useEffect(() => {

        setMaxMember(4)

        return () => {
        }
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'white', width: '100%', height: '100%' }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.pop(1) }} style={styles.headerIcon}>
                        <AntDesign name="left" size={Normalize(24)} color="black" />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerText}>Member Details</Text>
                    </View>
                </View>
                <View style={styles.absoluteContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(14) }}>This Room For</Text>
                    <View style={styles.checkboxWrapper}>
                        <View style={styles.checkboxContainer}>
                            <CustomCheckboxMe />
                            <Text onPress={() => checkMe()} style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: NormalizeFont(14) }}>Me</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <CustomCheckboxOther />
                            <Text onPress={() => checkOther()} style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: NormalizeFont(14) }}>Other</Text>
                        </View>
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(14) }}>Person</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(12) }}>This room maximum is {maxMember} persons</Text>
                    <View style={{ flexDirection: 'row', marginTop: AppStyle.windowSize.height * 0.03355, marginBottom: AppStyle.windowSize.height * 0.03355 }}>
                        <View>
                            <TouchableOpacity style={[styles.icon, { marginRight: Normalize(30), marginLeft: Normalize(10) }]} >
                                <MaterialIcons name="person-add-alt" size={Normalize(36)} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => { decreaseMember() }} style={styles.plus} >
                                <AntDesign name="minus" size={Normalize(24)} color={AppStyle.fourt_main_color} />
                            </TouchableOpacity>
                            <View style={[styles.icon, { marginRight: Normalize(10), marginLeft: 0 }]}>
                                <Text style={{ fontSize: NormalizeFont(24) }}>
                                    {loopingInput.length}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => { increaseMember() }} style={styles.plus} >
                                <MaterialIcons name="add" size={Normalize(24)} color={AppStyle.fourt_main_color} />
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
                    <TouchableOpacity onPress={() => { handleNext() }} style={[styles.nextBtn, { backgroundColor: AppStyle.sub_main_color }]}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: NormalizeFont(14) }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({

    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: AppStyle.windowSize.height * 0.15,
    },
    headerText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: NormalizeFont(18),
    },
    headerIcon: {
        position: 'absolute',
        left: AppStyle.windowSize.width * 0.05,
    },
    absoluteContainer: {
        elevation: 5,
        paddingLeft: '5%',
        paddingRight: '5%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingTop: Normalize(15),
        borderRadius: Normalize(15),
        marginBottom: Normalize(10),
        paddingBottom: Normalize(15),
        width: AppStyle.windowSize.width * 0.9,
    },
    mappedContainer: {
        paddingLeft: '5%',
        paddingRight: '5%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: Normalize(25),
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.425,
    },
    checkboxWrapper: {
        marginTop: AppStyle.windowSize.height * 0.045,
        marginBottom: AppStyle.windowSize.height * 0.045,
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
        marginBottom: AppStyle.windowSize.height * 0.025,
    },
    phoneInput: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginBottom: AppStyle.windowSize.height * 0.025,
    },
    nameInputBox: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
        height: Normalize(40),
        alignSelf: 'flex-start',
        borderRadius: Normalize(7.5),
    },
    phoneInputBox: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
        height: Normalize(40),
        alignSelf: 'flex-start',
        borderRadius: Normalize(7.5),
    },
    genderInput: {
        width: '100%',
        flexDirection: 'column',
    },
    buttonGender: {
        width: '49%',
        borderWidth: 1,
        borderColor: 'gray',
        padding: Normalize(12.5),
        borderRadius: Normalize(10),
    },
    icon: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: Normalize(50),
        width: AppStyle.windowSize.width * 0.1,
        height: AppStyle.windowSize.height * 0.05,
    },
    plus: {
        borderWidth: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        marginRight: Normalize(10),
        borderRadius: Normalize(50),
        borderColor: AppStyle.fourt_main_color,
        width: AppStyle.windowSize.width * 0.1,
        height: AppStyle.windowSize.width * 0.1,
    },
    container_3: {
        justifyContent: 'center',
        marginTop: Normalize(40),
        marginBottom: Normalize(30),
        width: AppStyle.windowSize.width,
        paddingRight: AppStyle.windowSize.width * 0.05,
    },
    nextBtn: {
        borderWidth: 1,
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        paddingTop: Normalize(10),
        borderRadius: Normalize(50),
        paddingBottom: Normalize(10),
        borderColor: 'rgba(0, 0, 0, 0.15)',
        width: AppStyle.windowSize.width * 0.275,
    },
})
