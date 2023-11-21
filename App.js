import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default function PaginaDashboard() {
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    const buscarPersonagem = async (url) => {
      const resposta = await fetch(url);
      const dados = await resposta.json();
      return dados;
    };

    const buscarTodosPersonagens = async () => {
      const urls = Array.from({ length: 10 }, (_, index) =>
        `https://swapi.dev/api/people/${index + 1}/`
      );

      try {
        const dadosPersonagens = await Promise.all(urls.map(buscarPersonagem));
        setMedicos(dadosPersonagens);
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
      }
    };

    buscarTodosPersonagens();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      {medicos && medicos.length > 0 ? (
        medicos.map((medico, index) => (
          <Text key={index} style={styles.nome}>
            {medico.name}
          </Text>
        ))
      ) : (
        <Text style={styles.carregando}>Carregando ...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  nome: {
    fontSize: 18,
    marginBottom: 10,
  },
  carregando: {
    fontSize: 18,
    marginTop: 20,
  },
});
