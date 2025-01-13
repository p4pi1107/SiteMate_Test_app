import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface PlayerInfoModalProps {
  visible: boolean;
  playerInfo: any;
  onClose: () => void;
}

const PlayerInfoModal: React.FC<PlayerInfoModalProps> = ({ visible, playerInfo, onClose }) => {
  if (!playerInfo) return null;
  console.log('player info', playerInfo.data);
  let playerInfoDisplay = playerInfo.data;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Player Information</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Name:</Text>
            <Text style={styles.infoValue}>{playerInfoDisplay.first_name} {playerInfoDisplay.last_name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Position:</Text>
            <Text style={styles.infoValue}>{playerInfoDisplay.position}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Team:</Text>
            <Text style={styles.infoValue}>{playerInfoDisplay.team?.full_name || 'N/A'}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Height:</Text>
            <Text style={styles.infoValue}>{playerInfoDisplay.height || 'N/A'}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Jersey:</Text>
            <Text style={styles.infoValue}>{playerInfoDisplay.jersey_number || 'N/A'}</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '70%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PlayerInfoModal; 