import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header, List } from "../../components/molecules";
import { DummyDoctor1 } from "../../assets";
import { colors, fonts } from "../../utils";
import { useEffect,useState } from "react";
import {
  getDatabase,
  ref,
  child,
  get,
  orderByChild,
  query,
  limitToLast,
  equalTo,
} from "firebase/database";

export default function ChooseDoctor({ navigation, route }) {
  const [listDoctors, setListDoctors] = useState([]);
  const itemCategory = route.params;
  useEffect(() => {
    callDoctorByCategory(itemCategory.category);
  }, []);

  const parseArray = (listObject) => {
    const data = [];
    Object.keys(listObject).map((key) => {
      data.push({
        id: key,
        data: listObject[key],
      });
    });
    return data;
  };

  const callDoctorByCategory = (category) => {
    const dbRef = getDatabase();
    get(
      query(ref(dbRef, "doctors"), orderByChild("category"), equalTo(category))
    )
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          const data = parseArray(snapshot.val());
          console.log("data after parse category", data);
          setListDoctors(data);
          // console.log("doctors category: ", doctors);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View style={styles.page}>
      <Header
        title={`Choose ${itemCategory.category}`}
        type="dark"
        onPress={() => navigation.goBack()}
      />
      {listDoctors.map((doctor) => {
        return (
          <List
            type="next"
            profile={{uri: doctor.data.photo}}
            name={doctor.data.fullName}
            desc={doctor.data.gender}
            onPress={() => navigation.navigate("DoctorProfile",doctor)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
  },
});
