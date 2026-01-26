
import { StyleSheet, TextStyle } from 'react-native';

export interface TypographyStyle {
  [key: string]: TextStyle;
}


export const Typography: TypographyStyle = StyleSheet.create({
  title1Semibold: {
    fontSize: 22, 
    fontWeight: '600', 
    fontFamily: 'Roboto',
    color: '#000',
  },
  title1ExtraBold: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'Roboto',
    color: '#000',
  },
  title2Regular: {
    fontSize: 18,
    fontWeight: '400', 
    fontFamily: 'Roboto',
    color: '#000',
  },
  title2Semibold: {
    fontSize: 18,
    fontWeight: '600', 
    fontFamily: 'Roboto',
    color: '#000',
  },
  title2ExtraBold: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'Roboto',
    color: '#000',
  },
  title3Regular: {
    fontSize: 16,
    fontWeight: '400', 
    fontFamily: 'Roboto',
    color: '#000',
  },
  title3Medium: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto',
    color: '#000',
  },
  title3Semibold: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Roboto',
    color: '#000',
  },
  headlineRegular: {
    fontSize: 14,
    fontWeight: '400', 
    fontFamily: 'Roboto',
    color: '#000',
  },
  headlineMedium: {
    fontSize: 14,
    fontWeight: '500', 
    fontFamily: 'Roboto',
    color: '#000',
  },
  textRegular: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: '#000',
  },
  textMedium: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto',
    color: '#000',
  },
  captionRegular: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: '#000',
  },
  captionSemibold: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Roboto',
    color: '#000',
  },
  caption2Regular: {
    fontSize: 10,
    fontWeight: '400', 
    fontFamily: 'Roboto',
    color: '#000',
  },
  caption2Bold: {
    fontSize: 10,
    fontWeight: 'bold', 
    fontFamily: 'Roboto',
    color: '#000',
  },
});

export type TypographyStyleName = keyof typeof Typography;
export const TypographyStyleNames: string[] = Object.keys(Typography) as string[];
