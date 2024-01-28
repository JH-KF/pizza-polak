const { DateTime } = require("luxon");
const { OPENING_DATES_ADAPTOR } = require("./constants");

function parseDate(payload) {
  if (!payload) return { value: "" };
  const date = {
    value: DateTime.fromFormat(
      payload[OPENING_DATES_ADAPTOR.date],
      "dd/MM/yyyy"
    )
      .setLocale("fr")
      .toLocaleString(DateTime.DATE_FULL),
  };
  return date;
}
module.exports = parseDate;
