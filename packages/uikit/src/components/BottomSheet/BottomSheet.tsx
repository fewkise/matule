
import React from 'react';
import ActionSheet, { SheetProps } from 'react-native-actions-sheet';
import { View, Text, ScrollView } from 'react-native';

interface TextSheetPayload {
    title?: string;
    message: string;
}

const BottomSheet = (props: SheetProps<"text-sheet">) => {
    const { title, message } = props.payload || {};

    return (
        <ActionSheet id={props.sheetId} gestureEnabled={true}>
            <View style={{ padding: 20, maxHeight: 400 }}>
                {title && <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{title}</Text>}
                <ScrollView>
                    <Text>{message}</Text>
                </ScrollView>
            </View>
        </ActionSheet>
    );
};

export default BottomSheet;
