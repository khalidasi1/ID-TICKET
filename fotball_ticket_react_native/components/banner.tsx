import { Link } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";

export default function Banner(){
    return (
        <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.headerContainer}
                >
                  <View style={styles.headerItem}>
                    <Link href={"/(tabs)/sell"}>
                      <Image style={styles.headerImage} source={require("@/assets/images/header/header1.png")} />
                    </Link>
                  </View>
                  <View style={styles.headerItem}>
                    <Link href={"/(tabs)/sell"}>
                      <Image style={styles.headerImage} source={require("@/assets/images/header/header2.png")} />
                    </Link>
                  </View>
                </ScrollView>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row-reverse',
        paddingVertical: 20,
      },
      headerItem: {
        width: 330,
        height: 129,
        paddingLeft: 10
      },
      headerImage: {
        borderRadius: 10
      }
})