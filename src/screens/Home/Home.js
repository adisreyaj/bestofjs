/*
 * File: Home.js
 * Project: bestofjs
 * File Created: Wednesday, 17th June 2020 10:01:52 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Wednesday, 17th June 2020 11:01:47 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { baseEndpoint } from '../../config/general.config';
import HomeListItem from './HomeListItem';
import { COLORS } from '../../config/colors.config';

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(baseEndpoint)
      .then((res) => res.json())
      .then((res) => res.projects)
      .then((res) => res.sort((a, b) => (a.stars > b.stars ? -1 : 1)))
      .then(setProjects);
  }, []);

  console.log(projects[51]);

  return (
    <View style={{ backgroundColor: COLORS.background }}>
      <View style={{ marginTop: 64 }}>
        <FlatList
          data={projects.slice(0, 100)}
          keyExtractor={(item) => item.full_name}
          renderItem={({ item }) => <HomeListItem {...item} />}
        />
      </View>
    </View>
  );
};

export default Home;
