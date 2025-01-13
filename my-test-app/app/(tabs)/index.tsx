import { Image, StyleSheet, Platform, View, Button, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Picker } from '@react-native-picker/picker';
import nba from 'nba';
import { PlayerPanel } from '@/components/PlayerDisplay';
import { useState } from 'react';


const teams = [
  "Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls",
  "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors",
  "Houston Rockets", "Indiana Pacers", "LA Clippers", "Los Angeles Lakers", "Memphis Grizzlies",
  "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks",
  "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns", "Portland Trail Blazers",
  "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards"
];

export default function HomeScreen() {
  
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [teamName, setTeamName] = useState('');

  const handle_search = () => {
    setTeamName(selectedTeam);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.headerImageContainer}>
          <Image
            source={require('@/assets/images/nba-logo.png')}
            style={styles.bannerImage}
            resizeMode="contain"
          />
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to the NBA Stats App!</ThemedText>
        <HelloWave />
      </ThemedView>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedTeam}
          onValueChange={(itemValue) => setSelectedTeam(itemValue)}
          style={styles.picker}
          >
          {teams.map((team, index) => (
            <Picker.Item key={index} label={team} value={team} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.roundedButton} onPress={handle_search}>
                <ThemedText style={styles.buttonText}>Search Historic Roster</ThemedText>
        </TouchableOpacity>
      </View>
      <PlayerPanel teamName={teamName} />
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerImageContainer: {
    backgroundColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
  bannerImage: {
    width: '80%',
    height: '80%',
  },
  pickerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  picker: {
    flex: 1,
    width: '100%',
    padding: 12,
    marginBottom: 16, 
  },
  roundedButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
},
});
