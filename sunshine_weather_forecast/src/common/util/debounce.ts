const debounce = (func: () => void, wait: number = 600) => {
  let timer: any = null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(func, wait);
  };
};

export default debounce;
