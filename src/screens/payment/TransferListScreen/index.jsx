import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'

import { UserInfo } from '../../../components/View/UserInfo'
import { useTheme } from '@react-navigation/native'
import { MyText } from '../../../components/MyText'
import { useSelector } from 'react-redux'
import { getListTransactions } from '../PaymentScreen/store/actions/getListTransactions'

import { StyleSheet } from 'react-native'

export const TransferListScreen = ({ navigation }) => {
	const { colors } = useTheme()
	const styles = makeStyles(colors)
	const dispatch = useDispatch()

	const { transactions_list, user_info } = useSelector((state) => state.transactions)
	const { isLoading } = useSelector((state) => state.auth)

	useEffect(() => {
		dispatch(getListTransactions())
	}, [dispatch])

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => <UserInfo name={user_info?.name} balance={user_info?.balance} />
		})
	}, [navigation, user_info])

	return isLoading ? (
		<View style={styles.container}>
			<ActivityIndicator size="small" color={colors.WHITE} />
		</View>
	) : (
		<SafeAreaView style={styles.screen}>
			<View style={styles.container}>
				<FlatList
					keyExtractor={(item) => `${item.id}`}
					data={transactions_list}
					renderItem={({ item }) => {
						return (
							<View style={styles.textContainer}>
								<MyText color={colors.BLACK}>Username: {item.username}</MyText>
								<View>
									<MyText color={colors.BLACK}>Amount: {item.amount}</MyText>
									<MyText color={colors.BLACK}>Balance: {item.balance}</MyText>
								</View>
								<MyText color={colors.BLACK}>Date/Time {item.date}</MyText>
							</View>
						)
					}}
				/>
			</View>
		</SafeAreaView>
	)
}

const makeStyles = (colors) =>
	StyleSheet.create({
		screen: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: colors.WHITE
		},
		container: {
			flex: 1,
			width: '100%',
			maxWidth: 450,
			maxHeight: 1000,
			marginTop: 20
		},
		textContainer: {
			borderBottomWidth: 2,
			borderColor: colors.BLACK,
			color: colors.BLACK,
			padding: 10
		}
	})
