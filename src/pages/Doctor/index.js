import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HomeProfile from "../../components/molecules/HomeProfile";
import { getDatabase, ref, child, get, orderByChild, query, limitToLast } from "firebase/database";

import {
  DoctorCategory,
  NewsItem,
  RatedDoctors,
} from "../../components/molecules";
import { colors, fonts, getData } from "../../utils";
import { ScrollView } from "react-native-gesture-handler";
import { Gap } from "../../components/atoms";


export default function Doctor({ navigation }) {
  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    getData("user");
    getNews();
    getCategoryDoctor();
    getTopRatedDoctor();
  },[]);
  

  const getNews = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "news/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const filteredData = snapshot.val().filter(el=> el !== null);
          setNews(filteredData);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const getCategoryDoctor = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "category_doctor/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const filteredData = snapshot.val().filter(el=> el !== null);
          console.log(filteredData);
          setCategoryDoctor(filteredData);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      }); 
  }

  const parseArray = (listObject) =>{
    const data = [];
    Object.keys(listObject).map(key => {
      data.push({
        id: key,
        data: listObject[key],
      })
    })
    return data;
  }
  const getTopRatedDoctor = () => {
    const dbRef = getDatabase();
    get(query(ref(dbRef, "doctors"),orderByChild('rate'),limitToLast(2)))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          const data = parseArray(snapshot.val());
          console.log("data after parse", data);
          setDoctors(data);
          console.log("doctors: ",doctors);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      }); 
  }


  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate("UserProfile")} />
            <Text style={styles.welcome}>
              Who would you like to consult with today?
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {categoryDoctor.map((item) => {
                  return (
                    <DoctorCategory
                      key={item.id}
                      category={item.category}
                      onPress={() => navigation.navigate("ChooseDoctor",item)}
                    />
                  );
                })}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {doctors.map(doctor=>{
              return(
                <RatedDoctors
                key={doctor.id}
                name={doctor.data.fullName}
                desc={doctor.data.profession}
                avatar={{uri: doctor.data.photo}}
                onPress={() => navigation.navigate("DoctorProfile",doctor)}
              />
              )
            })}
            
            {/* <RatedDoctors
              name="Sunny Frank"
              desc="Dentist"
              avatar={DummyDoctor2}
              onPress={() => navigation.navigate("DoctorProfile")}
            />
            <RatedDoctors
              name="Poe Poe"
              desc="Podiatrist"
              avatar={DummyDoctor3}
              onPress={() => navigation.navigate("DoctorProfile")}
            /> */}
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {news.map((item) => {
            return (
              <NewsItem
                key={item.id}
                date={item.date}
                image={item.image}
                title={item.title}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  category: {
    flexDirection: "row",
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
