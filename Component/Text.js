import React from 'react'
import { View, Text } from 'react-native'

export const TEXT = (props) => {
    return (
        <View>
            <Text
                numberOfLines={1}
                style={{
                    fontSize: props.size,
                    fontWeight: props.weight,
                    color: props.color,
                    lineHeight: props.lineHeight,
                    flexWrap: 'wrap'
                }}>{props.title}</Text>
        </View>
    );
}
