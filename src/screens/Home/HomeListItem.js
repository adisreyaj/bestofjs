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
import { View, Text, Image, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { human } from 'react-native-typography';
import { Feather } from '@expo/vector-icons';
import { format as timeAgo } from 'timeago.js';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '../../config/colors.config';

const HomeListItem = ({
  name,
  owner_id,
  icon = false,
  description,
  stars,
  pushed_at,
  contributor_count,
}) => {
  return (
    <View style={styles.listContainer}>
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={{
          position: 'absolute',
          left: 20,
          right: 0,
          top: 15,
          width: '95%',
          height: '100%',
        }}
      />
      <View style={styles.listItem}>
        {icon && icon.includes('.svg') && (
          <SvgUri width="70" height="70" uri={`https://bestofjs.org/logos/${icon}`} />
        )}
        {icon && !icon.includes('.svg') && (
          <View style={{ borderRadius: 120 }}>
            <Image
              style={{ borderRadius: 4, padding: 8 }}
              source={{
                uri: `https://bestofjs.org/logos/${icon}`,
                width: 70,
                height: 70,
              }}
              resizeMode={'contain'}
            />
          </View>
        )}
        {!icon && owner_id && (
          <View style={{ borderRadius: 120 }}>
            <Image
              style={{ borderRadius: 4, padding: 8 }}
              source={{
                uri: `https://avatars.githubusercontent.com/u/${owner_id}?v=3&s=120`,
                width: 70,
                height: 70,
              }}
              resizeMode={'contain'}
            />
          </View>
        )}
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
    </View>
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
});

export default HomeListItem;
