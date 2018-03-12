import React from 'react'
import { connect } from 'react-redux'
import { switchText } from '../actions'
import { Greeting, PlatformText } from '@common/components'
import { Button, View } from 'react-native'

const component = ({ text, dispatch }) =>
    <View>
        <PlatformText/>
        <Greeting text={text}/>
        <Button onPress={() => dispatch(switchText(text))} title="Switch"/>
    </View>

const mapStateToProps = state => ({
    text: state.text
})

const container = connect(
  mapStateToProps
)(component)

export const Screen = container
export default Screen

