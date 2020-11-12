import icons from '../icons';

const icon = (iconName: string) => {
  const finded = icons.find((value) => value.name === iconName);
  return finded.src;
};

export default icon;
