import { Image, SafeAreaView, StyleSheet, ScrollView, ImageBackground, View, Modal, TouchableOpacity, Text } from "react-native";
import * as React from "react";
import { BotonIcon } from "@/components/BotonIcon";
import { TextInput } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
import { useLibrosSubidos } from '@/contexts/LibrosSubidosContext';
import { Link, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Icono } from "@/components/Icono";
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

export default function EditBook() {
  const router = useRouter();
  const { agregarLibro } = useLibrosSubidos();
  
  const [titulo, setTitulo] = React.useState("");
  const [autor, setAutor] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [genero, setGenero] = React.useState("");
  const [precio, setPrecio] = React.useState("");
  const [paginas, setPaginas] = React.useState("");
  const [anio, setAnio] = React.useState("");
  const [lenguaje, setLenguaje] = React.useState("");
  const [imagen, setImagen] = React.useState("https://img.freepik.com/vector-gratis/fondo-abstracto-blanco_23-2148806276.jpg?w=360");
  const [isImageLoading, setIsImageLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalConfig, setModalConfig] = React.useState({
    title: "",
    message: "",
    type: "info" as "info" | "error" | "success",
    onConfirm: () => {},
    showCancel: false,
  });

  const generos = [
    { key: '1', value: 'Ciencia Ficción' },
    { key: '2', value: 'Fantasia' },
    { key: '3', value: 'Terror' },
    { key: '4', value: 'Novela' },
    { key: '5', value: 'Infantil' },
  ];

  const lenguajes = [
    { key: '1', value: 'Español' },
    { key: '2', value: 'Ingles' },
  ];

  const camposCompletos = () => {
    return (
      titulo.trim() !== "" &&
      autor.trim() !== "" &&
      descripcion.trim() !== "" &&
      genero.trim() !== "" &&
      precio.trim() !== "" &&
      paginas.trim() !== "" &&
      anio.trim() !== "" &&
      lenguaje.trim() !== "" &&
      imagen !== "https://img.freepik.com/vector-gratis/fondo-abstracto-blanco_23-2148806276.jpg?w=360"
    );
  };

  const showModal = (
    title: string, 
    message: string, 
    type: "info" | "error" | "success",
    onConfirm: () => void = () => setModalVisible(false),
    showCancel: boolean = false
  ) => {
    setModalConfig({
      title,
      message,
      type,
      onConfirm,
      showCancel
    });
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const pickImageAsync = async () => {
    try {
      setIsImageLoading(true);
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        showModal("Permisos requeridos", "Necesitamos acceso a tu galería", "error");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.7,
      });

      if (!result.canceled && result.assets?.[0]) {
        // Optimizar la imagen
        const optimizedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 800 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        // Guardar en caché
        const fileName = optimizedImage.uri.split('/').pop();
        const cachePath = `${FileSystem.cacheDirectory}${fileName}`;
        await FileSystem.copyAsync({ from: optimizedImage.uri, to: cachePath });
        
        setImagen(cachePath);
      }
    } catch (error) {
      showModal("Error", "Error al procesar la imagen", "error");
      console.error("Image picker error:", error);
    } finally {
      setIsImageLoading(false);
    }
  };

  const takePhotoAsync = async () => {
    try {
      setIsImageLoading(true);
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        showModal("Permisos requeridos", "Necesitamos acceso a tu cámara", "error");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.7,
      });

      if (!result.canceled && result.assets?.[0]) {
        // Optimizar la imagen
        const optimizedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 800 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        // Guardar en caché
        const fileName = optimizedImage.uri.split('/').pop();
        const cachePath = `${FileSystem.cacheDirectory}${fileName}`;
        await FileSystem.copyAsync({ from: optimizedImage.uri, to: cachePath });
        
        setImagen(cachePath);
      }
    } catch (error) {
      showModal("Error", "Error al tomar la foto", "error");
      console.error("Camera error:", error);
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleSubirLibro = async () => {
    if (!camposCompletos()) {
      showModal("Error", "Complete todos los campos", "error");
      return;
    }
  
    try {
      let finalImageUri = imagen;
      
      // Verificar que FileSystem.cacheDirectory no sea null
      if (FileSystem.cacheDirectory && imagen.startsWith(FileSystem.cacheDirectory)) {
        const fileName = imagen.split('/').pop();
        
        // Verificar que FileSystem.documentDirectory no sea null
        if (FileSystem.documentDirectory) {
          const permanentPath = `${FileSystem.documentDirectory}${fileName}`;
          await FileSystem.copyAsync({ 
            from: imagen, 
            to: permanentPath 
          });
          finalImageUri = permanentPath;
        }
      }
  
      await agregarLibro({
        titulo,
        autor,
        descripcion,
        genero,
        precio,
        paginas,
        anio,
        lenguaje,
        imagen: finalImageUri
      });
  
      // Limpiar formulario
      setTitulo("");
      setAutor("");
      setDescripcion("");
      setGenero("");
      setPrecio("");
      setPaginas("");
      setAnio("");
      setLenguaje("");
      setImagen("https://img.freepik.com/vector-gratis/fondo-abstracto-blanco_23-2148806276.jpg?w=360");
  
      showModal("Éxito", "Libro subido correctamente", "success");
    } catch (error) {
      showModal("Error", "Error al guardar el libro", "error");
      console.error("Error saving book:", error);
    }
  };

  const volver = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.dismissTo("/(protected)/(tabs)/home");
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={require("@/assets/images/fondo30.jpg")} style={styles.background}>
        <View style={{flex:1}}>
        <ScrollView style={styles.containerScroll}>
          <View style={styles.overlayContainer}>
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center", gap:10, padding:10, width:"100%"}}>
              <View style={{marginBottom:70}}>
                  <BotonIcon icono="arrow-left-long" tamaño={20} onPress={volver}/>
              </View>
              <Image style={styles.book} source={{ uri: imagen }} />
              <View style={{gap:10}}>
                <BotonIcon 
                  icono="image"
                  tamaño={18}
                  texto="Subir Imagen " 
                  colorButton="#AC0505"  
                  ancho={170}
                  onPress={pickImageAsync}
                />
                <BotonIcon 
                  icono="camera"
                  tamaño={18}
                  texto="Tomar Foto " 
                  colorButton="#AC0505"  
                  ancho={170} 
                  onPress={takePhotoAsync}
                />
              </View>
            </View>
            <View style={styles.containerText}>
              <TextInput
                label="Titulo"
                value={titulo}
                onChangeText={setTitulo}
                mode="flat"
                style={styles.textInputStyle}
                activeUnderlineColor="#AC0505"
                underlineColor="black"
                textColor="black"
              />
              <TextInput
                label="Autor"
                value={autor}
                onChangeText={setAutor}
                mode="flat"
                style={styles.textInputStyle}
                activeUnderlineColor="#AC0505"
                underlineColor="black"
                textColor="black"
              />
              <TextInput
                label="Descripcion"
                value={descripcion}
                onChangeText={setDescripcion}
                mode="flat"
                style={[styles.textInputStyle, styles.multilineInputStyle]}
                activeUnderlineColor="#AC0505"
                underlineColor="black"
                textColor="black"
                multiline={true}
                numberOfLines={4}
              />
              <View style={styles.containerDetalles}>
                <TextInput
                  label="Precio"
                  value={precio}
                  onChangeText={setPrecio}
                  mode="flat"
                  style={styles.textInputDetalles}
                  activeUnderlineColor="#AC0505"
                  underlineColor="black"
                  textColor="black"
                  keyboardType="numeric"
                />
                <TextInput
                  label="Paginas"
                  value={paginas}
                  onChangeText={setPaginas}
                  mode="flat"
                  style={styles.textInputDetalles}
                  activeUnderlineColor="#AC0505"
                  underlineColor="black"
                  textColor="black"
                  keyboardType="numeric"
                />
                <TextInput
                  label="Año"
                  value={anio}
                  onChangeText={setAnio}
                  mode="flat"
                  style={styles.textInputDetalles}
                  activeUnderlineColor="#AC0505"
                  underlineColor="black"
                  textColor="black"
                  keyboardType="numeric"
                />
              </View>
              <View style={{ gap: 10 }}>
                <SelectList 
                  setSelected={setGenero} 
                  data={generos} 
                  save="value"
                  placeholder="Género"
                  boxStyles={styles.selectStyle}
                  inputStyles={{color:"black", fontSize:18}}
                  dropdownStyles={{backgroundColor:"#dadada"}}
                  search={false}
                />
                <SelectList 
                  setSelected={setLenguaje} 
                  data={lenguajes} 
                  save="value"
                  placeholder="Lenguaje"
                  boxStyles={styles.selectStyle}
                  inputStyles={{color:"black", fontSize:18}}
                  dropdownStyles={{backgroundColor:"#dadada"}}
                  search={false}
                />
              </View>
              <View style={styles.containerCompra}>
                <BotonIcon 
                  alto={40} 
                  ancho={310} 
                  texto="Subir Libro" 
                  colorButton={camposCompletos() ? "#AC0505" : "#666666"}
                  onPress={handleSubirLibro}
                  disabled={!camposCompletos()}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        </View>
      </ImageBackground>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={hideModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {modalConfig.type === "error" && (
              <Icono icon="exclamation-circle" size={40} color="#AC0505" />
            )}
            {modalConfig.type === "success" && (
              <Icono icon="check-circle" size={40} color="#4CAF50" />
            )}
            {modalConfig.type === "info" && (
              <Icono icon="circle-info" size={40} color="#2196F3" />
            )}
            
            <Text style={styles.modalTitle}>{modalConfig.title}</Text>
            <Text style={styles.modalText}>
              {modalConfig.message}
            </Text>
            
            <View style={styles.modalButtons}>
              {modalConfig.showCancel && (
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]} 
                  onPress={hideModal}
                >
                  <Text style={[styles.buttonText, {color: "#333"}]}>Cancelar</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity 
                style={[
                  styles.modalButton, 
                  modalConfig.type === "error" ? styles.errorButton :
                  modalConfig.type === "success" ? styles.successButton :
                  styles.infoButton
                ]} 
                onPress={modalConfig.onConfirm}
              >
                <Text style={styles.buttonText}>
                  {modalConfig.type === "success" ? "Aceptar" : "Entendido"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  safeArea: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  containerScroll: {
    marginBottom:60,
    marginTop:10,
  },
  overlayContainer: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  containerText: {
    flexDirection: "column",
    width: "100%",
    gap: 10,
  },
  containerDetalles: {
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-between', 
    gap: 10,
  },
  containerCompra: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    height: 50,
    width: "100%",
    borderRadius: 30,
    marginBottom: 10,
  },
  textInputStyle: {
    backgroundColor: "rgba(0, 0, 0,0.2)",
    paddingHorizontal: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#9a9a9a',
   },
  textInputDetalles: {
    backgroundColor: "rgba(0, 0, 0,0.2)",
    paddingHorizontal: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#9a9a9a',
    flex: 1,
  },
  multilineInputStyle: {
    textAlignVertical: 'top',
    height: 100,
  },
  selectStyle: {
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0,0.2)",
    borderWidth: 1,
    borderColor: '#9a9a9a',
    borderRadius: 0,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#dadada",
  },
  description: {
    fontSize: 18,
    color: "#dadada",
  },
  book:{
    borderColor:"#9a9a9a",
    borderWidth:1,
    borderRadius: 10,
    height: 120,
    width: 80,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  errorButton: {
    backgroundColor: '#AC0505',
  },
  successButton: {
    backgroundColor: '#4CAF50',
  },
  infoButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});