import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import { human } from 'react-native-typography';
import { format as timeAgo } from 'timeago.js';

import { detailsEndpoint } from '../../config/general.config';
import DynamicImage from '../../components/ui/DynamicImage';
import { COLORS } from '../../config/colors.config';

const Details = ({ route, navigation }) => {
  const { name } = route.params;
  const [details, setDetails] = useState({});

  useEffect(() => {
    fetch(`${detailsEndpoint}?fullName=${name}`)
      .then((res) => res.json())
      .then(setDetails);
  }, []);

  return details ? (
    <View style={styles.detailsContainer}>
      <ScrollView style={styles.content}>
        <View style={{ alignItems: 'center' }}>
          <DynamicImage size={150} icon={details?.icon} owner_id={details?.github?.owner_id} />
        </View>
        <View style={{ marginVertical: 24, alignItems: 'center' }}>
          <Text style={{ ...human.title1, fontWeight: '700', marginBottom: 8 }}>
            {details.name}
          </Text>
          <Text style={human.body}>{details.description}</Text>
        </View>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.metaButton}>
            <Text style={human.subheadWhite}>Website</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.metaButton}>
            <Text style={human.subheadWhite}>Website</Text>
          </TouchableOpacity>
        </View> */}

        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingVertical: 24,
            borderRadius: 4,
            marginBottom: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Feather name="clock" size={18} color="black" />
            <Text style={{ ...human.body, marginLeft: 4 }}>
              {timeAgo(details?.github?.pushed_at)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Feather name="star" size={18} color="black" />
            <Text style={{ ...human.body, marginLeft: 4 }}>
              {details?.github?.stargazers_count > 1000
                ? `${(details?.github?.stargazers_count / 1000).toFixed(1)}K`
                : details?.github?.stargazers_count}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Feather name="users" size={17} color="black" />
            <Text style={{ ...human.body, marginLeft: 4 }}>
              {details?.github?.contributor_count}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Feather name="git-commit" size={17} color="black" />
            <Text style={{ ...human.body, marginLeft: 4 }}>{details?.github?.commit_count}</Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingVertical: 24,
            borderRadius: 4,
            marginBottom: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={human.title2}>{details?.npm?.version}</Text>
            <Text>Version</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={human.title2}>{(details?.bundle?.size / 1000).toFixed(2)} KB</Text>
            <Text>Bundle Size</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={human.title2}>{(details?.bundle?.gzip / 1000).toFixed(2)} KB</Text>
            <Text>GZipped Size</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={human.title2}>{details?.bundle?.dependencyCount}</Text>
            <Text>Dependency</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: COLORS.background,
    paddingTop: Constants.statusBarHeight + 16,
  },
  content: { paddingHorizontal: 24, marginTop: 42 },
  metaButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
});

export default Details;
