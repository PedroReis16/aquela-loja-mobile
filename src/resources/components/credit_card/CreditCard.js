import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {styles} from './CreditCardStyle';

export function CreditCard({ card }) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardType}>{card.type}</Text>
      </View>
      <Text style={styles.cardNumber}>
        **** **** **** {card.cardNumber.slice(-4)}
      </Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardHolder}>{card.holderName}</Text>
        <Text style={styles.cardExpiry}>{card.expiryDate}</Text>
      </View>
    </View>
  );
}
