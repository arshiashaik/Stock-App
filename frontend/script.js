const searchButton = document.querySelector("#search-button");
const clearButton = document.querySelector("#clear-button");
const searchInput = document.querySelector("#search-input");
const errorMessage = document.querySelector(".error-message").style;
const stockInformation = document.querySelector(".stock-information");

const companyTab = document.querySelector("#company");
const summaryTab = document.querySelector("#summary");
const summarySection = document.querySelector(".summary-section");
const trendsSection = document.querySelector(".trends-section");
const insightsTab = document.querySelector("#insights");
const newsTab = document.querySelector("#news");

const arrowUp = "frontend/images/GreenArrowUp.png";
const arrowDown = "frontend/images/GreenArrowUp.png";

const URL = "https://stock-app-waon.onrender.com";

// Function to check if data from server is empty
function isEmpty(obj) {
  return Object.entries(obj).length === 0;
}

// Unix to dd-mmmm-yy converter function
function dateConverter(date) {
  const newDate = new Date(date * 1000);
  const formattedDate = `${String(newDate.getDate()).padStart(
    2,
    "0"
  )}-${new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    newDate
  )}-${newDate.getFullYear()}`;
  return formattedDate;
}

function currentDate() {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Months are zero based
  let day = ("0" + currentDate.getDate()).slice(-2);
  let formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}

// Tab functionality
const displayTab = (evt, param) => {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab-links");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(param).style.display = "block";
  evt.currentTarget.className += " active";
};

// Data from Server
const companyData = (ticker) => {
  fetch(`${URL}/company/${ticker}`)
    .then((response) => response.json())
    .then((data) => {
      if (!isEmpty(data[ticker])) {
        //checks if data from server is valid
        summaryData(ticker);
        trendData(ticker);
        insightsData(ticker);
        newsData(ticker);
        errorMessage.display = "none";
        stockInformation.style.display = "block";
        companyTab.innerHTML = writeCompanyData(data, ticker);
      } else {
        errorMessage.display = "block";
        stockInformation.style.display = "none";
      }
    })
    .catch((error) => {
      console.error(`Error fetching data for ${ticker}:`, error);
    });
};

const summaryData = (ticker) => {
  fetch(`${URL}/summary/${ticker}`)
    .then((response) => response.json())
    .then((data) => {
      summarySection.innerHTML = writeSummaryData(data, ticker);
    })
    .catch((error) => {
      console.error(`Error fetching data for ${ticker}:`, error);
    });
};

const trendData = (ticker) => {
  fetch(`${URL}/trend/${ticker}`)
    .then((response) => response.json())
    .then((data) => {
      trendsSection.innerHTML = writeTrendData(data, ticker);
    })
    .catch((error) => {
      console.error(`Error fetching data for ${ticker}:`, error);
    });
};

const insightsData = (ticker) => {
  fetch(`${URL}/insights/${ticker}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // insightsData.innerHTML = writeInsightsData(data, ticker);
      writeInsightsData(data, ticker);
    })
    .catch((error) => {
      console.error(`Error fetching data for ${ticker}:`, error);
    });
};

const newsData = (ticker) => {
  fetch(`${URL}/news/${ticker}`)
    .then((response) => response.json())
    .then((data) => {
      newsTab.innerHTML = writeNewsData(data, ticker);
    })
    .catch((error) => {
      console.error(`Error fetching data for ${ticker}:`, error);
    });
};

// Functions to display tab content
function writeCompanyData(data, ticker) {
  img = data[ticker].logo || "./images/logo.png";
  return `<table class="company-table" cellspacing="0">
          <tr><td colspan="2"><img class="table-img" src=${img}></td></tr>
          <tr>
          <th>Company Logo</th>
          <td>${data[ticker].name || "name not available"}</td>
          </tr>
          <tr>
          <th>Stock Ticker Symbol</th>
          <td>${data[ticker].ticker || "symbol not available"}</td>
          </tr>
          <tr>
          <th>Stock Exchange Code</th>
          <td>${data[ticker].exchange || "code not available"}</td>
          </tr>
          <tr>
          <th>Company Start Date</th>
          <td>${data[ticker].ipo || "start date not available"}</td>
          </tr>
          <tr>
          <th>Category</th>
          <td>${data[ticker].finnhubIndustry || "category not available"}</td>
          </tr>
  </table>`;
}

function writeSummaryData(data, ticker) {
  const currentDate = dateConverter(data[ticker].t);
  return `<table class="summary-table" cellspacing="0">
          <tr>
          <th>Stock Ticker Symbol</th>
          <td>${ticker.toUpperCase()}</td>
          </tr>
          <tr>
          <th>Trading Day</th>
          <td>${currentDate}</td>
          </tr>
          <tr>
          <th>Previous Closing Price</th>
          <td>${data[ticker].pc.toFixed(2)}</td>
          </tr>
          <tr>
          <th>Opening Price</th>
          <td>${data[ticker].o.toFixed(2)}</td>
          </tr>
          <tr>
          <th>High Price</th>
          <td>${data[ticker].h.toFixed(2)}</td>
          </tr>
          <tr>
          <th>Low Price</th>
          <td>${data[ticker].l.toFixed(2)}</td>
          </tr>
          <tr>
          <th>Change</th>
          <td>${data[ticker].d.toFixed(2) + " "}${
    data[ticker].d > 0
      ? '<img src="./images/GreenArrowUp.png" class="arrow"/>'
      : data[ticker].d === 0
      ? " "
      : '<img src="./images/RedArrowDown.png" class="arrow"/>'
  }</td>
          </tr>
          <tr>
          <th>Change Price</th>
          <td>${data[ticker].d.toFixed(2) + " "}${
    data[ticker].d > 0
      ? '<img src="./images/GreenArrowUp.png" class="arrow"/>'
      : data[ticker].d === 0
      ? " "
      : '<img src="./images/RedArrowDown.png" class="arrow"/>'
  }</td>
          </tr>
  </table>`;
}

function writeTrendData(data, ticker) {
  return `
  <span style="color: #eb3342">Strong Sell</span>
  <span style="background-color:#eb3342">${data[ticker][0].strongSell}</span>
  <span style="background-color:#b45c4c">${data[ticker][0].sell}</span>
  <span style="background-color:#74945c">${data[ticker][0].hold}</span>
  <span style="background-color:#3ccc6c">${data[ticker][0].buy}</span>
  <span style="background-color:#0df87e">${data[ticker][0].strongBuy}</span>
  <span style="color: #0df87e">Strong Buy</span>
  `;
}

function writeInsightsData(data, ticker) {
  let chartData = data[ticker];
  let closeData = [];
  let volumeData = [];

  chartData.forEach(function (record) {
    let date = new Date(record.date).getTime();
    let close = parseFloat(record.close);
    let volume = parseInt(record.volume);

    closeData.push([date, close]);
    volumeData.push([date, volume]);
  });
  console.log(closeData);
  Highcharts.stockChart("insights", {
    stockTools: {
      gui: {
        enabled: false, // disable the built-in toolbar
      },
    },

    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%e. %b}",
      },
    },

    yAxis: [
      {
        title: { text: "Volume" },
        labels: { align: "left" }, // align text of label from left side
        min: 0,
        // offset: 1  // move Volume yAxis out of plot area, need to be dismissed with label align left
      },
      {
        title: { text: "Stock Price" },
        opposite: false,
        min: 0,
      },
    ],

    plotOptions: {
      column: {
        pointWidth: 3,
        color: "#404040",
      },
    },

    rangeSelector: {
      buttons: [
        {
          type: "day",
          count: 7,
          text: "7d",
        },
        {
          type: "day",
          count: 15,
          text: "15d",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "month",
          count: 3,
          text: "3m",
        },
        {
          type: "month",
          count: 6,
          text: "6m",
        },
      ],
      selected: 5,
      inputEnabled: false,
    },

    title: {
      text: "Stock Price " + ticker.toUpperCase() + " " + currentDate(),
    },

    subtitle: {
      text: '<a href="https://api.tiingo.com/" target="_blank">Sourse: Tiingo</a>',
      useHTML: true,
    },

    series: [
      {
        type: "area",
        name: ticker,
        data: closeData,
        yAxis: 1,
        showInNavigator: true,
        // gapSize: 5,
        tooltip: {
          valueDecimals: 2,
        },
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
      },
      {
        type: "column",
        name: ticker + " Volume",
        data: volumeData,
        yAxis: 0,
        showInNavigator: false,
      },
    ],
  });
}

function writeNewsData(data, ticker) {
  apiData = data[ticker];
  let newsArray = [];

  apiData.forEach((obj) => {
    let hasEmptyValue = Object.values(obj).some((value) => value === "");
    if (!hasEmptyValue) {
      newsArray.push(obj);
    }
    newsArray = newsArray.slice(0, 5);
  });
  const divs = newsArray.map((obj) => {
    return `<div class="news-articles">
              <img src="${obj.image}" alt="news-article-image"/>
              <ul>
              <li>${obj.headline}</li>
              <li>${dateConverter(obj.datetime)}</li>
              <li><a href="${
                obj.url
              }" target="_blank">See Original Post</a></li>
              </ul>
            </div>`;
  });

  return divs.join("");
}

// clear button functionality
clearButton.addEventListener("click", function () {
  searchInput.value = ""; //clears the search field
  errorMessage.display = "none"; //hides the error
  stockInformation.style.display = "none"; //hides t
});

// search button functionality
searchButton.addEventListener("click", function (e) {
  let ticker = searchInput.value.toLowerCase().trim();
  if (ticker) {
    e.preventDefault();
    companyData(ticker);
  }
});
