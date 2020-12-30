import React from 'react';
import PickRole from '../screens/CreateUserScreen/pick_role';
import FillName from '../screens/CreateUserScreen/fill_name';
import Agreement from '../screens/CreateUserScreen/agreement';
import { createStackNavigator } from '@react-navigation/stack';
import OwnerRegist from '../screens/CreateUserScreen/owner_regist';
import OwnerPaymentMethod from '../screens/CreateUserScreen/owner_payment_method';

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the RegistrationStack
export default function CreateUserStack() {
    return (
        <NestedStack.Navigator>
            <NestedStack.Screen name="FillName" component={FillName} options={{ headerShown: false }} />
            <NestedStack.Screen name="PickRole" component={PickRole} options={{ headerShown: false }} />
            <NestedStack.Screen name="Agreement" component={Agreement} options={{ headerTransparent: true, title: '', headerTintColor: 'white' }} />
            <NestedStack.Screen name="OwnerRegist" component={OwnerRegist} options={{ headerTransparent: true, title: '', headerTintColor: 'white' }} />
            <NestedStack.Screen name="OwnerPaymentMethod" component={OwnerPaymentMethod} options={{ headerTransparent: true, title: '', headerTintColor: 'white' }} />
        </NestedStack.Navigator>
    );
}