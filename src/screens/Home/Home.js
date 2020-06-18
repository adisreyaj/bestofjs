/*
 * File: Home.js
 * Project: bestofjs
 * File Created: Wednesday, 17th June 2020 10:01:52 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Thursday, 18th June 2020 10:56:46 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { baseEndpoint } from '../../config/general.config';
import { COLORS } from '../../config/colors.config';
import Searchbar from './Searchbar';
import HomeListItem from './HomeListItem';
import HomeHeader from './HomeHeader';
import { human } from 'react-native-typography';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [page, setPage] = useState(0);

  const goToNextPage = () => setPage((prev) => prev + 1);
  const goToPrevPage = () => setPage((prev) => prev - 1);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = (isPullToRefresh = false) => {
    isPullToRefresh && setRefreshing(true);
    fetch(baseEndpoint)
      .then((res) => res.json())
      .then((res) => res.projects)
      .then((res) => {
        setProjects(res);
        return res;
      })
      .then((res) => [...res].sort((a, b) => (a.stars > b.stars ? -1 : 1)))
      .then((res) => {
        setPopular(res);
        return res;
      })
      .then((res) => [...res].sort((a, b) => (a.trends.daily > b.trends.daily ? -1 : 1)))
      .then((res) => {
        setTrending(res);
        return res;
      })
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };
  return (
    <View style={{ backgroundColor: COLORS.background }}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="rgba(0, 0, 0, 0)" />
      <ScrollView>
        <HomeHeader />
        <FlatList
          ListHeaderComponent={
            <View
              style={{
                padding: 12,
                paddingHorizontal: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{ backgroundColor: COLORS.primary, width: 10, height: 28, marginRight: 8 }}
                ></View>
                <Text style={{ ...human.title1, fontWeight: '700' }}>Top Popular</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ ...human.body, marginRight: 8 }}>View More</Text>
                <Feather name="arrow-up-right" size={24} color="black" />
              </View>
            </View>
          }
          onRefresh={fetchProjects}
          refreshing={refreshing}
          data={[...popular].slice(0, 5)}
          keyExtractor={(item) => item.full_name}
          renderItem={({ item }) => <HomeListItem {...item} />}
        />
        <View style={{ height: 42 }} />
        <FlatList
          ListHeaderComponent={
            <View
              style={{
                padding: 12,
                paddingHorizontal: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{ backgroundColor: COLORS.primary, width: 10, height: 28, marginRight: 8 }}
                ></View>
                <Text style={{ ...human.title1, fontWeight: '700' }}>Top Trending</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ ...human.body, marginRight: 8 }}>View More</Text>
                <Feather name="arrow-up-right" size={24} color="black" />
              </View>
            </View>
          }
          onRefresh={fetchProjects}
          refreshing={refreshing}
          data={[...trending].slice(0, 5)}
          keyExtractor={(item) => item.full_name}
          renderItem={({ item }) => <HomeListItem {...item} />}
        />
      </ScrollView>
    </View>
  );
};

export default Home;
