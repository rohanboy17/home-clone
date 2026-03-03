(function () {
  "use strict";

  const dzChartlist = (function () {

    function chartBarRunning() {
      const chartBarRunningOptions = {
        series: [
          {
            name: 'Running',
            data: [30, 80 , 100, 60],
          },
          {
            name: 'Cycling',
            data: [55, 60, 80, 90]
          }
        ],
        chart: {
          type: 'bar',
          height: 250,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '100%',
            borderRadius: 8,
          },
        },
        colors: ['var(--color-primarylight)', '#ECECDE'],
        dataLabels: {
          enabled: false,
        },
        markers: {
          shape: "circle",
        },
        legend: {
          show: false,
          fontSize: '12px',
          labels: {
            colors: '#77775B',
          },
          markers: {
            width: 18,
            height: 18,
            strokeWidth: 0,
            strokeColor: '#fff',
            radius: 12,
          }
        },
        stroke: {
          show: true,
          width: 6,
          colors: ['transparent']
        },
        grid: {
          borderColor: 'transparent',
        },
        xaxis: {
          categories: ['Jan - Mar', 'Apr - Jun', 'Jul - Sep', 'Oct - Dec  '],
          axisBorder: {
          show: false,
      },
      axisTicks: {
          show: false,
      },
          labels: {
            style: {
              colors: '#787878',
              fontSize: '14px',
              fontFamily: 'Space Grotesk',
              fontWeight: 500,
              cssClass: 'apexcharts-xaxis-label',
            },
          },
          crosshairs: {
            show: false,
          }
        },
        yaxis: {
          show: false,
          labels: {
            offsetX: -16,
            style: {
              colors: '#787878',
              fontSize: '13px',
              fontFamily: 'poppins',
              fontWeight: 100,
              cssClass: 'apexcharts-xaxis-label',
            },
          },
        },
        fill: {
          opacity: 1,
          colors: ['var(--color-primarylight)', '#ECECDE'],
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
            }
          }
        },
        responsive: [{
          breakpoint: 575,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '40%',
              },
            },
            chart: {
              height: 250,
            }
          }
        }]
      };

      const chartElement = document.querySelector("#chartBarRunning");
      if (chartElement) {
        const chartBarRunningObject = new ApexCharts(chartElement, chartBarRunningOptions);
        chartBarRunningObject.render();
      }
    }

    function chartBarCycle() {
    }

    return {
      init: function () {
      },
      load: function () {
        chartBarRunning();
        chartBarCycle();
      },
      resize: function () {
      }
    };
  })();

  document.addEventListener("DOMContentLoaded", function () {
  });

  window.addEventListener("load", function () {
    setTimeout(function () {
      dzChartlist.load();
    }, 1000);
  });

  window.addEventListener("resize", function () {
    dzChartlist.resize();
  });

})();
