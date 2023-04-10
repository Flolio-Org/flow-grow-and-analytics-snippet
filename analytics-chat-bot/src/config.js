import { getDuration } from "./utils";
const config = {
  BASE_URL: "https://phantom.flolio.com",
  TOKEN: "pC2jSWFU4NV7ZkHJ78y84hd4BvRvzfQ4Qcc4wAK1hX_UuNVnJdZMAEMvWkKMJ6SX",
  SITE_ID: "exceed.story-demo.ogn-review.net",
  OPEN_API_KEY: "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",
  PERIOD: "6mo",
  EVENT_METRICS: "visitors,events",
  PAGE_VIEW_METRICS: "visitors,pageviews",
  DATA_LIMIT: 5,
  API_FILTER_PATH: {
    breakdown: "/api/v1//stats/breakdown",
    aggregate: "/api/v1//stats/aggregate",
  },
  // ...window.BOT_CONFIG,
  EVENTS: {
    mint_click: "Mint Click",
    minted: "Minted",
    connect_wallet: "Connect Wallet",
    buy_now_click: "Buy Now Click",
    purchased: "Purchased",
  },
  QUERY_PARAMS: {
    top_pages: {
      title: "Top pages",
      id: "top_pages",
      apiType: "breakdown",
      body: {
        property: "event:page",
      },
      type: "list"
    },
    top_countries: {
      title: "Top countries",
      id: "top_countries",
      apiType: "breakdown",
      body: {
        property: "visit:country",
      },
      type: "list"
    },
    bounce_rate: {
      title: "Bounce rate",
      id: "bounce_rate",
      apiType: "breakdown",
      body: {
        property: "visit:country",
        metrics: "bounce_rate",
      },
      type: "count"
    },
    // top_referrer: {
    //   apiType: "breakdown",
    //   body: {
    //     // property:"event:name"
    //   },
    // },
    top_utms: {
      title: "Top UTMs",
      id: "top_utms",
      apiType: "breakdown",
      body: {
        property: "visit:source",
      },
      type: "list"
    },
    pageviews: {
      title: "Top Page Views",
      id: "pageviews",
      apiType: "aggregate",
      body: {
        metrics: "pageviews",
      },
      type: "list"
    },
    visitors: {
      title: "Visitors",
      id: "visitors",
      apiType: "aggregate",
      body: {
        metrics: "visitors",
      },
      type: "count"
    },
    devices: {
      title: "Devices",
      id: "devices",
      apiType: "breakdown",
      body: {
        property: "visit:device",
      },
      type: "list"
    },
    events_count: {
      title: "Event count",
      id: "events_count",
      apiType: "aggregate",
      body: {
        metric: "events",
      },
      type: "count"
    },
    events_breakdown: {
      title: "Event breakdown",
      id: "events_breakdown",
      apiType: "breakdown",
      body: {
        property: "visit:source",
        metric: "events",
      },
      type: "list"
    },
  },
  DURATIONS: [
    {
      id: "today",
      title: "Today",
      body: {
        period: "day",
        ...getDuration("today"),
      },
    },
    {
      id: "yesterday",
      title: "Yesterday",
      body: {
        period: "custom",
        ...getDuration("yesterday"),
      },
    },
    {
      id: "thisWeek",
      title: "This Week",
      body: {
        period: "custom",
        ...getDuration("thisWeek"),
      },
    },
    {
      id: "lastWeek",
      title: "Last Week",
      body: {
        period: "custom",
        ...getDuration("lastWeek"),
      },
    },
    {
      id: "thisMonth",
      title: "This Week",
      body: {
        period: "custom",
        ...getDuration("thisWeek"),
      },
    },
    {
      id: "lastMonth",
      title: "Last Month",
      body: {
        period: "custom",
        ...getDuration("lastMonth"),
      },
    },
    {
      id: "last6Months",
      title: "Last Six Months",
      body: {
        period: "6mo",
      },
    },
  ],
  LIST_GROUPBYS: ['visitors','visits','pageviews','bounce_rate'],
  COUNT_FILTERS: ['All','Facebook','Instagram','Google','Twitter','Email','Newsletter','LinkdIn','Youtube']
};
export default config;
