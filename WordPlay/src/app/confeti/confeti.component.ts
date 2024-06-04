import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-confeti',
  standalone: true,
  imports: [],
  templateUrl: './confeti.component.html',
  styleUrls: ['./confeti.component.css']
})
export class ConfetiComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private W!: number;
  private H!: number;
  private maxConfettis = 150;
  private particles: any[] = [];
  private possibleColors = [
    "DodgerBlue",
    "OliveDrab",
    "Gold",
    "Pink",
    "SlateBlue",
    "LightBlue",
    "Gold",
    "Violet",
    "PaleGreen",
    "SteelBlue",
    "SandyBrown",
    "Chocolate",
    "Crimson"
  ];

  constructor() { }

  ngOnInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext("2d")!;
    this.W = window.innerWidth;
    this.H = window.innerHeight;
    this.canvas.width = this.W;
    this.canvas.height = this.H;
    this.initConfetti();
    this.draw();
    window.addEventListener('resize', () => this.onResize());
  }

  private initConfetti(): void {
    for (let i = 0; i < this.maxConfettis; i++) {
      this.particles.push(this.confettiParticle());
    }
  }

  private confettiParticle(): any {
    return {
      x: Math.random() * this.W,
      y: Math.random() * this.H - this.H,
      r: this.randomFromTo(11, 33),
      d: Math.random() * this.maxConfettis + 11,
      color: this.possibleColors[Math.floor(Math.random() * this.possibleColors.length)],
      tilt: Math.floor(Math.random() * 33) - 11,
      tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      tiltAngle: 0,

      draw: function (this: any) {
        this.context.beginPath();
        this.context.lineWidth = this.r / 2;
        this.context.strokeStyle = this.color;
        this.context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        this.context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
        this.context.stroke();
      }.bind(this)
    };
  }

  private draw(): void {
    requestAnimationFrame(() => this.draw());

    this.context.clearRect(0, 0, this.W, this.H);

    for (let i = 0; i < this.maxConfettis; i++) {
      this.particles[i].draw();
    }

    let particle: any = {};
    let remainingFlakes = 0;
    for (let i = 0; i < this.maxConfettis; i++) {
      particle = this.particles[i];

      particle.tiltAngle += particle.tiltAngleIncremental;
      particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
      particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

      if (particle.y <= this.H) remainingFlakes++;

      if (particle.x > this.W + 30 || particle.x < -30 || particle.y > this.H) {
        particle.x = Math.random() * this.W;
        particle.y = -30;
        particle.tilt = Math.floor(Math.random() * 10) - 20;
      }
    }
  }

  private randomFromTo(from: number, to: number): number {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  private onResize(): void {
    this.W = window.innerWidth;
    this.H = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}
