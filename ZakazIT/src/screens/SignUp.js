//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, Alert } from "react-native";
import COLORS from "../../assets/constants/colors";
import Header from "../components/Header";
import icons from "../../assets/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../components/FormInput";

import { db, auth } from "../../config";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

// create a component
const SignUp = () => {
  const { dbUser } = useAuthContext();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [lng, setLng] = useState("0");
  const [lat, setLat] = useState("0");

  const navigation = useNavigation();

  const { setDbUser, setAuthUser } = useAuthContext();

  const onSave = async () => {
    {
        password === password2 ? await SignUp() : alert("Password Does not Match")
    }

  };

  const SignUp = async () => {
    auth.createUserWithEmailAndPassword(email, password).then(userCredentials => {
        const user = userCredentials.user;
    }).catch(error => alert(error.message)).then(() =>{
        auth.signInWithEmailAndPassword(email, password).then(async userCredentials => {
            const user = userCredentials.user;
            setAuthUser(user)
            await createUser(user.uid)
        }).catch(error => alert(error.message))
    })
  };

  const onSignIn = async () => {
    navigation.navigate("SignIn");
  };

  const createUser = async (sub) => {
    db.collection("User")
      .add({
        name: name,
        address: address,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        sub: sub
      })
      .then((docRef) => {
        setDbUser(docRef);
      })
      .catch(error => alert(error.message))
  };

  function RenderHeader() {
    return (
      <Header
        title="SIGN UP"
        containerStyle={{
          height: 50,
          marginHorizontal: 20,
          marginTop: 10
        }}
        titleStyle={{}}
        leftComponent={<View style={{ width: 40 }} />}
        rightComponent={<View style={{ width: 40 }} />}
      />
    );
  }

  function RenderForm() {
    return (
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <FormInput
          label="Name"
          placeholder="Your name"
          value={name}
          inputContainerStyle={{
            borderColor: COLORS.grey
          }}
          onChange={(value) => {
            setName(value);
          }}
        />
        <View style={{ marginTop: 15 }}>
          <FormInput
            label="Email"
            value={email}
            placeholder="email@example.com"
            inputContainerStyle={{
              borderColor: COLORS.grey
            }}
            onChange={(value) => {
              setEmail(value);
            }}
          />
        </View>
        <View style={{ marginTop: 15 }}>
          <FormInput
            label="Address"
            value={address}
            placeholder="Enter Adress"
            inputContainerStyle={{
              borderColor: COLORS.grey
            }}
            onChange={(value) => {
              setAddress(value);
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <FormInput
            label="Password"
            value={password}
            placeholder="Choose Password"
            containerStyle={{
              flex: 1
            }}
            inputContainerStyle={{
              borderColor: COLORS.grey
            }}
            onChange={(value) => {
              setPassword(value);
            }}
          />
          <FormInput
            label="Confirm Password"
            value={password2}
            placeholder="Re enter password"
            containerStyle={{
              flex: 1,
              marginLeft: 10
            }}
            inputContainerStyle={{
              borderColor: COLORS.grey
            }}
            onChange={(value) => {
              setPassword2(value);
            }}
          />
        </View>

        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <FormInput
            label="Latitude"
            keyboardType="number-pad"
            value={lat}
            placeholder="Lat"
            containerStyle={{
              flex: 1
            }}
            inputContainerStyle={{
              borderColor: COLORS.grey
            }}
            onChange={(value) => {
              setLat(value);
            }}
          />
          <FormInput
            label="Longitude"
            value={lng}
            placeholder="Lng"
            keyboardType="number-pad"
            containerStyle={{
              flex: 1,
              marginLeft: 10
            }}
            inputContainerStyle={{
              borderColor: COLORS.grey
            }}
            onChange={(value) => {
              setLng(value);
            }}
          />
        </View>
      </View>
    );
  }

  function RenderFooter() {
    return (
      <Pressable onPress={onSave} style={styles.Footer}>
        <Text style={{ fontSize: 24, color: COLORS.light, fontWeight: "800" }}>
          Sign Up
        </Text>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {RenderHeader()}
      {RenderForm()}
      {RenderFooter()}
      <View
        style={{ marginHorizontal: 20, flexDirection: "row", marginTop: 25 }}
      >
        <Text style={{ fontSize: 16 }}>Already on ЗаказIT? </Text>
        <Pressable onPress={onSignIn}>
          <Text style={{ fontSize: 16, color: COLORS.primary }}>
            Sign In here
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  Footer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
    alignItems: "center",
    bottom: 50,
    right: 30,
    left: 30,
    height: 80,
    borderRadius: 20,
    backgroundColor: COLORS.primary
  }
});

//make this component available to the app
export default SignUp;
