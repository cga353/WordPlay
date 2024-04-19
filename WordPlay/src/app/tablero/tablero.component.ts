import { CommonModule, NgFor, NgIf } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { RandomWordService } from '../services/randomword.service';
import { SearchwordService } from '../services/searchword.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, DialogComponent],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})

export class TableroComponent implements OnInit {
  filas: string[][];
  palabraAdivinar: string = "";
  entradaActivada: boolean = false;
  filaActual: number = 0;
  enterPresionado: boolean = false;
  palabraAdivinada: boolean = false;
  palabraValida: boolean = false;
  estadoTablero: (number | boolean)[][];


  constructor(
    private palabraService: RandomWordService,
    private buscarPalabra: SearchwordService,
    public dialog: MatDialog) {
    this.filas = this.generarTablero(6, 5);
    this.estadoTablero = this.inicializarEstadoTablero(); // Inicializar el estado del tablero
  }

  ngOnInit(): void {
    this.obtenerPalabraAdivinar();
    console.warn('Palabra a adivinar:', this.palabraAdivinar);
  }

  obtenerPalabraAdivinar() {
    this.palabraService.obtenerPalabraAdivinar().subscribe(
      (palabra: string) => {
        this.palabraAdivinar = palabra[0];
      },
      (error: any) => {
        console.error('Error al obtener la palabra a adivinar:', error);
      }
    );
  }

  generarTablero(numFilas: number, numElementosPorFila: number): string[][] {
    const tablero = [];
    for (let i = 0; i < numFilas; i++) {
      const fila = [];
      for (let j = 0; j < numElementosPorFila; j++) {
        fila.push('');
      }
      tablero.push(fila);
    }
    return tablero;
  }

  // Método para inicializar el estado del tablero
  inicializarEstadoTablero(): (number | boolean)[][] {
    const estadoTablero: (number | boolean)[][] = [];
    for (let i = 0; i < this.filas.length; i++) {
      estadoTablero.push([i, false]);
    }
    return estadoTablero;
  }

  activarEntrada() {
    console.log('Entrada activada ...');
    this.entradaActivada = true;
  }

  recogerLetra(event: KeyboardEvent) {
    if (this.entradaActivada && !this.palabraAdivinada) {
      if (!this.enterPresionado) {
        this.palabraValida = false;
        const letraIndex = this.filas[this.filaActual].indexOf('');
        if (letraIndex !== -1 && event.key.length === 1 && /[a-zA-Z]/.test(event.key)) {
          const letra = event.key.toUpperCase();
          this.filas[this.filaActual][letraIndex] = letra;
        }
      } else {
        // Si ya se presionó Enter y la fila no está completa, no avanzar a la siguiente fila
        if (!this.filaCompleta(this.filaActual)) {
          return;
        }
        // Avanzar a la siguiente fila disponible
        // this.avanzarFila();
      }
    }
  }

  avanzarFila() {
    const filaIndex = this.obtenerFilaDisponible();
    if (filaIndex !== -1) {
      this.filaActual = filaIndex;
      this.enterPresionado = false; // Reiniciar la bandera de Enter presionado
    }
  }

  borrarLetra() {
    console.log('Tecla retroceso presionada');
    // Eliminar la última letra de la fila actual si no está vacía
    const filaActual = this.filas[this.filaActual];
    const ultimoIndex = filaActual.reduceRight((acc, letra, index) => {
      if (acc === -1 && letra !== '') {
        acc = index;
      }
      return acc;
    }, -1);

    if (ultimoIndex !== -1) {
      filaActual[ultimoIndex] = '';
    }
  }

  recogerEnter() {
    if (this.entradaActivada && !this.enterPresionado && !this.palabraAdivinada) {
      console.log('Tecla Enter presionada');
      this.enterPresionado = true;
      // Verificar si la fila actual está completa
      const filaCompleta = this.filaCompleta(this.filaActual);
      if (filaCompleta) {
        this.comprobarPalabra();
      } else {
        console.log('La fila no está completa, no se aplicarán colores.');
        this.enterPresionado = false; // Reiniciar la bandera de Enter presionado
      }
    }
  }

  comprobarPalabra() {
    const palabraIngresada = this.filas[this.filaActual].join('').trim().toLocaleLowerCase();

    // Llamada a la API para verificar si la palabra existe
    this.buscarPalabra.verificarPalabra(palabraIngresada).then(

      (response: any) => {
        // if (response.data.title === 'No Definitions Found') {
        //   // Si la respuesta indica que no se encontraron definiciones para la palabra,
        //   // entonces la palabra ingresada no es válida
        //   this.palabraValida = false;
        //   console.log('La palabra ingresada no es válida:', palabraIngresada);
        //   this.avanzar = false;
        // } else {
        // Si la respuesta contiene datos, la palabra existe
        console.log('La palabra ingresada es válida:', palabraIngresada);
        this.palabraValida = true;
        this.estadoTablero[this.filaActual][1] = true;
        this.palabraCorrecta(palabraIngresada);
        // }
      },
      (error: any) => {
        // Si hay un error, la palabra no existe
        this.enterPresionado = false; // Reiniciar la bandera de Enter presionado
        this.palabraValida = false;
        this.estadoTablero[this.filaActual][1] = false;
        console.error('La palabra ingresada no existe:', palabraIngresada, error);
        this.openDialog("PALABRA NO ENCONTRADA", "");
      }
    );

  }

  palabraCorrecta(palabraIngresada: string) {
    // Verificar si la palabra ingresada por el usuario es igual a la palabra a adivinar
    if (palabraIngresada === this.palabraAdivinar.toLowerCase()) {
      console.log('¡Felicidades! Has adivinado la palabra.');
      this.entradaActivada = false;
      this.palabraAdivinada = true;
      this.palabraValida = true;
      this.estadoTablero[this.filaActual][1] = true;
      this.openDialog("FELICIDADES!",  "HAS ACERTADO");
    } else {
      console.log('La palabra ingresada no es correcta.');
      // No avanzar a la siguiente fila si la palabra no es correcta
      this.enterPresionado = false; // Reiniciar la bandera de Enter presionado
      if(this.filaActual == this.filas.length - 1){
        this.openDialog("PALABRA CORRECTA", this.palabraAdivinar.toUpperCase());
      }else{
        this.avanzarFila();
      }
    }
  }


  obtenerFilaDisponible(): number {
    for (let i = this.filaActual + 1; i < this.filas.length; i++) {
      if (this.filas[i].some(letra => letra === '')) {
        return i;
      }
    }
    return -1;
  }

  private filaCompleta(filaIndex: number): boolean {
    return this.filas[filaIndex].every(letra => letra !== '');
  }

  aplicarColores(filaIndex: number, letraIndex: number): string {
    // Verificar si la fila está completa
    if (this.estadoTablero[filaIndex][1] === true) {
      return this.obtenerClase(filaIndex, letraIndex);
    }
    return ''; // Si la fila no está completa o no se ha presionado Enter, no se aplica ningún color
  }


  obtenerClase(filaIndex: number, letraIndex: number): string {
    const letra = this.filas[filaIndex][letraIndex].toLowerCase();

    if (!letra) return ''; // Si no hay letra, no se aplica ninguna clase
    const letraAdivinar = this.palabraAdivinar.charAt(letraIndex).toLowerCase();

    if (letra === letraAdivinar) {
      return 'correcto';
    } else if (this.palabraAdivinar.includes(letra)) {
      return 'incorrecto';
    } else {
      return 'no-encontrado';
    }
  }

  openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: title, message: message}
    });

    position: {
      top: '100px'
    }


    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo ha sido cerrado.');
    });
  }



}
