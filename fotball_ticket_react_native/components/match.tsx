import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

type MatchProps = {
  team1Name?: string;
  team1Logo?: ImageSourcePropType;
  team2Name?: string;
  team2Logo?: ImageSourcePropType;
  time?: string;
  date?: string;
  venue?: string;
};

export default function Match({
  team1Name = "النصر",
  team1Logo = require("@/assets/images/alnasser.png"),
  team2Name = "الهلال",
  team2Logo = require("@/assets/images/alhilal.png"),
  time = "17:30",
  date = "26 Mar 2025",
  venue = "ملعب الانماء"
}: MatchProps) {
  return (
    <View style={styles.matchContainer}>
      <View style={styles.team}>
        <Image
          style={styles.teamLogo}
          source={team1Logo}
        />
        <Text style={styles.teamName}> {team1Name} </Text>
      </View>
      <View style={styles.matchDetails}>
        <Text style={styles.matchTime}>{time}</Text>
        <Text style={styles.matchDate}>{date}</Text>
        <Text style={styles.matchVs}>VS</Text>
        <Text style={styles.matchPlace}> {venue} </Text>
      </View>
      <View style={styles.team}>
        <Image
          style={styles.teamLogo}
          source={team2Logo}
        />
        <Text style={styles.teamName}> {team2Name} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  matchContainer: {
    backgroundColor: "#1C1C1E", // Dark card background
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 18,
    marginHorizontal: 2,
    // Shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  team: {
    alignItems: "center",
    width: '30%',
  },
  teamLogo: {
    width: 60, // Slightly larger for impact
    height: 60,
    resizeMode: 'contain',
  },
  teamName: {
    paddingTop: 8,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFFFFF', // White text
  },
  matchDetails: {
    alignItems: "center",
    gap: 6,
    width: '40%',
  },
  matchTime: {
    color: "#FF9F0A", // Orange for time
    fontSize: 16,
    fontWeight: "600",
  },
  matchDate: {
    color: "#8E8E93", // Gray
    fontSize: 12,
  },
  matchVs: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF", // White
    fontStyle: 'italic',
  },
  matchPlace: {
    color: "#8E8E93",
    fontSize: 12,
    fontWeight: "500",
  },
});
