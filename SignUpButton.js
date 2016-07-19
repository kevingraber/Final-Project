import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

class SignUpButton extends Component {

    render() {

        return (
            <View style={styles.button}>
                <Text style={{color: 'white', fontWeight: 'bold', fontFamily: 'Roboto'}}>SIGN UP</Text>
            </View>
        )
    }

}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#4ed7c2",
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: windowWidth*.70,
        margin: 5
    }
});

export default SignUpButton;