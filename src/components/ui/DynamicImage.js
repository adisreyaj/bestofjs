import React from 'react';
import { View, Image } from 'react-native';
import { SvgUri } from 'react-native-svg';

const DynamicImage = ({ icon, owner_id, size = 70 }) => {
  let view = null;
  if (icon && icon.includes('.svg'))
    view = <SvgUri width={size} height={size} uri={`https://bestofjs.org/logos/${icon}`} />;
  if (icon && !icon.includes('.svg'))
    view = (
      <View style={{ borderRadius: 120 }}>
        <Image
          style={{ borderRadius: 4, padding: 8 }}
          source={{
            uri: `https://bestofjs.org/logos/${icon}`,
            width: size,
            height: size,
          }}
          resizeMode={'contain'}
        />
      </View>
    );
  if (!icon && owner_id)
    view = (
      <View style={{ borderRadius: 120 }}>
        <Image
          style={{ borderRadius: 4, padding: 8 }}
          source={{
            uri: `https://avatars.githubusercontent.com/u/${owner_id}?v=3&s=120`,
            width: size,
            height: size,
          }}
          resizeMode={'contain'}
        />
      </View>
    );
  return view;
};

export default DynamicImage;
