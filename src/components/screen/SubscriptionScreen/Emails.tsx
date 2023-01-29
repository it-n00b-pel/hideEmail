import React from 'react';
import {View} from 'react-native';
import {EmailType} from '../../../api/mailHideApi';
import AddNewEmail from './modal/AddNewEmail';
import MoreEmailData from './modal/MoreEmailData';
import {generalStyles, StyledBorderBlock, StyledEmail, StyledText, StyledTitle} from '../../../styles/components';

type EmailsPropsType = {
    emails: EmailType[],
    canAddEmail: boolean,
}

const Emails: React.FC<EmailsPropsType> = ({emails, canAddEmail}) => {

    const emailList = emails.map(email => {
        const date = new Date(email.ended_at);
        const endedDate = date.getDate() + '-' + date.getMonth() + 1 + '-' + date.getFullYear();
        return <MoreEmailData email={email} key={email.id} view={
            <StyledEmail key={email.id}>
                <StyledText>{email.address}</StyledText>
                <StyledText>{endedDate}</StyledText>
            </StyledEmail>}/>;
    });

    return (
        <View>
            <StyledTitle fontSize={32}>Emails</StyledTitle>
            <StyledBorderBlock style={generalStyles.borderBlock}>
                {emailList}
                {canAddEmail && <AddNewEmail/>}
            </StyledBorderBlock>
        </View>
    );
};

export default Emails;