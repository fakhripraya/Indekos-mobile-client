import React from 'react'
import { AppStyle } from '../../config/app.config';
import { Normalize } from '../../functions/normalize';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native'
import { SecondBackground } from '../../components/Backgrounds/create_user_background'

export default function Agreement() {
    return (
        <SecondBackground >
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <View style={{
                        height: '100%',
                        width: '90%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: 'black', fontSize: Normalize(14) }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia libero nemo perspiciatis nam hic soluta aut labore, at porro autem deleniti repellendus eveniet cumque placeat provident rerum maiores ipsa! Molestiae.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. At recusandae sed animi hic quidem suscipit pariatur quisquam perspiciatis laborum doloremque voluptates non, velit quis corporis molestias tempora illum tenetur ipsum.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda cupiditate illo odio laboriosam nisi id repellendus maxime sequi veritatis magni, veniam culpa. Aut veniam nobis assumenda eveniet? Nostrum, reiciendis dolorum!
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt placeat praesentium obcaecati laborum aliquid itaque. Tempore, iusto molestias asperiores quia minus quo accusamus sed amet eius. Placeat blanditiis deleniti nobis!
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae dolor repellat nam numquam nihil ex ratione fugit nisi, ab neque quos vero provident libero veritatis iure cum consequuntur? Doloribus, dolores?
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius ullam nam expedita illo illum molestias corporis quisquam suscipit, facilis fugiat pariatur et neque laudantium adipisci vero numquam? Explicabo, ea eaque.
                        </Text>
                    </View>
                </ScrollView>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.agreeButton}>
                        <View >
                            <Text style={{ color: 'white', fontSize: Normalize(14) }}>
                                Agree
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SecondBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        position: 'absolute',
        top: AppStyle.screenSize.height * 0.1,
        width: AppStyle.screenSize.width * 0.9,
        height: AppStyle.screenSize.height * 0.9,
    },
    scroll: {
        elevation: 5,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: Normalize(15),
        height: AppStyle.screenSize.height * 0.9 * 0.8,
    },
    buttonWrapper: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        height: AppStyle.screenSize.height * 0.9 * 0.2,
    },
    agreeButton: {
        width: '45%',
        height: '40%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Normalize(30),
        backgroundColor: AppStyle.sub_main_color,
    },
})
