import {Colors, height, width} from '../constants/Constants';
import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';

type StyledTitleProps = {
    fontWeight?: number,
    fontSize?: number,
    center?: boolean
    color?: string
}

export const StyledTitle = styled.Text<StyledTitleProps>`
  font-size: ${props => props.fontSize ? props.fontSize + 'px' : '18px'};
  font-weight: ${props => props.fontWeight || 400};
  text-align: ${props => props.center ? 'center' : 'left'};
  color: ${props => props.color ? props.color : `${Colors.Lite}`};
`;

type StyledTextProps = {
    fontSize?: number,
    color?: string,
    underline?: boolean,
    fontWeight?: number,
    center?: boolean
}
export const StyledText = styled.Text<StyledTextProps>`
  font-size: ${props => props.fontSize ? props.fontSize + 'px' : '16px'};
  color: ${props => props.color || '#FFF'};
  text-decoration-line: ${props => props.underline ? 'underline' : 'none'};
  font-weight: ${props => props.fontWeight || 400};
  text-align: ${props => props.center ? 'center' : 'left'};
`;

type StyledBorderBlockProps = {
    borderColor?: string
    direction?: boolean,
    alignItems?: string
}
export const StyledBorderBlock = styled.View<StyledBorderBlockProps>`
  margin: 10px 0;
  padding: 10px;
  background-color: ${Colors.Dark};
  border-radius: 10px;
  border-width: 2px;
  border-color: ${props => props.borderColor || `${Colors.Primary}`};
  flex-direction: ${props => props.direction ? 'row' : 'column'};
  align-items: ${props => props.alignItems ? props.alignItems : 'stretch'};
`;

export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
`;

type StyledHeaderPropsType = {
    marginBottom?: number
    padding?: number
}

export const StyledHeader = styled.View<StyledHeaderPropsType>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.marginBottom ? props.marginBottom + 'px' : '20px'};
`;

export const StyledMainHeader = styled.View`
  padding: 20px 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

type StyledContainerPropsType = {
    center?: boolean
}

export const StyledContainer = styled.View<StyledContainerPropsType>`
  padding: 10px 20px 70px;
  align-items: ${props => props.center ? 'center' : 'stretch'};
`;

export const StyledAuthFooter = styled.View`
  position: absolute;
  top: ${height - 80}px;
  align-self: center;
`;

export const StyledEmail = styled.View`
  width: ${width - 65}px;
  background-color: ${Colors.DarkPrimary};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  padding: 5px;
`;

export const StyledSecretTitle = styled.View`
  margin-top: 12px;
  padding: 15px;
  margin-bottom: 20px;
  min-height: 60px;
  border-width: 1px;
  border-color: ${Colors.White};
  border-radius: 4px;
  background: ${Colors.Primary}
`;

export const StyledInstruction = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 15px 30px;
`;

export const StyledCardNumber = styled.View`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

type StyledColorLinePropsType = {
    color: string
}

export const StyledColorLine = styled.View<StyledColorLinePropsType>`
  border-color: ${props => props.color};
  border-width: 1px;
  margin: 0 -10px;
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
        flexDirection: 'row',
        justifyContent: 'center',
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
        backgroundColor: Colors.Primary,
        borderRadius: 3,
        height: 60,
        width: 40,
        position: 'absolute',
        bottom: 0,
        right: 0,
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
    copyEmail: {
        marginTop: 10,
        backgroundColor: Colors.DimPrimary,
        borderRadius: 3,
        height: 60,
        width: 40,
        position: 'absolute',
        bottom: 0,
        right: 0,
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
