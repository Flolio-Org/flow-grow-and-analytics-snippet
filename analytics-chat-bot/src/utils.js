import config from "./config";
export function buildAPIQuery(body) {
  const finalQuery = new URLSearchParams({
    site_id: config.SITE_ID,
    limit: config.DATA_LIMIT,
    ...body,
  });
  return finalQuery;
}

export function stringifyObjectArray(arr) {
  let result = "";
  try {
    result = arr.map((obj) => JSON.stringify(obj)).join(", ");
  } catch (e) {
    // Handle the exception appropriately, e.g. by logging the error and returning an empty string
    console.error(e);
    result = "";
  }
  return result;
}

export function renderBreakdownResult(odata) {
  let data = { ...odata };
  // console.log("🚀 ~ file: utils.js:26 ~ renderBreakdownResult ~ data:", data)
  return data.results
    .map((ro) => {
      let roKey = [...Object.entries(ro)[0]][1];
      let roVal = [...Object.entries(ro)[1]][1];
      let roMetric = [...Object.entries(ro)[1]][0];

      let formatedVal = roVal;
      try {
        formatedVal = parseFloat(roVal).toLocaleString('en-US')
      } catch {}
      
      return `${roKey} - ${roVal}`;
    })
    .join(" \n ");
}
export function renderAggregateResult(odata) {
  let data = { ...odata };

  const ro = Object.entries(data.results)[0];

  let formatedVal = ro[1].value;
  try {
    formatedVal = parseFloat(ro[1].value).toLocaleString('en-US')
  } catch {}
  return `${formatedVal}`;
}

export function getDuration(durationId) {
  let body = {};
  const now = new Date();
  let startDate, endDate;
  switch (durationId) {
    case "today":
      return {
        date: getDateInFormat(
          new Date(now.getFullYear(), now.getMonth(), now.getDate())
        ),
      };
    case "yesterday":
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      startDate = new Date(
        yesterday.getFullYear(),
        yesterday.getMonth(),
        yesterday.getDate()
      );
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return {
        date: `${getDateInFormat(startDate)},${getDateInFormat(endDate)}`,
      };
    case "thisWeek":
      const startOfWeek = new Date(
        now.getTime() - now.getDay() * 24 * 60 * 60 * 1000
      );
      startDate = new Date(
        startOfWeek.getFullYear(),
        startOfWeek.getMonth(),
        startOfWeek.getDate()
      );
      endDate = now;
      return {
        date: `${getDateInFormat(startDate)},${getDateInFormat(endDate)}`,
      };
    case "lastWeek":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      endDate = now;
      return {
        date: `${getDateInFormat(startDate)},${getDateInFormat(endDate)}`,
      };
    case "thisMonth":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = now;
      return {
        date: `${getDateInFormat(startDate)},${getDateInFormat(endDate)}`,
      };
    case "lastMonth":
      const lastMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      startDate = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), 1);
      return {
        date: `${getDateInFormat(startDate)},${getDateInFormat(endDate)}`,
      };
    default:
      return {
        date: getDateInFormat(
          new Date(now.getFullYear(), now.getMonth(), now.getDate())
        ),
      };
  }
}

export function getDateInFormat(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
