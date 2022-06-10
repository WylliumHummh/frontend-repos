import React, { useState, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, FlatList, Text, Button, View, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import About from "./components/About.js";
import ItemDetail from "./components/ItemDetail.js";
import { AntDesign } from '@expo/vector-icons'; 

const Root = createNativeStackNavigator();
const tdListInfo = require("./todolist.json").todo;

function getList() { 
  const [tdList, setTdList] = React.useState("");
  
  useEffect(() => {
    const toDoList = JSON.stringify(tdListInfo);
    setTdList(toDoList);
  }, [])
}

function renderItem() {

}

// Runs the Home Screen's text + Status Bar
function Home() {
  const [num, setNum] = useState(0);
  return ( 
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text>Num is {num}</Text>
        <View style={styles.numButtons}>
          <View style= {styles.button}>
            <Button title="Increase Num" mode={"contained"} onPress={() => setNum(num +1 )}>
              Increase num by 1.
            </Button>
          </View>
          <View style= {styles.button}>
            <Button title="Decrease Num" mode={"contained"} color="red" onPress={() => setNum(num -2 )}>
              Decrease num by 2.
            </Button>
          </View>
          <View style= {styles.button}>
            <Button title="Reset Num" mode={"contained"} color="grey" onPress={() => setNum(0)}>
              Resets num back to 0.
            </Button>
          </View>
        </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={getList()}
          {({item}) => renderArticle(item)}
          keyExtractor={(item, index) => index.toString()}
          extraData={selectedId}
        />
      </SafeAreaView>
    </View>
  )
}

// Houses the Navigator in which the app can go through.
function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Root.Navigator>
          <Root.Screen 
            name={"Home"} 
            component={Home}
            options={({ navigation }) => ({
              headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate("About")}>
                    <View style = {styles.container2} >
                     <Text style = {{letterSpacing: 2, fontSize: 18}}>About </Text>
                     <AntDesign name="pluscircle" size={24} color="black" />
                    </View>
                  </TouchableOpacity>
              )}
            )}/>
          <Root.Screen name={"About"} component={About}/>
          <Root.Screen name={"Item Detail"} component={ItemDetail}/>
        </Root.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tan",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  navButton: {
    flex: 1, 
    backgroundColor: "#fff",
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "center"
  },
  numButtons: {
    marginBottom: 10,
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  button: {
    marginLeft: 10,
    marginRight: 10
  }
});
