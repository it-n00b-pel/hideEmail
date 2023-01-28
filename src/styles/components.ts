import {Colors} from '../constants/Constants';
import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';

type StyledTitleProps = {
    fontWeight?: number,
    fontSize?: number,
}

export const StyledTitle = styled.Text<StyledTitleProps>`
  font-size: ${props => props.fontSize ? props.fontSize + 'px' : '18px'};
  font-weight: ${props => props.fontWeight || 400};
  color: ${Colors.Lite};
  text-shadow: 2px 2px 5px ${Colors.ShadowWhite};
`;

type StyledBorderBlockProps = {
    borderColor?: string
}
type StyledTextProps = {
    fontSize?: number,
    color?: string,
    underline?: boolean,
    fontWeight?: number,
}
export const StyledText = styled.Text<StyledTextProps>`
  font-size: ${props => props.fontSize ? props.fontSize + 'px' : '16px'};
  color: ${props => props.color || '#FFF'};
  text-decoration-line: ${props => props.underline ? 'underline' : 'none'};
  font-weight: ${props => props.fontWeight || 400};
`;

export const StyledBorderBlock = styled.View<StyledBorderBlockProps>`
  margin: 10px 0;
  padding: 10px;
  background-color: ${Colors.Dark};
  border-radius: 10px;
  border-width: 2px;
  border-color: ${props => props.borderColor || `${Colors.Primary}`};
  flex-direction: row;
  align-items: center;
`;

export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
`;

export const StyledHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const StyledContainer = styled.View`
  padding: 10px 20px 70px;
`;

export const generalStyles = StyleSheet.create({
    borderBlock: {
        shadowColor: Colors.White,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.7,
        shadowRadius: 5,
        elevation: 5,
    },
    modalView: {
        marginHorizontal: 10,
        backgroundColor: Colors.Dark,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        shadowColor: Colors.White,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
    },
    addButton: {
        marginVertical: 10,
        width: 120,
        padding: 8,
        backgroundColor: Colors.Primary,
        shadowColor: Colors.White,
        borderWidth: 2,
        borderColor: Colors.LightPrimary,
        borderRadius: 5,
        alignItems: 'center',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 6,
    },
    refreshEmail: {
        marginTop: 25,
        backgroundColor: Colors.Primary,
        borderRadius: 3,
        height: 65,
        width: 40,
        position: 'absolute',
        right: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.White,
        borderWidth: 1,
        borderColor: Colors.LightPrimary,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    },

});
