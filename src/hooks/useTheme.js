import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from 'actions';
import { lightTheme, darkTheme, baseTheme } from 'theme/mainTheme';

const useTheme = () => {
  const isDarkTheme = useSelector(({ isDark }) => isDark);
  const dispatch = useDispatch();

  const setMode = theme => {
    dispatch(setTheme(theme));
  };

  const toggleTheme = () => {
    setMode(!isDarkTheme);
  };

  const theme = isDarkTheme
    ? { ...baseTheme, ...darkTheme }
    : { ...baseTheme, ...lightTheme };

  return { theme, toggleTheme };
};

export default useTheme;
