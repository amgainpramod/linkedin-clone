export const getInitials = (fullname) => {
  return fullname
    ? fullname
        .split(" ")
        .map((item) => item[0])
        .join("")
        .toUpperCase()
    : "";
};
