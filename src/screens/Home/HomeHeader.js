/*
 * File: HomeHeader.js
 * Project: bestofjs
 * File Created: Thursday, 18th June 2020 10:03:57 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Thursday, 18th June 2020 10:58:48 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { COLORS } from '../../config/colors.config';
import Searchbar from './Searchbar';
import { human } from 'react-native-typography';

const HomeHeader = () => {
  return (
    <View style={{ paddingBottom: 20 }}>
      <View
        style={{
          paddingTop: Constants.statusBarHeight + 16,
          backgroundColor: COLORS.background,
          height: 100,
          width: '100%',
        }}
      >
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: 18,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Feather name="menu" size={32} color={COLORS.primary} />
            {/* <Text style={{ ...human.bodyWhite }}>Menu</Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginLeft: 12,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {/* <Feather name="menu" size={32} color="#fff" /> */}
            <Feather name="search" size={28} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 32, marginBottom: 24, paddingHorizontal: 24 }}>
          {/* <Searchbar /> */}
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
