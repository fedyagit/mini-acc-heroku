export const getDate = () => {
  const date = new Date();
  return {
    fullDate: `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}-${
      date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
    }-${date.getFullYear()}-${
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    }-${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}-${
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
    }`,
    dayDate: `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}-${
      date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
    }-${date.getFullYear()}`,
  };
};
