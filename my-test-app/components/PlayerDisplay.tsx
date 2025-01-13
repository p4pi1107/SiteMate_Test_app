import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { BalldontlieAPI } from "@balldontlie/sdk";
import PlayerInfoModal from './PlayerInfoModal';

type Params = {
  teamName: string;
}

const api = new BalldontlieAPI({ apiKey: "52076c8c-1427-4995-b7c4-42ed1675f5d9" });

export function PlayerPanel({ teamName }: Params) {
  const [players, setPlayers] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [teamId, setTeamId] = useState<number | null>(null);
  const [selectedPlayerInfo, setSelectedPlayerInfo] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (teamName !== '') {
      fetchTeamId();
    }
  }, [teamName]);

  useEffect(() => {
    if (teamId !== null) {
      fetchPlayers();
    }
  }, [teamId]);

  const fetchPlayers = async () => {
    try {
      const playerResponse = await api.nba.getPlayers({ team_ids: [teamId] });
      setPlayers(playerResponse.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeamId = async () => {
    try {
      setLoading(true);
      const teams = await api.nba.getTeams();
      const foundTeam = teams.data.find((team: any) => team.full_name === teamName);
      if (foundTeam) {
        setTeamId(foundTeam.id);
      } else {
        console.error('Team not found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlayerInfo = async (playerId: number) => {
    try {
        console.log('in')
      const playerInfo = await api.nba.getPlayer(playerId);
      setSelectedPlayerInfo(playerInfo);
      console.log(selectedPlayerInfo)
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching player info:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!players) {
    return (
      <View style={styles.title}>
        <Text>Choose a team to see the roster</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roster</Text>
      {players.map((player: any, index: number) => (
        <View key={index} style={styles.playerContainer}>
          <Text>{player.first_name} {player.last_name}</Text>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => fetchPlayerInfo(player.id)}
          >
            <Text style={styles.infoButtonText}>Info</Text>
          </TouchableOpacity>
        </View>
      ))}
      <PlayerInfoModal
        visible={modalVisible}
        playerInfo={selectedPlayerInfo}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    alignItems: 'center',
  },
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoButton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  infoButtonText: {
    color: 'white',
    fontSize: 14,
  },
});