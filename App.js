import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'

import { TextInput, Button } from 'react-native-paper';

export default class App extends React.Component {
  state = {
    peso: 0,
    altura: 0,
    imc: 0,
    legenda: 'Indeterminado',
    cor:  '#bdc3c7'
  };

  calcularImc = () => {
    const resultado = this.state.peso / (this.state.altura * this.state.altura);

    this.setState({
      imc: Math.ceil(resultado)
    });

    let legenda;
    if(resultado < 18.5) {
      legenda = 'Magreza';
      cor = '#e74c3c';
    } else if(resultado < 25) {
      legenda = 'Normal';
      cor = '#2ecc71';
    } else if(resultado < 30) {
      legenda = 'Sobrepeso';
      cor = '#f1c40f';
    } else if(resultado < 40) {
      legenda = 'Obesidade';
      cor = '#e76e22';
    } else {
      legenda = 'Obesidade grave';
      cor = '#e74c3c';
    }

    this.setState({
      legenda: legenda,
      cor: cor
    });
  }

  render() {

    return (
      <View style={styles.app}>
        <Text style={styles.legenda}>Seu IMC</Text>

        <View style={[styles.painel, {backgroundColor: this.state.cor}]}>
          <Text style={styles.resultado}>{this.state.imc}</Text>
          <Text style={styles.diagnostico}>{this.state.legenda}</Text>
        </View>

        <View>
          <TextInput style={styles.inputs} label='Peso'
            onChangeText={valor => {
              this.setState({peso: valor.replace(',', '.')});
            }}
          />
          <TextInput style={styles.inputs} label='Altura'
            onChangeText={valor => {
              this.setState({altura: valor.replace(',', '.')});
            }}
          />
          <Button mode='contained'onPress={this.calcularImc} >
            Calcular
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    padding: 20
  },
  painel: {
    borderRadius: 5,
    width: 170,
    padding: 8,
    marginVertical: 10,
    alignSelf: 'center'
  },
  legenda: {
      textAlign: 'center',
      fontWeight: 'bold'
  }, 
  resultado: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  diagnostico: {
    textAlign: 'center',
    fontSize: 22,
  }, 
  inputs: {
    marginVertical: 10
  }
});