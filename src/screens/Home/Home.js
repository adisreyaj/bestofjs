/*
 * File: Home.js
 * Project: bestofjs
 * File Created: Wednesday, 17th June 2020 10:01:52 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 19th June 2020 8:52:44 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StatusBar, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
// import Animated from 'react-native-reanimated';

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

  const scrollY = new Animated.Value(0);
  // const headerOpacity = scrollY.interpolate({
  //   inputRange: [0, 30],
  //   outputRange: [1, 0],
  //   extrapolate: 'clamp',
  // });

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
      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
      >
        {/* <Animated.View
          style={{
            opacity: headerOpacity,
          }}
        >
          <HomeHeader />
        </Animated.View> */}
        <HomeHeader scrollY={scrollY} />
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
                  style={{
                    backgroundColor: COLORS.secondary,
                    width: 10,
                    height: 28,
                    marginRight: 8,
                  }}
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
                  style={{
                    backgroundColor: COLORS.secondary,
                    width: 10,
                    height: 28,
                    marginRight: 8,
                  }}
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
      </Animated.ScrollView>
    </View>
  );
};

export default Home;
