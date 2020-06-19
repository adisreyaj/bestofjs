/*
 * File: HomeListItem.js
 * Project: bestofjs
 * File Created: Wednesday, 17th June 2020 10:07:03 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Thursday, 18th June 2020 11:12:50 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { human } from 'react-native-typography';
import { Feather } from '@expo/vector-icons';
import { format as timeAgo } from 'timeago.js';
import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../config/screens.config';
import DynamicImage from '../../components/ui/DynamicImage';

const HomeListItem = ({
  name,
  full_name,
  owner_id,
  icon = false,
  description,
  stars,
  pushed_at,
  contributor_count,
}) => {
  const navigation = useNavigation();

  const navigateTo = (name) => {
    navigation.navigate(SCREENS.details, {
      name,
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigateTo(full_name)}
      style={styles.listContainer}
    >
      <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={styles.boxShadow} />
      <View style={styles.listItem}>
        <DynamicImage icon={icon} owner_id={owner_id} />
        <View style={{ marginLeft: 16, overflow: 'hidden', flexDirection: 'column' }}>
          <Text style={human.headline}>{name}</Text>
          <Text style={([human.caption1], { width: '80%', marginTop: 6 })} numberOfLines={2}>
            {description}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 12,
              }}
            >
              <Feather name="clock" size={14} color="black" />
              <Text style={{ ...human.footnote, marginLeft: 4 }}>{timeAgo(pushed_at)}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Feather name="users" size={13} color="black" />
              <Text style={{ ...human.footnote, marginLeft: 4 }}>{contributor_count}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            right: 16,
            top: 12,
          }}
        >
          <Feather name="star" size={14} color="black" />
          <Text style={{ ...human.footnote, marginLeft: 4 }}>
            {stars > 1000 ? `${(stars / 1000).toFixed(1)}K` : stars}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listContainer: { paddingVertical: 8, paddingHorizontal: 8 },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  boxShadow: {
    position: 'absolute',
    left: 20,
    right: 0,
    top: 15,
    width: '95%',
    height: '100%',
  },
});

export default HomeListItem;
