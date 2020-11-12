import { Collapsible } from 'materialize-css';

import Chart from 'chart.js';
import { Component, Store } from '../common/component';
import WeatherForecast from '../model/weather-forecast.model';
import dateToString from '../common/util/date-to-string';
import icon from '../common/util/icon';
import dateToTime from '../common/util/date-to-time';

export default class WeatherItems extends Component {
  constructor(params: {
    el: string,
    store: Store,
    key: string,
  }) {
    super({
      el: params.el,
      store: params.store,
      template: (data) => `
        <div class="container">
          <ul class="collapsible popout z-depth-0">
            ${data[params.key].map((value: WeatherForecast) => `
              <li class="mx-0">
                <div class="collapsible-header">
                  <img src="${icon(value.condition.icon)}" alt="${value.condition.description}" title="${value.condition.description}" style="width: 3rem;" class="mr-4">
                  <div class="d-flex red-text font-weight-medium mr-2">
                    <i class="material-icons m-0">north</i>
                    <span class="font-size-1-6">${value.temperature.maximum}°</span>
                  </div>
                  <div class="d-flex blue-text text-darken-2 font-weight-medium mr-2">
                    <i class="material-icons m-0">south</i>
                    <span class="font-size-1-6">${value.temperature.minimum}</span>
                  </div>
                  <div class="grey-text text-darken-2 ml-auto">${dateToString(value.day, false)}</div>
                </div>
                ${params.key === 'week' ? this.createBody(value) : ''}
              </li>
            `).join('')}
          </ul>
          <div class="card chart">
            <div class="card-content chart-container position-relative" style="height: 70vh;">
              <canvas id="${params.key}-chart-temperature"></canvas>
            </div>
          </div>
          ${params.key === 'week' ? `
            <div class="card chart">
            <div class="card-content chart-container position-relative" style="height: 70vh;">
                <canvas id="${params.key}-chart-precipitation"></canvas>
              </div>
            </div>
            <div class="card chart">
              <div class="card-content chart-container position-relative" style="height: 70vh;">
                <canvas id="${params.key}-chart-volume"></canvas>
              </div>
            </div>
          ` : ''}
        </div>
      `,
      setup: (element, data) => {
        this.createTemperatureChart(element, data[params.key], params.key);
        if (params.key === 'week') {
          const collapsible = element.querySelector('.collapsible');
          Collapsible.init(collapsible);
          this.createPrecipitationChart(element, data[params.key], params.key);
          this.createVolumeChart(element, data[params.key], params.key);
        }
      },
    });
  }

  private createTemperatureChart(element: Element, data: WeatherForecast[], key: string) {
    const ctxTemperature: HTMLCanvasElement = element.querySelector(`#${key}-chart-temperature`);
    this.createChart({
      context: ctxTemperature,
      type: 'line',
      datasets: [
        {
          label: 'TEMPERATURA MÁXIMA',
          data: data.map((value) => value.temperature.maximum),
          borderWidth: 4,
          borderColor: '#E53935',
          backgroundColor: 'transparent',
        },
        {
          label: 'TEMPERATURA MÍNIMA',
          data: data.map((value) => value.temperature.minimum),
          borderWidth: 4,
          borderColor: '#1E88E5',
          backgroundColor: 'transparent',

        },
      ],
      dates: data.map((value) => value.day),
      title: 'VARIAÇÃO DE TEMPERATURA NO PERÍODO',
      tooltip: (label: string) => `${label}°C`,
      xLabel: 'Dias',
      yLabel: 'Temperatura(°C)',
    });
  }

  private createPrecipitationChart(element: Element, data: WeatherForecast[], key: string) {
    const ctxPrecipitation: HTMLCanvasElement = element.querySelector(`#${key}-chart-precipitation`);
    this.createChart({
      context: ctxPrecipitation,
      type: 'line',
      datasets: [
        {
          label: 'PROBABILIDADE DE CHUVA (%)',
          data: data.map((value) => value.rain.probability),
          borderWidth: 4,
          borderColor: '#616161',
          backgroundColor: 'transparent',
        },
      ],
      dates: data.map((value) => value.day),
      title: 'VARIAÇÃO DA PRECIPITAÇÃO NO PERÍODO',
      tooltip: (label: string) => `${label}%`,
      xLabel: 'Dias',
      yLabel: 'Probabilidade(%)',
    });
  }

  private createVolumeChart(element: Element, data: WeatherForecast[], key: string) {
    const ctxVolume: HTMLCanvasElement = element.querySelector(`#${key}-chart-volume`);
    this.createChart({
      context: ctxVolume,
      type: 'bar',
      datasets: [
        {
          label: 'VOLUME (mm)',
          data: data.map((value) => value.rain.volume),
          borderWidth: 2,
          borderColor: '#0277bd',
          backgroundColor: '#03a9f4',
        },
      ],
      dates: data.map((value) => value.day),
      title: 'Volume',
      tooltip: (label: string) => `${label}mm`,
      xLabel: 'Dias',
      yLabel: 'Temperatura(°C)',
    });
  }

  private createChart(params: {
    context: HTMLCanvasElement,
    type: 'line' | 'bar',
    dates: Date[],
    datasets: Chart.ChartDataSets[],
    title: string,
    tooltip: (label: string) => string,
    xLabel: string,
    yLabel: string
  }) {
    new Chart(params.context, {
      type: params.type,
      data: {
        labels: params.dates,
        datasets: params.datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          fontSize: 18,
          text: params.title,
        },
        tooltips: {
          callbacks: {
            label(tooltipItem, chartData) {
              let label = chartData.datasets[tooltipItem.datasetIndex].label || '';
              if (label) {
                label += ': ';
              }
              label += tooltipItem.yLabel;
              return params.tooltip(label);
            },
          },
        },
        scales: {
          xAxes: [
            {
              distribution: 'series',
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'DD/MM',
                },
                tooltipFormat: 'DD/MM',
              },
              scaleLabel: {
                display: true,
                labelString: params.xLabel,
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: params.yLabel,
              },
              ticks: {
                callback(value) {
                  return params.tooltip(value.toString());
                },
              },
            },
          ],
        },

      },
    });
  }

  private createBody(value: WeatherForecast): string {
    return `
      <div class="collapsible-body">
        <div class="d-flex flex-wrap">
          ${value.rain ? this.createCard('Prob. Chuva', 'rain-3', `${value.rain.probability}%/${value.rain.volume}mm`) : ''}
          ${value.humidity ? this.createCard('Umidade', 'humidity-1', `${value.humidity}%`) : ''}
          ${value.ultraviolet ? this.createCard('Ultravioleta', 'iuv', `${value.ultraviolet}`) : ''}
          ${value.wind ? this.createCard('Vento', 'wind', `${value.wind.speed} Km/h`) : ''}
          ${value.sun ? this.createCard('Pôr do sol', 'sunset-1', `${dateToTime(value.sun.sunset)}`) : ''}
          ${value.sun ? this.createCard('Nascer do sol', 'sunrise-1', `${dateToTime(value.sun.sunrise)}`) : ''}
        </div>
      </div>
    `;
  }

  private createCard(title: string, iconName: string, value: string): string {
    return `
      <div class="flex-grow-1 card blue lighten-3 mx-2" style="width: 130px;">
        <div class="card-content px-3 py-2 white-text font-weight-medium center">
          <div>
            <img src="${icon(iconName)}" alt="${title}" style="width: 30px;">
          </div>
          <div>${title}</div>
          <div>${value}</div>
        </div>
      </div>
    `;
  }
}
