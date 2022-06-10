import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, DataTable, Text } from "react-native-paper";
import * as Clipboard from "expo-clipboard";

const AppInfo = require("../app.json").expo;

export default function About(){
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(JSON.stringify(AppInfo));
  };
  
  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };
  return(
    <View>
      <Text style = {{alignSelf: "center", fontSize: 18}}>About this app for the front-end tutorial!</Text>
      <DataTable>
        <DataTable.Header>
            <DataTable.Title>Item</DataTable.Title>
            <DataTable.Title>Value</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
            <DataTable.Cell>Name</DataTable.Cell>
            <DataTable.Cell>{AppInfo.name}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
            <DataTable.Cell>Version</DataTable.Cell>
            <DataTable.Cell>{AppInfo.version}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
            <DataTable.Cell>Orientation</DataTable.Cell>
            <DataTable.Cell>{AppInfo.orientation}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
            <DataTable.Cell>Android</DataTable.Cell>
            <DataTable.Cell>{JSON.stringify(AppInfo.android)}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      <View>
        <Button onPress={copyToClipboard}> Copy to Clipboard </Button>
        <Button onPress={fetchCopiedText}> View Copied Text</Button>
        <Text>{copiedText}</Text>
      </View>      
    </View>
  );
}