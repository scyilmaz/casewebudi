import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { API_ROUTES } from "../../api/apiroutes";
import { useSelector } from "react-redux";
import axios from "axios";

const CategorieDetail = ({ route, navigation }) => {
	const { categoryId } = route.params;
	const auth = useSelector((state) => state.auth.token);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [error, setError] = useState("");
	const [totalPages, setTotalPages] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [isFetchingMore, setIsFetchingMore] = useState(false);

	useEffect(() => {
		if (categoryId) {
			getCategorieData(categoryId);
		}
	}, [categoryId]);

	const getCategorieData = async (categoryId) => {
		try {
			const response = await axios.get(`${API_ROUTES.categoryDetail}${categoryId}`, {
				headers: {
					Authorization: `Bearer ${auth}`,
				},
				params: {
					page: page,
				},
			});
			const responseData = response.data;

			setTotalPages(responseData.products.last_page);

			if (page === 1) {
				setData(responseData.products.data);
			} else {
				setData((prevData) => [...prevData, ...responseData.products.data]);
			}

			setIsLoading(false);
		} catch (error) {
			Alert.alert("Hata", "Sunucuda beklenmedik bir sorun oluştu");
		}
	};

	const handleRefresh = async () => {
		setIsRefreshing(true);
		setPage(1);
		await getCategorieData(categoryId);
		setIsRefreshing(false);
	};

	const handleLoadMore = async () => {
		if (!isFetchingMore && page < totalPages) {
			setIsFetchingMore(true);
			setPage(page + 1);
			await getCategorieData(categoryId);
			setIsFetchingMore(false);
		}
	};

	const renderFooter = () => {
		if (!isFetchingMore) return null;
		return (
			<View style={styles.footer}>
				<ActivityIndicator color='#000' />
			</View>
		);
	};

	const renderItem = ({ item }) => (
		<TouchableOpacity style={styles.item} onPress={() => navigation.navigate("ProductDetail", { product: item })}>
			<View style={styles.item}>
				<Image source={{ uri: item.image }} style={styles.image} />
				<Text style={styles.title}>{item.title}</Text>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
					}}>
					<Text style={styles.price}>{item.price} TL</Text>
				</View>
			</View>
		</TouchableOpacity>
	);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size='large' color='#000' />
			</View>
		);
	}

	if (error) {
		Alert.alert("Veriler yüklenirken bir sorun yaşandı.");
	}

	return (
		<SafeAreaView style={styles.container}>
			<FlatList style={{ marginBottom: 50 }} data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} onEndReached={handleLoadMore} onRefresh={handleRefresh} refreshing={isRefreshing} onEndReachedThreshold={0.5} ListFooterComponent={renderFooter} numColumns={2} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	image: {
		backgroundColor: "#fff",
		resizeMode: "cover",
		width: 160,
		height: 240,
		borderRadius: 9,
	},
	item: {
		padding: 9.5,
		borderBottomColor: "#ccc",
	},
	title: {
		marginTop: 18,
		fontSize: 18,
		color: "#000000",
		fontFamily: "Urbanist-Bold",
	},
	price: {
		fontSize: 20,
		marginVertical: 8,
		color: "#41644A",
		fontFamily: "Urbanist-Bold",
	},
	footer: {
		alignItems: "center",
		marginVertical: 20,
	},
	increaseOperation: {
		width: 20,
		height: 20,
		backgroundColor: "#A7A7A7",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 2,
		marginHorizontal: 7,
	},
	quantity: {
		fontSize: 12,
		fontFamily: "Urbanist-Medium",
	},
});

export default CategorieDetail;
