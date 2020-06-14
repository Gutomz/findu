import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as S from './styles';
import * as LoadingSelector from '../../redux/reducers/loading';
import * as UserSelector from '../../redux/reducers/user';
import * as UserActions from '../../redux/actions/user';
import Header from '../../components/Header/Header';
import DefaultButton from '../../components/button/DefaultButton';
import ProfileImage from '../../assets/images/profile-mock.png';
import Loading from '../../components/Loading/Loading';

export default function ProfileScreen({navigation, route}) {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => LoadingSelector.getLoading(state));
    const friend = useSelector(state => UserSelector.getFriend(state));

    useEffect(() => {
        getFriendById()
    }, []);

    const getFriendById = async () => {
        const friendId = route.params.friendId;
        console.log('friendId', friendId);
        try {
            await dispatch(UserActions.getUserById(friendId))
        } catch(err) {
            Alert.alert('Erro', err.message);
        }
    }

    return (
        <>
        {isLoading && <Loading />}
        <S.ProfileContainerScrollView>
            <Header
                color
                onPressListener={() => navigation.goBack()}
            />
            <S.UserProfileView>
            <S.ProfileImageView>
                <S.ProfileImage source={friend.profilePhoto ? {uri: friend.profilePhoto} : ProfileImage} />
            </S.ProfileImageView>
            <S.UserName>{friend.name}</S.UserName>
            </S.UserProfileView>
            <S.InputContainer>
                <S.InputLabel>Telefone</S.InputLabel>
                <S.ProfileInfoText> {friend.phone} </S.ProfileInfoText>
                <S.InputLabel> Grupos</S.InputLabel>
                <S.ProfileInfoText> - Amigos </S.ProfileInfoText>
            </S.InputContainer>
            <S.ButtonsContainer> 
                <DefaultButton 
                text="Adicionar a um grupo"
                onPressListener={() => {}}
                border="#FFF"
                fontColor="#FFF"
                background="transparent"
                />
                <DefaultButton 
                text="Remover contato" 
                onPressListener={() => {}}
                border="#FFF"
                fontColor="#FFF"
                background="transparent"
                />
            </S.ButtonsContainer>
        </S.ProfileContainerScrollView>
        </>
    );
}
