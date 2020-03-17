import React, { Component } from 'react';
import { View, StatusBar, TextInput, Animated, StyleSheet } from 'react-native';

class FloatingLabelInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
        };
        this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
    }

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    componentDidUpdate() {
        Animated.timing(this._animatedIsFocused, {
            toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
            duration: 200,
        }).start();
    }

    render() {
        const { keyName, label, ...props } = this.props;
        const labelStyle = {
            position: 'absolute',
            zIndex: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [-1, 1],
            }),
            left: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 5],
            }),
            top: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 6],
            }),
            fontSize: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [15, 12],
            }),
            color: this.props.value !== '' && !this.state.isFocused ? "#00000054" :
                this._animatedIsFocused.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#aaa', '#1976d2'],
                }),
            backgroundColor: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ['#fff', '#fff'],
            }),
            padding: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 4],
            }),
        };
        const floatingInput = {
            width: 300,
            fontSize: 15,
            color: '#000',
            borderWidth: 1,
            borderColor: this.state.isFocused ? '#1976d2' : '#00000054',
            padding: 10,
            borderRadius: 3,
            marginBottom: 2
        };

        return (
            <View style={{ paddingTop: 18 }}>
                <Animated.Text style={labelStyle}>
                    {label}
                </Animated.Text>

                <TextInput
                    {...props}
                    onChangeText={(value) => props.onChangeText(keyName, value)}
                    style={floatingInput}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    blurOnSubmit
                />
            </View>
        );
    }
}

export default FloatingLabelInput;

const styles = StyleSheet.create({
    floatingInput: {
        // height: 26,
        width: 300,
        fontSize: 15,
        color: '#000',
        borderWidth: 1,
        borderColor: '#00000032',
        padding: 10,
        borderRadius: 3,
        marginBottom: 2
    },
});