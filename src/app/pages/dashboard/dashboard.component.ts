import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntUrlActivate } from '../gestion-usuario/interfaces/urlActivatedRoute.interface';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  listaUrl: IntUrlActivate[] = [];

  constructor(
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.listaUrl = this.activedRoute.snapshot.url;

    this.chartBar();
    this.chartBarHorizontal();
    this.chartDoughnut();

  }


  chartBar() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    if (ctx !== null) {
      // El elemento existe, así que podemos pasarlo como argumento
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

    } else {
      console.error("El elemento no existe en la página");
    }

  }

  chartBarHorizontal() {
    const ctx = document.getElementById('myChart2') as HTMLCanvasElement;

    if (ctx !== null) {
      // El elemento existe, así que podemos pasarlo como argumento
      const labels = Array.from({ length: 7 }, (_, index) => {
        const date = new Date();
        date.setMonth(date.getMonth() - index);
        return date.toLocaleString('default', { month: 'long' });
      });

      const data = {
        labels: labels,
        datasets: [{
          axis: 'y',
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      };

      new Chart(ctx, {
        type: 'bar',
        data,
        options: {
          indexAxis: 'y',
          responsive: true, // Hace que el gráfico sea sensible al tamaño del contenedor
          maintainAspectRatio: false, // Permite que el gráfico cambie su relación de aspecto
      
        }
      });
    } else {
      console.error("El elemento no existe en la página");
    }

  }

  chartDoughnut() {
    const ctx = document.getElementById('myChart3') as HTMLCanvasElement;

    if (ctx !== null) {
      const data = {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };

      new Chart(ctx, {
        type: 'doughnut',
        data: data,
      });
    } else {
      console.error("El elemento no existe en la página");
    }

  }

}
