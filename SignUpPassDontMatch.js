import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

class SignUpPassDontMatch extends Component {

    render() {

        return (
            <View style={styles.badbutton}>
                <Text style={{color: 'white', fontWeight: 'bold', fontFamily: 'Roboto'}}>PASSWORDS DON'T MATCH</Text>
            </View>
        )
    }

}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    badbutton: {
        backgroundColor: "#e76248",
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: windowWidth*.70,
        margin: 5
    }
});

export default SignUpPassDontMatch;