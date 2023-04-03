const config = {
  BASE_URL: "https://analytics.flolio.com",
  EVENTS_PATH: "/api/v1//stats/aggregate",
  TOKEN: "pC2jSWFU4NV7ZkHJ78y84hd4BvRvzfQ4Qcc4wAK1hX_UuNVnJdZMAEMvWkKMJ6SX",
  SITE_ID: "exceed.story-demo.ogn-review.net",
  PERIOD: "6mo",
  EVENT_METRICS: "visitors,events",
  PAGE_VIEW_METRICS: "visitors,pageviews",
  EVENTS: {
    mint_click: "Mint Click",
    minted: "Minted",
    connect_wallet: "Connect Wallet",
    buy_now_click: "Buy Now Click",
    purchased: "Purchased",
  },
};

const api = {
  get: function (url, headers = {}, data = "") {
    const opts = {
      headers: {
        ...headers,
        Authorization: `Bearer ${config.TOKEN}`,
      },
    };
    return new Promise(function (resolve, reject) {
      fetch(url, opts)
        .then((response) => response.json())
        .then(function (data) {
          resolve(data);
        })
        .catch((error) => {
          let err = {
            resError: error,
            message: "Server not responding!",
          };
          reject(err);
        });
    });
  },
};

document.getElementById("app").innerHTML = `
<h1>Hello !</h1>
<div class="wrapper">

<div>
<h3>Connect Wallet</h3>
<div class="ConnectWalletFunnel"/>
</div>


<div>
<h3>Mint</h3>
<div class="MintFunnel"/>
</div>

<div>
<h3>Purchase</h3>
<div class="PurchasedFunnel"/>
</div>





</div>
`;

async function renderCharts() {
  const pageViewData = await getPageViewData();
  createConnectWalletChart(".ConnectWalletFunnel", pageViewData);
  createMintChart(".MintFunnel", pageViewData);
  createPurchaseChart(".PurchasedFunnel", pageViewData);
}

async function createConnectWalletChart(container, pageViewValues) {
  const connectWalletEventQuery = buildAPIQuery(
    config.EVENT_METRICS,
    config.EVENTS.connect_wallet
  );
  const connectWalletURl = `${config.BASE_URL}${
    config.EVENTS_PATH
  }?${connectWalletEventQuery.toString()}`;

  const connectWalletRes = await api.get(connectWalletURl);

  const connectWalletValues = connectWalletRes.results;

  // TODO: build values
  const chartData = {
    labels: ["Page Views", "Connect Wallet"],
    values: [
      [pageViewValues.pageviews.value, pageViewValues.visitors.value],
      [connectWalletValues.events.value, connectWalletValues.visitors.value],
    ],
  };
  const graph = generateNewGraph(container, chartData);
  graph.draw();
}

async function createMintChart(container, pageViewData) {
  const mintClickEventQuery = buildAPIQuery(
    config.EVENT_METRICS,
    config.EVENTS.mint_click
  );
  const mintedEventQuery = buildAPIQuery(
    config.EVENT_METRICS,
    config.EVENTS.minted
  );

  const mintClickEventURL = `${config.BASE_URL}${
    config.EVENTS_PATH
  }?${mintClickEventQuery.toString()}`;

  const mintedEventURL = `${config.BASE_URL}${
    config.EVENTS_PATH
  }?${mintedEventQuery.toString()}`;

  const mintClickRes = await api.get(mintClickEventURL);
  const mintedRes = await api.get(mintedEventURL);
  const mintClickValues = mintClickRes.results;
  const mintedValues = mintedRes.results;
  const chartData = {
    labels: ["Page Views", "Mint Click", "Minted"],
    values: [
      [pageViewData.pageviews.value, pageViewData.visitors.value],
      [mintClickValues.events.value, mintClickValues.visitors.value],
      [mintedValues.events.value, mintedValues.visitors.value],
    ],
  };
  const graph = generateNewGraph(container, chartData);
  graph.draw();
}

async function createPurchaseChart(container, pageViewData) {
  const purchasedEventQuery = buildAPIQuery(
    config.EVENT_METRICS,
    config.EVENTS.purchased
  );
  const buyClickEventQuery = buildAPIQuery(
    config.EVENT_METRICS,
    config.EVENTS.buy_now_click
  );

  const buyClickEventURL = `${config.BASE_URL}${
    config.EVENTS_PATH
  }?${buyClickEventQuery.toString()}`;

  const purchasedEventURL = `${config.BASE_URL}${
    config.EVENTS_PATH
  }?${purchasedEventQuery.toString()}`;

  const buyClickRes = await api.get(buyClickEventURL);
  const purchasedRes = await api.get(purchasedEventURL);

  const buyClickValues = buyClickRes.results;
  const purchasedValues = purchasedRes.results;

  const chartData = {
    labels: ["Page Views", "Buy Click", "Purchased"],
    values: [
      [pageViewData.pageviews.value, pageViewData.visitors.value],
      [buyClickValues.events.value, buyClickValues.visitors.value],
      [purchasedValues.events.value, purchasedValues.visitors.value],
    ],
  };
  const graph = generateNewGraph(container, chartData);
  graph.draw();
}

async function getPageViewData() {
  const pageViewQuery = buildAPIQuery(config.PAGE_VIEW_METRICS);
  const apiURl = `${config.BASE_URL}${
    config.EVENTS_PATH
  }?${pageViewQuery.toString()}`;
  const res = await api.get(apiURl);
  return res.results;
}

renderCharts();

//utils
const data = {
  subLabels: ["Count", "Visitor"],
  colors: [["#780000"], ["#fdc500"]],
};
function buildAPIQuery(metrics, event) {
  const finalQuery = new URLSearchParams({
    site_id: config.SITE_ID,
    metrics: metrics,
    period: config.PERIOD,
  });
  if (event) {
    finalQuery.append("filters", `event:name==${event}`);
  }
  return finalQuery;
}
function generateNewGraph(containerName, dynamicData) {
  console.log({ ...data, ...dynamicData });

  return new FunnelGraph({
    container: containerName,
    gradientDirection: "vertical",
    data: { ...data, ...dynamicData },
    displayPercent: true,
    direction: "horizontal",
    width: 800,
    height: 350,
    subLabelValue: "raw",
  });
}
