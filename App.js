import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [totalPagesRead, setTotalPagesRead] = useState(0);
  const [averagePagesPerBook, setAveragePagesPerBook] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: 'Fiction',
    pages: 0,
  });

  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction', 'Fantasy', 'Biography'];

  const addBook = () => {
    const { title, author, genre, pages } = newBook;
    if (title && author && genre && pages > 0) {
      const newTotalPagesRead = totalPagesRead + pages;
      const newBooks = [{ title, author, genre, pages }, ...books];

      setTotalPagesRead(newTotalPagesRead);
      setBooks(newBooks);

      
      const newAveragePagesPerBook = newTotalPagesRead / newBooks.length;
      setAveragePagesPerBook(newAveragePagesPerBook);

     
      setNewBook({
        title: '',
        author: '',
        genre: 'Fiction',
        pages: 0,
      });
      setModalVisible(false);
    }
  };
<View style={styles.container}>
  <Image
    source={require('C:\Users\lab_services_student\Documents\MAST\mast part 2(original)\mast\image\book.jfif')} // Replace with the actual path to your image
    style={styles.headerImage} // Add the image styles
  />
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>LAST BOOK READ</Text>
  </View>
  {/* ... rest of your component */}
</View>

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>LAST BOOK READ </Text>
      </View>

      <View style={styles.lastBookContainer}>
        <Text style={styles.sectionTitle}>PREVIOUS BOOK READ</Text>
        {books.length > 0 ? (
          <FlatList
            data={[books[0]]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.bookDetail}>Title: {item.title}</Text>
                <Text style={styles.bookDetail}>Author: {item.author}</Text>
                <Text style={styles.bookDetail}>Genre: {item.genre}</Text>
                <Text style={styles.bookDetail}>Pages: {item.pages}</Text>
              </View>
            )}
          />
        ) : (
          <Text>No books recorded yet</Text>
        )}
      </View>

      <View style={styles.statisticsContainer}>
        <Text style={styles.sectionTitle}>FIGURES</Text>
        <Text style={styles.statDetail}>Total Pages Read: {totalPagesRead}</Text>
        <Text style={styles.statDetail}>Average Pages per Book: {averagePagesPerBook.toFixed(2)}</Text>
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New Book</Text>
      </TouchableOpacity>

      {}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Add New Book</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={newBook.title}
            onChangeText={(text) => setNewBook({ ...newBook, title: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Author"
            value={newBook.author}
            onChangeText={(text) => setNewBook({ ...newBook, author: text })}
          />
          <View style={styles.dropdownContainer}>
            {genres.map((genre) => (
              <TouchableOpacity
                key={genre}
                style={[
                  styles.dropdownButton,
                  newBook.genre === genre ? { backgroundColor: '#42afed' } : null,
                ]}
                onPress={() => setNewBook({ ...newBook, genre: genre })}
              >
                <Text
                  style={[
                    styles.dropdownButtonText,
                    newBook.genre === genre ? { color: '#FFF' } : null,
                  ]}
                >
                  {genre}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Number of Pages"
            value={newBook.pages.toString()}
            onChangeText={(text) => setNewBook({ ...newBook, pages: parseInt(text) || 0 })}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.addBookButton} onPress={addBook}>
            <Text style={styles.addBookButtonText}>Add Book</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  // ... your existing styles
  headerImage: {
    width: '100%', // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: 'cover', // You can adjust the resizeMode property as needed
  },
 



  modalContainer: {
    flex: 1,
    justifyContent: 'top',
    padding: 10,
    backgroundColor: '#36706d',
  },
  modalHeader: {
    fontSize: 40,
    fontWeight: 'italics',
    marginBottom: 50,
  },
  input: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#FFFF',
    borderRadius: 39,
  },
  addBookButton: {
    backgroundColor: '#145ab5',
    borderRadius: 200,
    padding: 45,
    alignItems: 'center',
    marginTop: 240,
  },
  addBookButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cancelButton: {
    backgroundColor: '#145ab5',
    borderRadius: 49,
    padding: 45,
    alignItems: 'center',
    marginTop: 200,
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#36706d',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  lastBookContainer: {
    marginBottom: 50,
    backgroundColor: '#10decd',
    borderRadius: 45,
    padding: 30,
    elevation: 15, 
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  bookDetail: {
    fontSize: 30,
    color: '#000000',
  },
  statisticsContainer: {
    marginBottom: 50,
    backgroundColor: '#10decd',
    borderRadius: 45,
    padding: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  statDetail: {
    fontSize: 16,
    color: '#555',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#11ed69',
    borderRadius: 40,
    padding: 18,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
  },
  addButton: {
    backgroundColor: '#027831',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFF',
  },
  
});

export default HomePage;


