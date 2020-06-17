/*
 * File: HomeListItem.js
 * Project: bestofjs
 * File Created: Wednesday, 17th June 2020 10:07:03 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Wednesday, 17th June 2020 11:16:05 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { human } from 'react-native-typography';

import { COLORS } from '../../config/colors.config';

const HomeListItem = ({ name, owner_id, icon = false, description }) => {
  return (
    <View style={styles.listContainer}>
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
          <Text style={([human.caption1], { width: '80%' })} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: { padding: 8 },
  listItem: { backgroundColor: '#fff', padding: 16, flexDirection: 'row' },
});

export default HomeListItem;
