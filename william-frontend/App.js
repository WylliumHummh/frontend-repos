import React, { useState, useEffect } from "react";
import { Provider as PaperProvider, Checkbox } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, FlatList, Text, Button, View, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import About from "./components/About.js";
import ItemDetail from "./components/ItemDetail.js";
import { AntDesign } from '@expo/vector-icons'; 
import Moment from "moment";

const Root = createNativeStackNavigator();
const tdListInfo = require("./todolist.json").todo;


// Runs the Home Screen's text + Status Bar
function Home() {
  const [num, setNum] = useState(0);
  const [itemDone, setItemDone] = useState(false);
  /**
 * Renders a task given from the to-do list.
 * @param item The task we want to get the info of.
 * @returns Text of the task's name, due date, and boolean representing it being done or not.
 */
  const [tdList, setTdList] = useState([]);
  useEffect(() => {
    const toDoList = tdListInfo;
    setTdList(toDoList);
  }, [])

  function markItemDone(index){
    let todoCopy = tdList;
    todoCopy.done = !todoCopy.done;
    setTdList(todoCopy);
  }

  return ( 
    <SafeAreaView style={styles.container}>
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
      <SafeAreaView style={styles.container3}>
        <Text style= {{fontWeight: "bold", fontSize: 18, color: "cyan"}}>To-Do List</Text>
        <FlatList
          data={tdList}
          renderItem={({item}) => {
            return(
              <View style={styles.task} onPress= {setItemDone(true)} >
                <Text style={{fontWeight: "bold"}}>{item.name}</Text>
                <Text>{item.due}</Text>
                <TouchableOpacity onPress= {markItemDone(item)}>
                  <Text>{item.done? "Checked" : "Unchecked"} </Text>
                </TouchableOpacity>
              </View>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
          extraData={itemDone}
        />
      </SafeAreaView>
    </SafeAreaView>
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
  container3: {
    flex: 1,
    backgroundColor: "brown",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
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
  },
  task: {
    flex: 1,
    padding: 16,
    fontSize: 8,
    backgroundColor: "pink",
    marginVertical: 12,
    marginHorizontal: 12,
  }
});
