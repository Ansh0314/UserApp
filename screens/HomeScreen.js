import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import UserCard from '../components/UserCard';

export default function HomeScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{error}</Text>;

  return (
    <View>
      <TextInput
        placeholder="Search by name"
        value={search}
        onChangeText={handleSearch}
        style={{
          padding: 10,
          borderWidth: 1,
          margin: 10,
          borderRadius: 8,
        }}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPress={() =>
              navigation.navigate('Details', { user: item })
            }
          />
        )}
      />
    </View>
  );
}