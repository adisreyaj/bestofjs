/*
 * File: Searchbar.js
 * Project: bestofjs
 * File Created: Thursday, 18th June 2020 9:12:20 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Thursday, 18th June 2020 9:21:31 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { human } from 'react-native-typography';
import { COLORS } from '../../config/colors.config';
const Searchbar = () => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 4,
        paddingLeft: 32,
      }}
    >
      <TextInput
        placeholder="Search your favorite project"
        returnKeyType="search"
        style={{ ...human.body, padding: 16 }}
      />
      <View
        style={{
          position: 'absolute',
          left: 12,
          top: 16,
          justifyContent: 'center',
        }}
      >
        <Feather name="search" size={24} color="black" />
      </View>
    </View>
  );
};

export default Searchbar;
