export function sortall(arr, filter) {
  if (arr?.length > 0) {
    if (filter.order == "asc" && filter.type == "int") {
      return arr.sort(
        (a, b) => parseInt(a[filter.field]) - parseInt(b[filter.field])
      );
    }
    if (filter.order == "dsc" && filter.type == "int") {
      return arr.sort(
        (a, b) => parseInt(b[filter.field]) - parseInt(a[filter.field])
      );
    }
    if (filter.order == "asc" && filter.type == "string") {
      return arr.sort((a, b) => {
        if (a[filter.field].toLowerCase() < b[filter.field].toLowerCase()) {
          return -1;
        }
        if (a[filter.field].toLowerCase() > b[filter.field].toLowerCase()) {
          return 1;
        }
        return 0;
      });
    }
    if (filter.order == "dsc" && filter.type == "string") {
      return arr.sort((a, b) => {
        if (b[filter.field].toLowerCase() < a[filter.field].toLowerCase()) {
          return -1;
        }
        if (b[filter.field].toLowerCase() > a[filter.field].toLowerCase()) {
          return 1;
        }
        return 0;
      });
    }
    return arr;
  }
}
