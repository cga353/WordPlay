import { CommonModule, NgFor, NgIf } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { RandomWordService } from '../services/randomword.service';
import { SearchwordService } from '../services/searchword.service';
import { MatDialog } from '@angular/material/dialog';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { WordService } from '../services/word.service';
import { Attempt } from '../interfaces/attempt';
import * as confetti from 'canvas-confetti';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, DialogComponent, NavBarComponent],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})

export class TableroComponent implements OnInit {
  user: User | undefined;
  filas: string[][];
  palabraAdivinar: string = "";
  entradaActivada: boolean = false;
  filaActual: number = 0;
  enterPresionado: boolean = false;
  palabraAdivinada: boolean = false;
  palabraValida: boolean = false;
  estadoTablero: (number | boolean)[][];
  palabraId: number | undefined;
  estadoTeclado: { [key: string]: boolean } = {};
  mostrarConfetti: boolean = false;
  letrasIntroducidas: string[] = [];
  estadoTeclas: { [key: string]: string } = {};
  obtenerIdPalabraAdivinar: boolean = true;
  palabraAdivinarId: number | undefined;

  // Definimos el teclado virtual
  teclado: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '◀'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Enter']
  ];

  constructor(
    private palabraService: RandomWordService,
    private buscarPalabra: SearchwordService,
    private wordService: WordService,
    public dialog: MatDialog
  ) {
    this.filas = this.generarTablero(6, 5);
    this.estadoTablero = this.inicializarEstadoTablero();
  }

  ngOnInit(): void {
    this.obtenerPalabraAdivinar();
    this.inicializarEstadoTeclado();
    this.activarEntrada();
  }

  obtenerPalabraAdivinar() {
    this.palabraService.obtenerPalabraAdivinar().subscribe(
      (palabra: string) => {
        this.palabraAdivinar = palabra[0];
        console.warn('Palabra a adivinar:', this.palabraAdivinar);
        this.addPalabra(this.palabraAdivinar.toLowerCase());
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

  inicializarEstadoTablero(): (number | boolean)[][] {
    const estadoTablero: (number | boolean)[][] = [];
    for (let i = 0; i < this.filas.length; i++) {
      estadoTablero.push([i, false]);
    }
    return estadoTablero;
  }

  activarEntrada() {
    this.entradaActivada = true;
  }

  inicializarEstadoTeclado() {
    this.teclado.forEach(fila => {
      fila.forEach(tecla => {
        this.estadoTeclado[tecla] = false;
      });
    });
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
      }
    }
  }

  agregarLetra(letra: string) {
    if (letra !== "Enter" && letra !== "◀") {
      this.letrasIntroducidas.push(letra);
    }

    if (this.entradaActivada && !this.palabraAdivinada) {
      if (letra === 'Enter') {
        this.recogerEnter();
      } else if (letra === '◀') {
        this.borrarLetra();
      } else {
        const letraIndex = this.filas[this.filaActual].indexOf('');
        if (letraIndex !== -1) {
          this.filas[this.filaActual][letraIndex] = letra.toUpperCase();
          this.estadoTeclado[letra] = true;
        }
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
    if (this.palabraAdivinada) {
      console.log('La palabra ya se ha adivinado. No se puede borrar.');
      return;
    }

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
      this.enterPresionado = true;
      // Verificar si la fila actual está completa
      if (this.filaCompleta(this.filaActual)) {
        this.comprobarPalabra();
      } else {
        console.log('La fila no está completa.');
        this.enterPresionado = false; // Reiniciar la bandera de Enter presionado
      }
    }
  }

  comprobarPalabra() {
    const palabraIngresada = this.filas[this.filaActual].join('').trim().toLocaleLowerCase();

    // Llamada a la API para verificar si la palabra existe
    this.buscarPalabra.verificarPalabra(palabraIngresada).then(
      (response: any) => {
        this.palabraValida = true;
        this.estadoTablero[this.filaActual][1] = true;
        this.palabraCorrecta(palabraIngresada);
        // Después de todas las comprobaciones, colorear las teclas del teclado
        setTimeout(() => {
          this.colorearTeclasTeclado();
        }, 1); // Ejecutar después de un breve retraso
      },
      (error: any) => {
        if (!(palabraIngresada.toLowerCase() === this.palabraAdivinar.toLowerCase())) {
          // Si hay un error, la palabra no existe
          this.enterPresionado = false;
          this.palabraValida = false;
          this.estadoTablero[this.filaActual][1] = false;
          this.openDialog("PALABRA NO ENCONTRADA", "", palabraIngresada, false);
        } else {
          // La palabra es correcta pese a no estar en la API
          this.palabraCorrecta(palabraIngresada);
          setTimeout(() => {
            this.colorearTeclasTeclado();
          }, 1); // Ejecutar después de un breve retraso
        }
      }
    );
  }

  palabraCorrecta(palabraIngresada: string) {
    this.addPalabra(palabraIngresada.toLowerCase());
    // Obtener información del usuario del localStorage
    const storedUserJSON = localStorage.getItem('user');
    this.user = JSON.parse(storedUserJSON ? storedUserJSON : '{}') as User;
    
    this.handleWordAttempt(this.user.id, this.palabraId || -1);

    // Verificar si la palabra ingresada por el usuario es igual a la palabra a adivinar
    if (palabraIngresada === this.palabraAdivinar.toLowerCase()) {
      this.addPalabraAdivinada(palabraIngresada);
      this.entradaActivada = false;
      this.palabraAdivinada = true;
      this.palabraValida = true;
      this.estadoTablero[this.filaActual][1] = true;
      this.colorearTeclasTeclado();

      setTimeout(() => {
        this.launchConfetti();
      }, 1000);

      setTimeout(() => {
        this.openDialog("¡FELICIDADES!", "has acertado la palabra", palabraIngresada, true);
      }, 1500);
    } else {
      // No avanzar a la siguiente fila si la palabra no es correcta en el último intento
      if (this.filaActual == this.filas.length - 1) {
        this.addPalabraAdivinada(palabraIngresada);
        this.colorearTeclasTeclado();

        setTimeout(() => {
          this.openDialog("¡PERDISTE!", "La palabra era:", this.palabraAdivinar.toUpperCase(), false);
        }, 2000);
      } else {
        this.colorearTeclasTeclado();
        this.avanzarFila();
      }
      this.enterPresionado = false; // Reiniciar la bandera de Enter presionado
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

  addPalabra(palabra: string) {
    this.wordService.addPalabra(palabra).subscribe(
      (id: number) => {
        if(this.obtenerIdPalabraAdivinar === true) {
          this.palabraAdivinarId = id;
          this.obtenerIdPalabraAdivinar = false;
          return;
        }
        this.palabraId = id;
      },
      error => {
        console.error('Error al obtener la palabra a adivinar:', error);
      }
    );
  }

  addPalabraAdivinada(palabraIngresada: string) {
    const game = {
      userId: this.user?.id || -1,
      wordId: this.palabraAdivinarId!,
      isGuessed: palabraIngresada.toLowerCase() === this.palabraAdivinar.toLowerCase(),
      nAttempt: this.filaActual + 1,
      date: new Date()
    };

    this.wordService.addPalabraAdivinada(game).subscribe(
      response => {
        console.log('Palabra adivinada guardada con éxito', response);
      },
      error => {
        console.error('Error al guardar la palabra adivinada', error);
      }
    );
  }

  addAttempt(attempt: Attempt) {
    this.wordService.createAttempt(attempt).subscribe(
      (response) => {
        console.log('Intento creado:', response);
      },
      (error) => {
        console.error('Error al crear el intento:', error);
      }
    );
  }

  updateAttempt(attempt: Attempt) {
    this.wordService.updateAttempt(attempt.userId, attempt.wordId, attempt).subscribe(
      (response) => {
        console.log('Intento actualizado:', response);
      },
      (error) => {
        console.error('Error al actualizar el intento:', error);
      }
    );
  }

  handleWordAttempt(userId: number, wordId: number) {
    this.wordService.getAttemptByUserIdAndWordId(userId, wordId).subscribe(
      (attempt) => {
        if (attempt) {
          attempt.nVeces += 1;
          this.updateAttempt(attempt);
        } else {
          const newAttempt: Attempt = { userId, wordId, nVeces: 1 };
          this.addAttempt(newAttempt);
        }
      },
      (error) => {
        console.error('Error al obtener el intento:', error);
      }
    );
  }

  private filaCompleta(filaIndex: number): boolean {
    return this.filas[filaIndex].every(letra => letra !== '');
  }

  aplicarColores(filaIndex: number, letraIndex: number): string {
    // Verificar si la fila está completa
    if (this.estadoTablero[filaIndex][1] === true) {
      return `elemento animate__flipInX ${this.obtenerClase(filaIndex, letraIndex)}`;
    }
    return ''; // Si la fila no está completa o no se ha presionado Enter, no se aplica ningún color

  }

  // Método para obtener la clase para una letra específica en una fila 
  obtenerClase(filaIndex: number, letraIndex: number): string {
    const palabraAdivinar = this.palabraAdivinar.toLowerCase();
    const resultado = Array(5).fill('no-encontrado'); // Inicializamos con 'no-encontrado'
    const letraUsada = Array(5).fill(false); // Lleva la cuenta de las letras adivinadas

    // Primera pasada: comprobar las letras correctas (en la posición correcta)
    for (let i = 0; i < 5; i++) {
      const letra = this.filas[filaIndex][i].toLowerCase();
      if (letra === palabraAdivinar[i]) {
        resultado[i] = 'correcto';
        letraUsada[i] = true; // Marcar la letra como usada
      }
    }

    // Segunda pasada: comprobar las letras incorrectas pero presentes en la palabra
    for (let i = 0; i < 5; i++) {
      if (resultado[i] === 'correcto') continue; // Saltar las letras ya adivinadas correctamente

      const letra = this.filas[filaIndex][i].toLowerCase();
      for (let j = 0; j < 5; j++) {
        if (!letraUsada[j] && letra === palabraAdivinar[j]) {
          resultado[i] = 'incorrecto';
          letraUsada[j] = true; // Marcar la letra como usada
          break;
        }
      }
    }

    return resultado[letraIndex];
  }

  // Método para colorear las teclas del teclado virtual
  colorearTeclasTeclado() {
    const palabraAdivinar = this.palabraAdivinar.toLowerCase();

    // Actualizar el estado de las teclas basado en las filas actuales
    for (let filaIndex = 0; filaIndex <= this.filaActual; filaIndex++) {
      const letraUsada = Array(5).fill(false); // Lleva la cuenta de las letras adivinadas
      const resultado = Array(5).fill('no-encontrado'); // Inicializamos con 'no-encontrado'

      // Primera pasada: comprobar las letras correctas (en la posición correcta)
      for (let i = 0; i < 5; i++) {
        const letra = this.filas[filaIndex][i].toLowerCase();
        if (letra === palabraAdivinar[i]) {
          resultado[i] = 'correcto';
          letraUsada[i] = true; // Marcar la letra como usada
        }
      }

      // Segunda pasada: comprobar las letras incorrectas pero presentes en la palabra
      for (let i = 0; i < 5; i++) {
        if (resultado[i] === 'correcto') continue; // Saltar las letras ya adivinadas correctamente

        const letra = this.filas[filaIndex][i].toLowerCase();
        for (let j = 0; j < 5; j++) {
          if (!letraUsada[j] && letra === palabraAdivinar[j]) {
            resultado[i] = 'incorrecto';
            letraUsada[j] = true; // Marcar la letra como usada
            break;
          }
        }
      }

      // Actualizar estadoTeclas para cada letra en la fila
      for (let i = 0; i < 5; i++) {
        const letra = this.filas[filaIndex][i].toUpperCase();
        if (resultado[i] === 'correcto') {
          this.estadoTeclas[letra] = 'correcto';
        } else if (resultado[i] === 'incorrecto') {
          // Solo actualizar si no está ya marcado como correcto
          if (this.estadoTeclas[letra] !== 'correcto') {
            this.estadoTeclas[letra] = 'incorrecto';
          }
        } else {
          // Solo actualizar si no está ya marcado como correcto o incorrecto
          if (!this.estadoTeclas[letra]) {
            this.estadoTeclas[letra] = 'no-encontrado';
          }
        }
      }
    }
  }

  launchConfetti() {
    const myConfetti = confetti.create(undefined, { resize: true });
    myConfetti({
      particleCount: 100,
      spread: 160
    });
  }

  openDialog(title: string, message: string, palabra: string, adivinada: boolean): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: title, message: message, palabra: palabra, adivinada: adivinada },
      panelClass: 'custom-dialog-panel'
    });

    position: {
      top: '50%'
      left: '50%'
      transform: 'translate(-50%, -50%)'
    }

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
